const YAML = require('yaml');
const settings = require('./settings');


export function copyToClipboard(str) {
	const temp = document.createElement('textarea');
	temp.value = str;
	document.body.appendChild(temp);
	temp.select();
	document.execCommand('copy');
	document.body.removeChild(temp);
	return;
}
export function parseYAML(yamlSTR) {
	try {
		yamlSTR = yamlSTR.replace("!Flow", "")
		const data = YAML.parse(yamlSTR);
		console.log(yamlSTR, ':', data);
		return { data };
	}
	catch (error) {
		alert('Error Parsing YAML:\n' + error);
		return { error };
	}
}
export function formatForFlowchart(pods, canvas) {
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

	let prevNode = false;

	Object.keys(pods).map(id => {
		const pod = pods[id] || {};
		let node = {
			id,
			label: id,
			ports: {},
			needs: {},
			send_to: {},
			position: {},
			properties: { ...pod }
		}

		if (node.properties.needs)
			delete node.properties.needs

		node.ports['inPort'] = { id: 'inPort', type: 'input', }
		node.ports['outPort'] = { id: 'outPort', type: 'output', }

		if (prevNode && !pod.needs)
			pod.needs = prevNode;

		if (pod.needs) {
			let parents = Array.isArray(pod.needs) ? pod.needs : [pod.needs];

			for (let i = 0; i < parents.length; ++i) {
				let nodeFrom = parents[i];
				node.needs[nodeFrom] = true;

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

		if (canvas && canvas[id]) {
			const { x, y } = canvas[id];
			node.position = { x, y };
		}

		nodes[id] = node;
		prevNode = id;
	});

	const depthPopulation = {}; //how many nodes at each depth
	const offsetX = settings.nodeOffset.x;
	const offsetY = settings.nodeOffset.y;

	//fallback: if no position encoded on canvas portion of YAML, infer the position using depth and order
	Object.keys(nodes).map(id => {
		let depth = getNodeDepth(nodes, id, 0);
		nodes[id].depth = depth;

		if (depthPopulation[depth] >= 0)
			depthPopulation[depth]++;
		else
			depthPopulation[depth] = 0;

		if (!nodes[id].position.x)
			nodes[id].position = { y: (depth * offsetY) + offsetY, x: (depthPopulation[depth] * offsetX) + offsetX };
	});

	formatted.nodes = nodes;
	formatted.links = links;

	return formatted;
}

export function formatAsYAML(chart) {
	console.log('chart: ', chart)
	let output = {
		with: chart.with || {},
		pods: {}
	}
	output.with.board = { canvas: {} };
	Object.keys(chart.nodes).map(id => {
		const node = chart.nodes[id];
		output.pods[node.label] = {
			...node.properties
		}
		output.with.board.canvas[node.label] = {
			x: node.position.x,
			y: node.position.y
		}
	});
	Object.keys(chart.links).map(id => {
		const link = chart.links[id];
		const nodeFrom = chart.nodes[link.from.nodeId].label;
		const nodeTo = chart.nodes[link.to.nodeId].label;
		if (output.pods[nodeTo].needs) {
			if (!Array.isArray(output.pods[nodeTo].needs))
				output.pods[nodeTo].needs = [output.pods[nodeTo].needs]
			output.pods[nodeTo].needs.push(nodeFrom)
		}
		else
			output.pods[nodeTo].needs = nodeFrom;
	});
	return `!Flow\n${YAML.stringify(output)}`;
}

function getNodeDepth(nodes, currentId, currentDepth) {
	let parents = Object.keys(nodes[currentId].needs);
	let longestDepth = 0;

	for (let i = 0; i < parents.length; ++i) {
		let parent = parents[i];
		console.log('parent: ',nodes[parent]);
		let depth;
		if(nodes[parent].depth )
			depth = nodes[parent].depth +1;
		else
		depth = getNodeDepth(nodes, parent, 1);
		if (depth > longestDepth)
			longestDepth = depth;
	}

	return currentDepth + longestDepth;
}