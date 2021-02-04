// @ts-nocheck
const settings = require("./../settings");

type ParsedYAML = {
  pods: Array | { [key: string]: any };
  with?: {
    board?: {
      canvas?: { [key: string]: { x: number; y: number } };
    };
  };
  version?: string;
};

export const formatForFlowchart = (data: ParsedYAML) => {
  let pods = data.pods;
  let canvas = data.with?.board?.canvas;

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
    with: data.with,
  };

  let nodes = {};
  let links = {};

  let prevNode = false;

  if (data.version?.includes("1")) {
    let newPods = {};
    pods.forEach((pod) => {
      const id = pod.name;
      delete pod.name;
      newPods[id] = {
        ...pod,
      };
    });
    pods = newPods;
  }

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
      type: "input-output",
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
};

function getNodeDepth(nodes, currentId, currentDepth): number {
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
