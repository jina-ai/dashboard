const express = require('express')
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const db = require('./db');
// const passport = require('passport');
// const GitHubStrategy = require('passport-github2').Strategy;
const app = express();

const { PORT, PRIVATE_MODE, PRIVATE_TOKEN, IMAGES_URL, MONGO_URL } = require('./config');

app.use(cors());

// passport.use(new GitHubStrategy({
// 	clientID: process.env.GITHUB_CLIENT_ID,
// 	clientSecret: process.env.GITHUB_CLIENT_SECRET,
// 	callbackURL: "http://127.0.0.1:3000/auth/github/callback"
// },
// function(accessToken, refreshToken, profile, done) {
// 	User.findOrCreate({ githubId: profile.id }, function (err, user) {
// 		return done(err, user);
// 	});
// }
// ));

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
});

let _images = {};

//only used in private mode:
let _markdownRaw = false;
let _markdownHTML = false;

app.get('/images', function (req, res) {
	console.log('GET at /images')
	res.send(_images);
});

app.get('/search', function (req, res) {
	console.log('GET at /search')
	res.send(_images);
});

app.get('/category', function (req, res) {
	console.log('GET at /category')
	res.send(_images);
});

app.get('/sort', function (req, res) {
	console.log('GET at /sort')
	res.send(_images);
});

app.post('/review', function (req, res) {
	console.log('POST at /review')
	res.send(_images);
});

app.post('/rating', function (req, res) {
	console.log('POST at /rating')
	res.send(_images);
});

initAPI();

async function initAPI() {
	await db.initMongo(MONGO_URL);
	await loadHubImages();
	console.log('loaded images');
	app.listen(PORT, () => {
		console.log('Hub API is listening on port', PORT);
	});
}

async function loadHubImages() {
	let url = `${IMAGES_URL}${PRIVATE_MODE ? `?token=${PRIVATE_TOKEN}` : ''}`;
	const raw = await githubRaw.get(url);
	const images = raw.data.Images;
	console.log(`found ${Object.keys(images).length} images`);

	let ids = Object.keys(images);

	for (let i = 0; i < ids.length; ++i) {
		let id = ids[i];
		let image = images[id][images[id].length - 1]; //most recent image;
		let imageDetails = await getImageDetails(image);
		let imageData = {
			id,
			...imageDetails,
			buildHistory: images[id].reverse().map(img => {
				return {
					lastBuildTime: img.lastBuildTime,
					created: img.Inspect.Created,
					os: img.Inspect.Os,
					architecture: img.Inspect.Architecture,
					size: img.Inspect.Size,
					virtualSize: img.Inspect.VirtualSize,
					status: img.Status,
					repoTags: img.Inspect.RepoTags,
					repoDigests: img.Inspect.RepoDigests,
				}
			}),
		}
		await db.updateImage(id, imageData);
		console.log('parsed image ', id);
	}
	console.log('images updated');
	return;
}

async function getImageDetails(image) {
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

	let repoURL = PRIVATE_MODE ? 'https://github.com/facebook/react' : imageData.documentation;
	console.log('getting markdown for README.md');

	repoURL = `${repoURL.replace('github.com', 'raw.githubusercontent.com')}/master/README.md`;
	console.log('url: ', repoURL)

	let readmeRaw;
	let readmeRendered;

	if (PRIVATE_MODE) {
		if (!_markdownRaw) {
			let readmeResult = await githubRaw.get(repoURL);
			console.log('GET readme status:', readmeResult.status);
			_markdownRaw = readmeResult.data;
		}
		readmeRaw = _markdownRaw;

		if (!_markdownHTML) {
			let markdownResult = await githubAPI.post('markdown', { text: readmeRaw });
			console.log('POST readme status:', markdownResult.status);
			_markdownHTML = markdownResult.data;
		}
		readmeRendered = _markdownHTML;
	}
	else {
		let readmeResult = await githubRaw.get(repoURL);
		console.log('GET readme status:', readmeResult.status);
		readmeRaw = readmeResult.data;

		let markdownResult = await githubAPI.post('markdown', { text: readmeRaw });
		console.log('POST readme status:', markdownResult.status);
		readmeRendered = markdownResult.data;
	}

	imageData.readmeHTML = readmeRendered;

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