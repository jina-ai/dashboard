// @ts-nocheck
import { FlowChart, NodeProperties } from "../redux/flows/flows.types"
import { Edge, Node, XYPosition } from "react-flow-renderer/dist/types"

const settings = require("./../settings")

export const createNode = (
  id: string,
  properties?: NodeProperties,
  position: XYPosition
): Node => ({
  id,
  type: id === "gateway" ? "input" : "default",
  data: {
    label: id,
    needs: properties.needs ? [...properties.needs] : [],
    send_to: {},
    properties,
    depth: undefined,
  },
  position,
})

export const createLink = (source: string, target: string): Edge => ({
  id: `e-${source}-to-${target}`,
  source,
  target,
})

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

    if (prevNode && !pod.needs && id !== "gateway")
      node.data.needs.push(prevNode)

    node.data.needs.forEach((parent) => links.push(createLink(parent, id)))

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

function getNodeDepth(nodes: Node[], node: Node): number {
  const parents = node.data.needs

  if (parents.length === 0) return 0
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
