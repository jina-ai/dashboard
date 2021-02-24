import React from "react"
type Props = {
  label: string | undefined
}

//todo type NodeProps propserly with propser data data type
export default function Pod({ label }: Props) {
  return (
    <div className={`chart-node`} id={`chart-node-${label}`}>
      <div className="node-header">
        <div className={`p-1`}>
          <p className="m-1">
            <span className="text-bold">
              {label || <span className="text-warning">Empty Pod</span>}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
