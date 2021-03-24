import ReactFlow, {
  Background,
  OnLoadParams,
  ReactFlowProps,
} from "react-flow-renderer"
import React, { MouseEvent, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addLink,
  addNode,
  deleteLink,
  deleteNode,
  updateNode,
} from "../../redux/flows/flows.actions"
import ChartNode from "./ChartNode"
import { selectSelectedFlow } from "../../redux/flows/flows.selectors"
import {
  FlowElement,
  FlowNode,
  FlowEdge,
  NodeConnection,
} from "../../redux/flows/flows.types"
import { isFlowNode, isFlowEdge } from "../../helpers/flow-chart"
type Props = {
  elements: FlowElement[]
}

const nodeTypes = {
  default: ChartNode,
}

export default function FlowChart(props: Props) {
  const dispatch = useDispatch()
  const flow = useSelector(selectSelectedFlow)
  const [
    reactFlowInstance,
    setReactFlowInstance,
  ] = useState<OnLoadParams | null>(null)

  const reactFlowWrapper = useRef<HTMLElement>(null)

  const onConnect = (params: FlowEdge | NodeConnection) => {
    if (params.source && params.target)
      dispatch(addLink(params.source, params.target))
  }

  const onElementsRemove = (elements: FlowElement[]) => {
    elements.forEach((element) => {
      if (isFlowEdge(element)) dispatch(deleteLink(element.id))
      if (isFlowNode(element)) dispatch(deleteNode(element.id))
    })
  }

  const onLoad = (_reactFlowInstance: OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance)

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const reactFlowBounds =
      reactFlowWrapper?.current?.getBoundingClientRect() || new DOMRect()
    const data = JSON.parse(event.dataTransfer.getData("application/reactflow"))
    const position = reactFlowInstance?.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    }) || { x: 0, y: 0 }
    dispatch(addNode(data.id, position, data))
  }

  const onNodeDragStop = (event: MouseEvent, node: FlowNode) => {
    dispatch(updateNode(node.id, { position: node.position }))
  }

  return (
    <div
      className="reactflow-wrapper"
      ref={reactFlowWrapper as React.RefObject<HTMLDivElement>}
      style={{ height: "100%", width: "100%" }}
    >
      <ReactFlow
        defaultPosition={[0, 50]}
        defaultZoom={1}
        elements={props.elements}
        onConnect={onConnect as ReactFlowProps["onConnect"]}
        onElementsRemove={onElementsRemove}
        onLoad={onLoad}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        nodesDraggable={flow.type !== "example"}
      >
        <Background variant="lines" gap={35} size={1} />
      </ReactFlow>
    </div>
  )
}
