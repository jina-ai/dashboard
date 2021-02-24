import ReactFlow, { Elements, isEdge, OnLoadParams } from "react-flow-renderer"
import React, { useRef, useState } from "react"
import { Connection, Edge } from "react-flow-renderer/dist/types"
import { useDispatch } from "react-redux"
import {
  addLink,
  addNode,
  deleteLink,
  deleteNode,
} from "../../redux/flows/flows.actions"
import { isNode } from "react-flow-renderer/nocss"
import ChartNode from "./ChartNode"

type Props = {
  elements: Elements
}

const nodeTypes = {
  pod: ChartNode,
}

export default function FlowChart(props: Props) {
  const dispatch = useDispatch()

  const [
    reactFlowInstance,
    setReactFlowInstance,
  ] = useState<OnLoadParams | null>(null)

  const reactFlowWrapper = useRef<HTMLElement>(null)

  const onConnect = (params: Edge | Connection) => {
    if (params.source && params.target)
      dispatch(addLink(params.source, params.target))
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
    console.log("data")
    console.log(data)
    dispatch(addNode(data.label, position, data))
  }

  return (
    <div
      className="reactflow-wrapper"
      ref={reactFlowWrapper as React.RefObject<HTMLDivElement>}
      style={{ height: 1000, width: 1000 }}
    >
      <ReactFlow
        elements={props.elements}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        onLoad={onLoad}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
      />
    </div>
  )
}
