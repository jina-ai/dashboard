import * as React from "react"
import ChartNode from "./ChartNode"

type Props = {
  label: string
  idx: number
}

export default function SidebarItem({ label, idx }: Props) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const dataString = JSON.stringify({ label })
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
