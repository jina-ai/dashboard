// @ts-nocheck
import { FlowChart } from "../redux/flows/flows.types"
import { Edge, Node } from "react-flow-renderer/dist/types"
import { createLink, createNode } from "../redux/flows/flows.reducer"

const settings = require("./../settings")

//todo type this properly
type ParsedYAML = {
  pods: Array | { [key: string]: any }
  with?: {
    board?: {
      canvas?: { [key: string]: { x: number; y: number } }
    }
  }
  version?: string
}

export const formatForFlowchart = (data: ParsedYAML): FlowChart => {
  let pods = data.pods
  let canvas = data.with?.board?.canvas

  const formatted: FlowChart = {
    with: data.with,
  }

  let nodes: Node[] = []
  let links: Edge[] = []

  if (data.version?.includes("1")) {
    let podMap = {}
    pods.forEach((pod) => {
      const id = pod.name
      delete pod.name
      podMap[id] = {
        ...pod,
      }
    })
    pods = podMap
  }

  if (!pods.gateway) {
    pods = {
      gateway: null,
      ...pods,
    }
  }

  let prevNode
  Object.keys(pods).forEach((id) => {
    const pod = pods[id] || {}
    let node: Node = createNode(id, pod, {})

    if (node.data.properties.needs) delete node.data.properties.needs

    // node.data.ports["inPort"] = { id: "inPort", type: "input" };
    // node.data.ports["outPort"] = { id: "outPort", type: "output" };

    if (prevNode && !pod.needs && id !== "gateway") pod.needs = prevNode

    node.data.needs.forEach((parent, idx) =>
      links.push(createLink(parent, idx))
    )

    if (canvas && canvas[id]) {
      const { x, y } = canvas[id]
      node.position = { x: parseInt(x), y: parseInt(y) }
    }

    nodes.push(node)
    prevNode = id
  })

  const depthPopulation = {} //how many nodes at each depth
  const offsetX = settings.nodeOffset.x
  const offsetY = settings.nodeOffset.y

  //fallback: if no position encoded on canvas portion of YAML, infer the position using depth and order
  nodes.forEach((node) => {
    const depth = getNodeDepth(nodes, node)
    node.data.depth = depth

    depthPopulation[depth] >= 0
      ? depthPopulation[depth]++
      : (depthPopulation[depth] = 0)

    if (!node.position.x)
      node.position = {
        y: depth * offsetY + offsetY,
        x: depthPopulation[depth] * offsetX + offsetX,
      }
  })

  formatted.elements = [...nodes, ...links]

  return formatted
}

function getNodeDepth(nodes: Node[], node: Node): number {
  const parents = node.data.needs

  if (parents.length === 0) return 0
  else {
    const parentDepthList = parents.map((parentId) => {
      const parent = nodes.find((node) => node.id === parentId)
      let depth
      if (parent.data.depth) depth = parent.data.depth + 1
      else depth = getNodeDepth(nodes, parent) + 1
      return depth
    })

    return Math.max(parentDepthList)
  }
}
