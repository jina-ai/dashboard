const LOG_URL = 'http://localhost:5000/log/stream';
const YAML_URL = 'http://localhost:5000/yaml';

export default {
	onNewLog: (callback) => {
		const stream = new EventSource(LOG_URL);
		stream.onmessage = (m) => {
			callback({ data: JSON.parse(m.data) });
		}
		stream.onerror = (data) => {
			callback({ error: true, data});
			stream.close()
		}
	},
	getYAML: () => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', YAML_URL);
			xhr.onload = function(){
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
	}
}