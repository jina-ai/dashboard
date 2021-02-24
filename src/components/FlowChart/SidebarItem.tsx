import * as React from "react"
import Pod from "./Pod"
import { NodeProperties } from "../../redux/flows/flows.types"

type Props = {
  label: string
  properties: NodeProperties
  idx: number
}

export default function SidebarItem({ label, properties, idx }: Props) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const dataString = JSON.stringify({ label: label, properties, idx })
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
      <Pod label={label} properties={properties} />
    </div>
  )
}
