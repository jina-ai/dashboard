// @ts-nocheck
import {
  FlowChart,
  FlowEdge,
  FlowNode,
  NodeData,
  Pod,
} from "../redux/flows/flows.types"
import { isEdge, isNode, XYPosition } from "react-flow-renderer"
const settings = require("./../settings")

export const isFlowEdge = isEdge
export const isFlowNode = isNode

export const createNode = (
  id: string,
  data?: NodeData,
  position: XYPosition
): FlowNode => {
  return {
    id,
    type: id === "gateway" ? "gateway" : "pod",
    data,
    position,
  }
}

export const createEdge = (source: string, target: string): FlowEdge => ({
  id: `e-${source}-to-${target}`,
  source,
  target,
  type: "step",
})

type ParsedYAML = {
  pods: Pod[]
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

  let nodes: FlowNode[] = []
  let links: FlowLink[] = []

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

    let node: FlowNode = createNode(id, pod, {})

    node.data.label = id
    node.data.name = id

    if (prevNode && !node.data.needs && id !== "gateway") {
      !node.data.needs && (node.data.needs = [])
      node.data.needs.push(prevNode)
    }

    if (node?.data?.needs)
      node.data.needs.forEach((parent) => links.push(createEdge(parent, id)))

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

    depthPopulation[depth] === undefined
      ? (depthPopulation[depth] = 1)
      : (depthPopulation[depth] = depthPopulation[depth] + 1)

    if (!node.position.x)
      node.position = {
        y: depth * offsetY + offsetY,
        x: depthPopulation[depth] * offsetX,
      }
  })

  formatted.elements = [...nodes, ...links]

  return formatted
}

function getNodeDepth(nodes: FlowNode[], node: FlowNode): number {
  const parents = node.data.needs

  if (!parents || parents.length === 0) return 0
  else {
    const parentDepthList = parents.map((parentId) => {
      const parent = nodes.find((node) => node.id === parentId)
      let depth
      if (parent.data.depth) depth = parent.data.depth
      else depth = getNodeDepth(nodes, parent)
      return depth
    })
    const max = Math.max(...parentDepthList) + 1
    return max
  }
}
