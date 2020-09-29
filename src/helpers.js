const YAML = require("yaml");
const settings = require("./settings");
const propertyList = require("./data/podProperties.json");

function toBlob(content) {
  return new Blob([content], { type: "text,plain;charset=utf-8" });
}
function serializeLogsToCSV(logs) {
  const columns =
    "created,formatted timestamp,name,process,level name,message,filename,line number,module,funcname,pathname\n";
  const fileContent = logs.reduce((acc, log) => {
    acc += `${log.created},"${log.formattedTimestamp}",${log.name},${log.process},${log.levelname},"${log.msg}",${log.filename},${log.lineno},${log.module},${log.funcname},${log.pathname}\n`;
    return acc;
  }, columns);
  return fileContent;
}

function serializeLogsToJSON(logs) {
  const fileContent = logs.reduce((acc, log, i) => {
    acc += JSON.stringify(log) + `${i < logs.length - 1 ? "," : ""}\n`;
    return acc;
  }, "\n");
  return `[${fileContent}]`;
}

function serializeLogsToText(logs) {
  const fileContent = logs.reduce((acc, log) => {
    acc += `${log.formattedTimestamp} ${log.name}@${log.process} [${log.levelname}]: ${log.msg}\n`;
    return acc;
  }, "");
  return fileContent;
}

const serializeLogsToCSVBlob = (logs) => toBlob(serializeLogsToCSV(logs));
const serializeLogsToJSONBlob = (logs) => toBlob(serializeLogsToJSON(logs));
const serializeLogsToTextBlob = (logs) => toBlob(serializeLogsToText(logs));

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
const getNodeLabelsByPortId = ({ from, to }, nodes) => ({
  [from.portId]: nodes[from.nodeId].label || nodes[from.nodeId].properties.name,
  [to.portId]: nodes[to.nodeId].label || nodes[to.nodeId].properties.name,
});
const decodePropValue = (propName, propValue) =>
  propertyTypes[propName] === "bool" ? propValue === "true" : propValue;
const unpackIfLengthOne = (arr) =>
  Array.isArray(arr) && arr.length === 1 ? arr[0] : arr;

export function formatAsYAML(chart) {
  console.log("formatAsYAML input: ", chart);
  const { with: chartWith, nodes, links } = chart;

  const needsByPodLabel = Object.values(links).reduce((acc, curr) => {
    const nodeLabelsByPortId = getNodeLabelsByPortId(curr, nodes);
    const neededBy = nodeLabelsByPortId.outPort;
    const needs = nodeLabelsByPortId.inPort;

    if (!acc[neededBy]) {
      acc[neededBy] = [];
    }
    acc[neededBy].push(needs);
    return acc;
  }, {});

  const pods = Object.values(nodes).reduce((acc, node) => {
    const { label } = node;
    if (!label) return acc;

    const podProperties = Object.entries(node.properties).reduce(
      (acc, [key, propValue]) => {
        acc[key] = decodePropValue(key, propValue);
        return acc;
      },
      {}
    );
    if (needsByPodLabel[label]) {
      podProperties.needs = unpackIfLengthOne(needsByPodLabel[label]);
    }

    acc[label] = { ...podProperties };
    return acc;
  }, {});

  const canvas = Object.values(nodes).reduce((acc, node) => {
    const {
      position: { x, y },
    } = node;
    acc[node.label] = { x, y };
    return acc;
  }, {});

  const output = { with: { ...chartWith, board: { canvas } }, pods };
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

export {
  serializeLogsToCSVBlob,
  serializeLogsToTextBlob,
  serializeLogsToJSONBlob,
};
