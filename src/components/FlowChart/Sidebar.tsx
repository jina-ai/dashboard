import React from "react"
import SidebarItem from "./SidebarItem"
import defaultPods from "../../data/defaultPods"
import { Button, Card } from "react-bootstrap"
import { FlowArgument } from "../../redux/flows/flows.types"
import { Elements } from "react-flow-renderer"

function ReadOnly({ duplicateFlow }: { duplicateFlow: () => void }) {
  return (
    <div className="readonly-overlay py-4 px-4 text-center">
      <h4 className="my-4">
        <b>
          This flow is <span className="text-muted">readonly</span>
        </b>
      </h4>
      <p className="my-4">To edit this flow, please duplicate it.</p>
      <Button onClick={duplicateFlow}>Duplicate Flow</Button>
    </div>
  )
}

function PodMenu() {
  return (
    <div className="d-flex flex-column h-100">
      <h5 className="px-3 py-2 mb-0 border-bottom">
        <b>Add Pods</b>
      </h5>
      <div className="p-3 scrollable flex-fill">
        {defaultPods.map((pod, idx) => {
          return (
            <SidebarItem
              key={`SideBarItem-${idx}`}
              label={pod.name || "Empty Pod"}
              idx={idx}
            />
          )
        })}
      </div>
    </div>
  )
}

type FlowChartSidebarProps = {
  readonly: boolean
  elements: Elements
  duplicateFlow: () => void
  deleteSelection: () => void
  arguments: FlowArgument[]
}

function FlowChartSidebar({ readonly, duplicateFlow }: FlowChartSidebarProps) {
  return (
    <Card className="flowchart-sidebar mb-4">
      {readonly ? <ReadOnly duplicateFlow={duplicateFlow} /> : <PodMenu />}
    </Card>
  )
}

export default FlowChartSidebar
