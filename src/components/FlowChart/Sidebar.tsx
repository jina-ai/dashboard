import React from "react";
import SidebarItem from "./SidebarItem";
import defaultPods from "../../data/defaultPods";
import { Button, Card } from "react-bootstrap";
import { Flow, FlowArgument } from "../../redux/flows/flows.types";

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
  );
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
              idx={idx}
              key={idx}
              ports={{
                inPort: {
                  id: "inPort",
                  type: "input",
                },
                outPort: {
                  id: "outPort",
                  type: "output",
                },
              }}
              properties={pod}
            />
          );
        })}
      </div>
    </div>
  );
}

type FlowChartSidebarProps = {
  readonly: boolean;
  flow: Flow;
  duplicateFlow: () => void;
  updateNode: (updates: any) => void;
  deleteSelection: () => void;
  updateLink: (
    linkId: string,
    nodeFromId: string,
    nodeToId: string | undefined
  ) => void;
  arguments: FlowArgument[];
};

function FlowChartSidebar({ readonly, duplicateFlow }: FlowChartSidebarProps) {
  return (
    <Card className="flowchart-sidebar mb-4">
      {readonly ? <ReadOnly duplicateFlow={duplicateFlow} /> : <PodMenu />}
    </Card>
  );
}

export default FlowChartSidebar;
