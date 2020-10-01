import React from "react";
import { Dropdown } from "react-bootstrap";

function SelectionIndicator({ selectedId, itemId }) {
  return selectedId === itemId ? (
    <i className="material-icons text-primary">radio_button_checked</i>
  ) : (
    <i className="material-icons">radio_button_unchecked</i>
  );
}

function ConnectionIndicator({ connected, showIndicator }) {
  if (!showIndicator) return null;
  return connected ? (
    <i className="material-icons ml-2 text-success">wifi</i>
  ) : (
    <i className="material-icons ml-2 text-warning">wifi_off</i>
  );
}

export default function FlowSelection({
  flowOptions,
  loadFlow,
  selectedFlowId,
  createNewFlow,
  connected,
}) {
  const userFlows = Object.entries(flowOptions).filter(
    ([id, flow]) => flow.type !== "example"
  );

  const exampleFlows = Object.entries(flowOptions).filter(
    ([id, flow]) => flow.type === "example"
  );

  return (
    <Dropdown className="flow-selection">
      <Dropdown.Toggle>{flowOptions[selectedFlowId].name}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={createNewFlow}>
          <i className="material-icons">add</i>New Flow
        </Dropdown.Item>
        <Dropdown.Header className="text-uppercase">Your Flows</Dropdown.Header>
        {userFlows.map(([flowId, flow], idx) => (
          <Dropdown.Item onClick={() => loadFlow(flowId)} key={idx}>
            <SelectionIndicator itemId={flowId} selectedId={selectedFlowId} />
            {flow.name}
            <ConnectionIndicator
              showIndicator={flow.type === "remote"}
              connected={connected}
            />
          </Dropdown.Item>
        ))}
        <Dropdown.Header className="text-uppercase">Examples</Dropdown.Header>
        {exampleFlows.map(([flowId, flow], idx) => (
          <Dropdown.Item onClick={() => loadFlow(flowId)} key={idx}>
            <SelectionIndicator itemId={flowId} selectedId={selectedFlowId} />
            {flow.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
