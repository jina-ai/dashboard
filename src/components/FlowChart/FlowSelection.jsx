import React from "react";
import { Dropdown } from "react-bootstrap";

export default function FlowSelection({
  flowOptions,
  loadFlow,
  selectedFlowId,
  createNewFlow,
  connected,
}) {
  return (
    <Dropdown className="flow-selection">
      <Dropdown.Toggle>{flowOptions[selectedFlowId].name}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={createNewFlow}>
          <i className="material-icons">add</i>New Flow
        </Dropdown.Item>
        <Dropdown.Header className="text-uppercase">Your Flows</Dropdown.Header>
        {Object.entries(flowOptions)
          .filter(([id, flow]) => flow.type !== "example")
          .map(([flowId, flow], idx) => (
            <Dropdown.Item onClick={() => loadFlow(flowId)} key={idx}>
              {selectedFlowId === flowId ? (
                <i className="material-icons text-primary">
                  radio_button_checked
                </i>
              ) : (
                <i className="material-icons">radio_button_unchecked</i>
              )}
              {flow.name}
              {flow.type === "remote" &&
                (connected ? (
                  <i className="material-icons ml-2 text-success">wifi</i>
                ) : (
                  <i className="material-icons ml-2 text-warning">wifi_off</i>
                ))}
            </Dropdown.Item>
          ))}
        <Dropdown.Header className="text-uppercase">Examples</Dropdown.Header>
        {Object.entries(flowOptions)
          .filter(([id, flow]) => flow.type === "example")
          .map(([flowId, flow], idx) => (
            <Dropdown.Item onClick={() => loadFlow(flowId)} key={idx}>
              {selectedFlowId === flowId ? (
                <i className="material-icons text-primary">
                  radio_button_checked
                </i>
              ) : (
                <i className="material-icons">radio_button_unchecked</i>
              )}
              {flow.name}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
