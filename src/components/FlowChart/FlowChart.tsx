import ReactFlow, { Elements, isEdge, OnLoadParams } from "react-flow-renderer"
import React, { MouseEvent, useRef, useState } from "react"
import { Connection, Edge } from "react-flow-renderer/dist/types"
import { useDispatch, useSelector } from "react-redux"
import {
  addLink,
  addNode,
  deleteLink,
  deleteNode,
  updateNode,
} from "../../redux/flows/flows.actions"
import { isNode, Node } from "react-flow-renderer"
import ChartNode from "./ChartNode"
import { selectSelectedFlow } from "../../redux/flows/flows.selectors"

type Props = {
  elements: Elements
}

const nodeTypes = {
  pod: ChartNode,
  gateway: ChartNode,
}

export default function FlowChart(props: Props) {
  const dispatch = useDispatch()
  const flow = useSelector(selectSelectedFlow)
  const [
    reactFlowInstance,
    setReactFlowInstance,
  ] = useState<OnLoadParams | null>(null)

  const reactFlowWrapper = useRef<HTMLElement>(null)

  const onConnect = (params: Edge | Connection) => {
    if (params.source && params.target)
      dispatch(addLink(params.source, params.target, null, null))
  }

  const onElementsRemove = (elements: Elements) => {
    elements.forEach((element) => {
      if (isEdge(element)) dispatch(deleteLink(element.id))
      if (isNode(element)) dispatch(deleteNode(element.id))
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
    dispatch(addNode(data.label, position, data))
  }

  const onNodeDragStop = (event: MouseEvent, node: Node) => {
    dispatch(updateNode(node.id, { position: node.position }))
  }

  return (
    <div
      className="reactflow-wrapper"
      ref={reactFlowWrapper as React.RefObject<HTMLDivElement>}
      style={{ height: "100%", width: "100%" }}
    >
      <ReactFlow
        elements={props.elements}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        onLoad={onLoad}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        nodesDraggable={flow.type !== "example"}
      />
    </div>
  )
}
