import images from '../data/images.json';
let stream;
const hubAPI = 'http://localhost:3040';

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
	getYAML: (connectionString) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			console.log('YAML connectionString: ', connectionString)
			xhr.open('GET', connectionString);
			xhr.timeout = 5000;
			xhr.onload = function () {
				if (this.status >= 200 && this.status < 300) {
					resolve(xhr.response);
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText
					});
				}
			}
			xhr.onerror = function () {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			};
			xhr.send();
		});
	},
	getImages: () => {
		console.log('getting images...')
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			let connectionString = `${hubAPI}/images`;
			console.log('connection string: ',connectionString)
			xhr.open('GET', connectionString);
			xhr.timeout = 5000;
			xhr.onload = function () {
				console.log('images: ',this.status);
				if (this.status >= 200 && this.status < 300) {
					const data = JSON.parse(xhr.response);
					resolve(data);
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText
					});
				}
			}
			xhr.onerror = function () {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			};
			xhr.send();
		});
	},
	getImagesStatic: () =>{
		return images;
	}
}