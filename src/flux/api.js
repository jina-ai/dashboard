let stream;
export default {
	connect: (settings, callback) => {
		if(stream)
		stream.close();
		const connectionString = `${settings.host}:${settings.port}${settings.log.startsWith('/') ? settings.log : '/' + settings.log}`;
		console.log('logs connectionString: ',connectionString)
		stream = new EventSource(connectionString);
		stream.onopen = () => {
			callback({ type: 'connect', data: `Connection established at ${settings.host}:${settings.port}` })
		}
		stream.onmessage = (m) => {
			callback({ type: 'log', data: JSON.parse(m.data) });
		}
		stream.onerror = (data) => {
			callback({ type: 'error', data:`Could not get log data from ${connectionString}` });
			stream.close()
		}
	},
	getYAML: (settings) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			const connectionString = `${settings.host}:${settings.port}${settings.yaml.startsWith('/') ? settings.yaml : '/' + settings.yaml}`;
			console.log('YAML connectionString: ',connectionString)
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
	}
}