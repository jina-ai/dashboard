import * as React from "react"
import ChartNode from "./ChartNode"
import { nanoid } from "nanoid"

type Props = {
  label: string
  idx: number
}

export default function SidebarItem({ label, idx }: Props) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const id = nanoid()
    const dataString = JSON.stringify({ id, label })
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
      <ChartNode label={label} />
    </div>
  )
}
