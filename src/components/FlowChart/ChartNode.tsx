import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectFlowChart } from "../../redux/flows/flows.selectors"
import { showModal } from "../../redux/global/global.actions"

type Props = {
  node: {
    properties: any
    label: string | undefined
    id?: string
  }
}

export default function ChartNode({ node }: Props) {
  const { properties, label } = node
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
  const type = useSelector(selectFlowChart).type
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
