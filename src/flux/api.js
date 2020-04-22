import images from '../data/images.json';
import axios from 'axios';
import { hubURL } from './config'
let stream;

const hubAPI = axios.create({
	baseURL: hubURL,
	withCredentials: true,
	timeout: 30000, // 30 secs
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

export default {
	connect: (settings, callback) => {
		let hadPreviousStream = false;
		if (stream) {
			hadPreviousStream = true;
			stream.close();
		}

		const connectionString = `${settings.host}:${settings.port}${settings.log.startsWith('/') ? settings.log : '/' + settings.log}`;
		console.log('logs connectionString: ', connectionString)
		stream = new EventSource(connectionString);
		stream.onopen = () => {
			callback({ type: 'connect', data: `Connection ${hadPreviousStream ? 're-' : ''}established at ${settings.host}:${settings.port}` })
		}
		stream.onmessage = (m) => {
			callback({ type: 'log', data: JSON.parse(m.data) });
		}
		stream.onerror = (data) => {
			callback({ type: 'error', data: `Could not get log data from ${connectionString}` });
			stream.close()
		}
	},
	getProfile: async () => {
		const result = await hubAPI.get('profile');
		return result.data;
	},
	getYAML: async (connectionString) => {
		console.log('YAML connectionString: ', connectionString)
		const result = await axios.get(connectionString);
		return result.data;
	},
	getImages: async () => {
		console.log('get images...')
		const result = await hubAPI.get('images');
		return result.data;
	},
	getImage: async (id) => {
		console.log('get image', id);
		const result = await hubAPI.get(`/images/${id}`);
		return result.data;
	},
	postRating: async (imageId, stars) => {
		console.log('post rating', imageId, stars);
		const result = await hubAPI.post(`/images/${imageId}/ratings`, { stars })
		return result.data;
	},
	postReview: async (imageId, content) => {
		console.log('post review', imageId, content);
		const result = await hubAPI.post(`/images/${imageId}/reviews`, { content })
		return result.data;
	},
	searchHub: async (category, q, sort) => {
		console.log('search hub', category, q, sort);
		const result = await hubAPI.get(`/images?category=${category}&q=${q}&sort=${sort}`)
		return result.data;
	},
	logOut: async () => {
		const result = await hubAPI.post('/auth/logout')
		return result.data;
	}
}