import * as React from "react"
import Pod from "./Pod"
import { NodeData } from "../../redux/flows/flows.types"

type Props = {
  label: string
  data: NodeData
  idx: number
}

export default function SidebarItem({ label, data, idx }: Props) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const dataString = JSON.stringify({ label, ...data })
    event.dataTransfer.setData("application/reactflow", dataString)
    event.dataTransfer.effectAllowed = "move"
  }

  const ref: React.RefObject<HTMLInputElement> = React.createRef()
  return (
    <div
      data-name={`SideBarItem-${idx}`}
      ref={ref}
      className="mb-3 draggable-container"
      draggable={true}
      onDragStart={onDragStart}
    >
      <Pod label={label} />
    </div>
  )
}
