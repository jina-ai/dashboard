import * as React from "react"
import ChartNode from "./ChartNode"
import { NodeProperties } from "../../redux/flows/flows.types"

type Props = {
  label?: string
  ports: {
    [key: string]: any
  }
  properties: NodeProperties
  idx: number
}

export default function SidebarItem({ label, properties, idx }: Props) {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }
  const ref: React.RefObject<HTMLInputElement> = React.createRef()
  return (
    <div
      data-name={`SideBarItem-${idx}`}
      ref={ref}
      className="mb-3 draggable-container"
      draggable={true}
      onDragStart={(event) =>
        onDragStart(event, label === "gateway" ? "input" : "default")
      }
    >
      <ChartNode node={{ properties, label }} />
    </div>
  )
}
