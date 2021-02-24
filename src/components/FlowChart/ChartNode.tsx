import React from "react"
import { Handle, Node } from "react-flow-renderer"
import Pod from "./Pod"
import { showModal } from "../../redux/global/global.actions"
import { useDispatch, useSelector } from "react-redux"
import { selectSelectedFlow } from "../../redux/flows/flows.selectors"

export default function ChartNode({ id, data }: Node) {
  const type = useSelector(selectSelectedFlow).type
  const dispatch = useDispatch()
  return (
    <div
      onDoubleClick={() => {
        type === "user-generated" &&
          dispatch(showModal("podEdit", { nodeId: id }))
      }}
    >
      <Handle type="target" position="top" style={{ borderRadius: 0 }} />
      <Handle type="source" position="bottom" id="a" />
      <Pod label={data.label} />
      <Handle type="source" position="bottom" id="b" />
    </div>
  )
}
