const YAML = require("yaml");
const settings = require("./settings");
const propertyList = require("./data/podProperties.json");

const propertyTypes = {};
propertyList.forEach((prop) => (propertyTypes[prop.name] = prop.type));

export function copyToClipboard(str) {
  const temp = document.createElement("textarea");
  temp.value = str;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  return;
}
export function parseYAML(yamlSTR) {
  try {
    const data = YAML.parse(yamlSTR);
    return { data };
  } catch (error) {
    alert("Error Parsing YAML:\n" + error);
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
    scale: 1,
  };

  let nodes = {};
  let links = {};

  let prevNode = false;

  if (!pods.gateway) {
    let newPods = {};
    newPods = {
      gateway: null,
      ...pods,
    };
    pods = newPods;
  }

  Object.keys(pods).forEach((id) => {
    const pod = pods[id] || {};
    let node = {
      id,
      label: id,
      ports: {},
      needs: {},
      send_to: {},
      position: {},
      properties: { ...pod },
    };

    if (node.properties.needs) delete node.properties.needs;

    node.ports["inPort"] = { id: "inPort", type: "input" };
    node.ports["outPort"] = { id: "outPort", type: "output" };

    if (prevNode && !pod.needs && id !== "gateway") pod.needs = prevNode;

    if (pod.needs) {
      let parents = Array.isArray(pod.needs) ? pod.needs : [pod.needs];

      for (let i = 0; i < parents.length; ++i) {
        let nodeFrom = parents[i];
        node.needs[nodeFrom] = true;

        let linkId = `${nodeFrom}-to-${id}`;
        let link = {
          color: "red",
          id: linkId,
          from: { nodeId: nodeFrom, portId: "outPort" },
          to: { nodeId: id, portId: "inPort" },
        };
        links[linkId] = link;
      }
    }

    if (canvas && canvas[id]) {
      const { x, y } = canvas[id];
      node.position = { x: parseInt(x), y: parseInt(y) };
    }

    nodes[id] = node;
    prevNode = id;
  });

  const depthPopulation = {}; //how many nodes at each depth
  const offsetX = settings.nodeOffset.x;
  const offsetY = settings.nodeOffset.y;

  //fallback: if no position encoded on canvas portion of YAML, infer the position using depth and order
  Object.keys(nodes).forEach((id) => {
    let depth = getNodeDepth(nodes, id, 0);
    nodes[id].depth = depth;

    if (depthPopulation[depth] >= 0) depthPopulation[depth]++;
    else depthPopulation[depth] = 0;

    if (!nodes[id].position.x)
      nodes[id].position = {
        y: depth * offsetY + offsetY,
        x: depthPopulation[depth] * offsetX + offsetX,
      };
  });

  formatted.nodes = nodes;
  formatted.links = links;

  return formatted;
}

export function formatAsYAML(chart) {
  let output = {
    with: chart.with || {},
    pods: {},
  };
  output.with.board = { canvas: {} };

  Object.keys(chart.nodes).forEach((id) => {
    let node = chart.nodes[id];
    node.label = node.label || node.properties.name;
    if (node.properties.name) delete node.properties.name;
  });

  Object.keys(chart.nodes).forEach((id) => {
    const node = chart.nodes[id];

    if (!node.label) return;

    output.pods[node.label] = {};

    Object.keys(node.properties).forEach((propId) => {
      let type = propertyTypes[propId];
      if (type === "bool") {
        output.pods[node.label][propId] =
          String(node.properties[propId]) === "true";
      } else if (type === "int")
        output.pods[node.label][propId] = parseInt(node.properties[propId]);
      else output.pods[node.label][propId] = node.properties[propId];
    });
    output.with.board.canvas[node.label] = {
      x: node.position.x,
      y: node.position.y,
    };
  });
  Object.keys(chart.links).forEach((id) => {
    const link = chart.links[id];
    const nodeFrom = chart.nodes[link.from.nodeId].label;
    const nodeTo = chart.nodes[link.to.nodeId].label;
    if (!nodeFrom || !nodeTo) return;
    if (output.pods[nodeTo].needs) {
      if (!Array.isArray(output.pods[nodeTo].needs))
        output.pods[nodeTo].needs = [output.pods[nodeTo].needs];
      output.pods[nodeTo].needs.push(nodeFrom);
    } else output.pods[nodeTo].needs = nodeFrom;
  });
  return `!Flow\n${YAML.stringify(output)}`;
}

export function formatSeconds(numSeconds) {
  let minute = 60;
  let hour = 60 * 60;

  if (numSeconds < minute) return `${numSeconds}s`;
  if (numSeconds < hour)
    return `${parseInt(numSeconds / minute)}m ${parseInt(
      numSeconds % minute
    )}s`;
  else
    return `${parseInt(numSeconds / hour)}h ${parseInt(
      (numSeconds % hour) / minute
    )}m ${parseInt(numSeconds % minute)}s`;
}

export function formatBytes(numBytes) {
  if (numBytes < 1024) return `${numBytes} Bytes`;
  if (numBytes < 1024 ** 2) return `${parseFloat(numBytes).toFixed(1)} KB`;
  if (numBytes < 1024 ** 3)
    return `${parseFloat(numBytes / 1024 ** 2).toFixed(1)} MB`;
  return `${parseFloat(numBytes / 1024 ** 3).toFixed(1)} GB`;
}

function getNodeDepth(nodes, currentId, currentDepth) {
  let parents = Object.keys(nodes[currentId].needs);
  let longestDepth = 0;

  for (let i = 0; i < parents.length; ++i) {
    let parent = parents[i];
    let depth;
    if (nodes[parent].depth) depth = nodes[parent].depth + 1;
    else depth = getNodeDepth(nodes, parent, 1);
    if (depth > longestDepth) longestDepth = depth;
  }

  return currentDepth + longestDepth;
}
