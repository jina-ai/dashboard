const express = require('express')
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = 3040;
let token = 'ACDR7PJE2D6WYQDGDC2BEN26UHYNO';

const githubRaw = axios.create({
	baseURL: 'https://raw.githubusercontent.com/',
	timeout: 30000, // 30 secs
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

const githubAPI = axios.create({
	baseURL: 'https://api.github.com/',
	timeout: 30000, // 30 secs
	// headers: {
	// 	'Content-Type': 'application/json',
	// },
});

let _images = {};
let markdownRaw = '';
let markdownHTML = '';

app.get('/images', function (req, res) {
	console.log('GET at /images')
	res.send(_images);
});

initAPI();

async function initAPI() {
	await loadHubImages();
	_images = JSON.parse(await readFile('images.json'));
	console.log('loaded images');
	app.listen(PORT, () => {
		console.log('Hub API is listening on port', PORT);
	});
}

async function loadHubImages() {
	const raw = await githubRaw.get(`jina-ai/hub-status/master/build-history.json?token=${token}`);
	const images = raw.data.Images;
	console.log(`found ${Object.keys(images).length} images`);

	let ids = Object.keys(images);
	for (let i = 0; i < ids.length; ++i) {
		let id = ids[i];
		let image = images[id][images[id].length - 1]; //most recent image;
		let imageDetails = await parseImageDetails(image);
		_images[id] = {
			id,
			...imageDetails,
			buildHistory:images[id].reverse().map(img=>{
				return {
					lastBuildTime:img.lastBuildTime,
					created:img.Inspect.Created,
					os: img.Inspect.Os,
					architecture: img.Inspect.Architecture,
					size: img.Inspect.Size,
					virtualSize: img.Inspect.VirtualSize,
					status: img.Status,
					repoTags: img.Inspect.RepoTags,
					repoDigests: img.Inspect.RepoDigests,
				}}),
		}
		console.log('parsed image ', id);
	}
	await writeFile('images.json', JSON.stringify(_images));
	console.log('file written');
	return;
}

async function parseImageDetails(image) {
	let { Labels } = image.Inspect.Config;
	let repoTags = image.Inspect.RepoTags;
	let repoDigests = image.Inspect.RepoDigests;
	let imageData = {
		author: Labels['ai.jina.hub.author'],
		avatar: Labels['ai.jina.hub.avatar'],
		description: Labels['ai.jina.hub.description'],
		documentation: Labels['ai.jina.hub.documentation'],
		license: Labels['ai.jina.hub.license'],
		name: Labels['ai.jina.hub.name'],
		platform: Labels['ai.jina.hub.platform'],
		revision: Labels['ai.jina.hub.revision'],
		source: Labels['ai.jina.hub.source'],
		url: Labels['ai.jina.hub.url'],
		vendor: Labels['ai.jina.hub.vendor'],
		version: Labels['ai.jina.hub.version'],
		repoTags,
		repoDigests
	}

	// let repoURL = imageData.documentation;
	let repoURL = 'https://github.com/facebook/react'
	console.log('getting markdown for README.md');
	repoURL = `${repoURL.replace('github', 'raw.githubusercontent')}/master/README.md`;
	console.log('url: ', repoURL)
	let readmeResult = markdownRaw || (await githubRaw.get(repoURL)).data;
	imageData.readmeRaw = readmeResult;

	if (imageData.readmeRaw) {
		console.log('getting rendered markdown for README.md');
		let renderResult = markdownHTML || await githubAPI.post('markdown', { text: imageData.readmeRaw });
		console.log('POST render:', renderResult.status);
		if (renderResult.status == 200)
			imageData.readmeHTML = renderResult.data;
	}
	return imageData;
}

function promisify(inner) {
	return new Promise((resolve, reject) =>
		inner((err, res) => {
			if (err) { reject(err) }

			resolve(res);
		})
	);
}

function readFile(filename) {
	return promisify(cb => fs.readFile(filename, cb));
}

function writeFile(filename, data) {
	return promisify(cb => fs.writeFile(filename, data, cb));
}