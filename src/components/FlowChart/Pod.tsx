import React from "react"
import { ChartNodeElement } from "./ChartNode"
type Props = {
  label: string | undefined
}

export default function Pod({ label }: Props) {
  return (
    <ChartNodeElement id={`chart-node-${label}`}>
      <div className="node-header">
        <div className={`p-1`}>
          <p className="m-1">
            <span className="text-bold">
              {label || <span className="text-warning">Empty Pod</span>}
            </span>
          </p>
        </div>
      </div>
    </ChartNodeElement>
  )
}
