import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectFlow } from "../../redux/flows/flows.selectors"
import { showModal } from "../../redux/global/global.actions"
import { NodeData } from "../../redux/flows/flows.types"

type Props = {
  data: NodeData
}

//todo type NodeProps propserly with propser data data type
export default function ChartNode({ data }: Props) {
  console.log("data")
  console.log(data)
  const properties = {}
  const label = data.label
  const list: any = []
  const dispatch = useDispatch()
  Object.keys(properties).forEach((prop, idx) => {
    if (properties[prop] && prop !== "name")
      list.push(
        <div key={idx}>
          <span className="text-bold mr-1">{prop}:</span>
          {properties[prop]}
        </div>
      )
  })
  const isSpecial = Object.keys(properties).length > 0
  let labelText = typeof label === "undefined" ? properties.name : label || ""
  const type = useSelector(selectFlow).type
  return (
    <div
      className={`chart-node`}
      id={`chart-node-${label}`}
      onDoubleClick={() => {
        type === "user-generated" &&
          dispatch(showModal("podEdit", { nodeId: node.id }))
      }}
    >
      <div className="node-header">
        <div className={`p-1 ${isSpecial ? "special" : ""}`}>
          <p className="m-1">
            <span className="text-bold">
              {labelText || <span className="text-warning">Empty Pod</span>}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
