const YAML = require('yamljs');
const settings = require('./settings');

module.exports = {
	parseYAML: (yamlFilePath) => {
		try {
			const data = YAML.load(yamlFilePath);
			console.log(yamlFilePath, ':', data);
			return { data };
		}
		catch (error) {
			alert('Error Parsing YAML:\n' + error);
			return { error };
		}
	},
	getYAMLString: (jsonData) => {
		try {
			const yamlString = YAML.stringify(jsonData, 2);
			return { yamlString }
		}
		catch (error) {
			alert('Error Encoding YAML:', error);
			return { error };
		}
	},
	formatForFlowchart: (pods) => {
		const formatted = {
			offset: {
				x: 0,
				y: 0,
			},
			nodes: {},
			links: {},
			selected: {},
			hovered: {},
		}

		let nodes = {};
		let links = {};

		let px = 300;
		let py = 100;
		let prevNode = false;

		//initial pass: gathering basic node and link information
		Object.keys(pods).map(id => {
			const pod = pods[id];
			let node = {
				id,
				label: id,
				ports: {},
				recv_from: {},
				send_to: {},
				position: {
					x: 100,
					y: 100,
				},
				properties: { ...pod }
			}

			if (node.properties.recv_from)
				delete node.properties.recv_from

			if (node.properties.send_to)
				delete node.properties.send_to

			node.ports['inPort'] = { id: 'inPort', type: 'input', }
			node.ports['outPort'] = { id: 'outPort', type: 'output', }

			if (prevNode && !pod.recv_from) {
				pod.recv_from = prevNode;
			}

			if (pod.recv_from) {
				let parents = Array.isArray(pod.recv_from) ? pod.recv_from : [pod.recv_from];

				for (let i = 0; i < parents.length; ++i) {
					let nodeFrom = parents[i];
					node.recv_from[nodeFrom] = true;

					let linkId = `${nodeFrom}-to-${id}`;
					let link = {
						color: 'red',
						id: linkId,
						from: { nodeId: nodeFrom, portId: 'outPort' },
						to: { nodeId: id, portId: 'inPort' }
					}
					links[linkId] = link;
				}
			}

			if (pod.send_to) {
				let children = Array.isArray(pod.send_to) ? pod.send_to : [pod.send_to];

				for (let i = 0; i < children.length; ++i) {
					let nodeTo = children[i];
					node.send_to[nodeTo] = true;

					let linkId = `${id}-to-${nodeTo}`;
					let link = {
						id: linkId,
						from: { nodeId: id, portId: 'outPort' },
						to: { nodeId: nodeTo, portId: 'inPort' }
					}
					links[linkId] = link;
				}
			}
			nodes[id] = node;
			prevNode = id;
		});

		//second pass: ensuring each node has recv_from and send_to
		Object.keys(links).map(id => {
			const link = links[id];
			nodes[link.from.nodeId].send_to[link.to.nodeId] = true;
			nodes[link.to.nodeId].recv_from[link.from.nodeId] = true;
		});

		let maxDepth = 0;
		let maxWidth = 0;
		const depthPopulation = {}; //how many nodes at each depth
		const offsetX = settings.nodeOffset.x;
		const offsetY = settings.nodeOffset.y;

		//third pass: setting depth for each node
		Object.keys(nodes).map(id => {
			let depth = getNodeDepth(nodes, id, 0);
			nodes[id].depth = depth;

			if (depth > maxDepth)
				maxDepth = depth;

			if (depthPopulation[depth] >= 0)
				depthPopulation[depth]++;
			else
				depthPopulation[depth] = 0;

			if (depthPopulation[depth] > maxWidth)
				maxWidth = depthPopulation[depth];

			nodes[id].position = { y: (depth * offsetY) + offsetY, x: (depthPopulation[depth] * offsetX) + offsetX };
		});

		formatted.nodes = nodes;
		formatted.links = links;

		return formatted;
	}
}

function getNodeDepth(nodes, currentId, currentDepth) {
	let parents = Object.keys(nodes[currentId].recv_from);
	let longestDepth = 0;

	for (let i = 0; i < parents.length; ++i) {
		let parent = parents[i];
		let depth = getNodeDepth(nodes, parent, 1);
		if (depth > longestDepth)
			longestDepth = depth;
	}

	return currentDepth + longestDepth;
}