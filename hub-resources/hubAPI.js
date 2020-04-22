const express = require('express')
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const db = require('./db');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const app = express();

const { PORT, PRIVATE_MODE, PRIVATE_TOKEN, IMAGES_URL, MONGO_URL,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,DASHBOARD_URL } = require('./config');

//Express/Passport middleware
app.use(cors({ origin: DASHBOARD_URL, optionsSuccessStatus: 200, credentials: true }));
app.use(require('cookie-parser')());
app.use(express.json());
app.use(require('express-session')({
	secret: process.env.SESSION_SECRET || 'dev_secret',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
	clientID: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
	callbackURL: `${DASHBOARD_URL}dashboard/#/login/`
},
	async function (accessToken, refreshToken, profile, done) {
		const { name, email, login, id, avatar_url, url, company } = profile._json;
		console.log('profile: ',profile)
		let user = await db.updateUser(id, { id, name, email, login, avatar_url, url, company });
		console.log('user: ', user);
		return done(null, profile);
	}
));

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

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

//only used in private mode:
let _markdownRaw = false;
let _markdownHTML = false;

app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }), async function (req, res) {
	console.log('Authentication Successful!!');
});

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: `${DASHBOARD_URL}/dashboard/` }), async function (req, res) {
	console.log('Authentication Successful!!');
	res.redirect(`${DASHBOARD_URL}/dashboard/#/hub`)
});

app.post('/auth/logout',async function (req, res) {
	req.logout();
	res.json({status:'logged out'});
});

app.get('/profile',async function(req,res){
	const {user} = req;
	if (user)
		res.json(user);
	else
		res.status(401).json({ error: 'unauthorized' })
});

app.get('/images', async function (req, res) {
	console.log('\nGET at /images');
	let sort = req.query.sort;
	let category = req.query.category;
	let after = req.query.after;
	let q = req.query.q;
	console.log('--query--')
	console.log('sort:', sort)
	console.log('category:', category)
	console.log('after:', after)
	console.log('q:', q)
	if(category==='all'){
		category = false;
	}
	if(sort==='suggested'){
		sort = false;
	}
	const images = await db.getImages(sort, category, q, after);
	res.send(images);
});

app.get('/images/:imageId', async function (req, res) {
	const { imageId } = req.params;
	console.log(`\nGET at /images/${imageId}`);
	const image = await db.getImage(imageId);
	image.reviews = await db.getReviews(imageId);
	if(req.user){

		let rating = await db.getRating(imageId,req.user.id)
		let review = await db.getReview(imageId,req.user.id);
		if(rating){
			image.userRated = rating.stars;
		}
		if(review){
			image.userReviewed = review.content
		}
	}
	res.json(image);
});

app.get('/images/:imageId/reviews', async function (req, res) {
	const { imageId } = req.params;
	const reviews = await db.getReviews(imageId);

	if (reviews)
		res.json(reviews);
	else
		res.status(404).json({ error: 'no reviews found' });
});

app.post('/images/:imageId/reviews', async function (req, res) {
	const { imageId } = req.params;
	console.log(`\nPOST at /images/${imageId}/reviews`);

	if(!req.user)
		return res.status(401).send({error: 'unauthorized'});

	const image = await db.getImage(imageId);
	if (!image)
		return res.status(404).send({ error: 'Image Does Not Exist' });

	const userId = req.user.id;
	const username = req.user.username;
	const { content } = req.body;
	let result = await db.newReview({ imageId, content, userId,username });

	if (result.ok == 1) {
		console.log('value updated');
		let rating = await db.getRating(imageId,req.user.id)
		let image = await db.getImage(imageId);
		image.userRated = rating.stars;
		image.userReviewed = content;
		image.reviews = await db.getReviews(imageId);
		res.json({ data: image });
	}
	else if (result.error) {
		let { error } = result;
		console.log(error);
		res.status(409).json({ error });
	}
	else {
		let error = result.lastErrorObject;
		console.log('action failed', error);
		res.status(400).json({ error });
	}
});

app.post('/images/:imageId/ratings', async function (req, res) {
	const { imageId } = req.params;
	console.log(`\nPOST at /images/${imageId}/ratings`);

	if(!req.user)
		return res.status(401).send({error: 'unauthorized'});

	const image = await db.getImage(imageId);
	if (!image)
		return res.status(404).send({ error: 'Image Does Not Exist' });

	const userId = req.user.id;
	const { stars } = req.body;
	let result = await db.newRating({ imageId, stars, userId });

	if (result.ok == 1) {
		console.log('value updated');
		const image = await db.getImage(imageId);
		image.reviews = await db.getReviews(imageId);
		image.userRated = stars;
		res.json({ data: image });
	}
	else if (result.error) {
		let { error } = result;
		console.log(error);
		res.status(409).json({ error });
	}
	else {
		let error = result.lastErrorObject;
		console.log('action failed', error);
		res.status(400).json({ error });
	}
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

	imageData.created = image.Inspect.Created;

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