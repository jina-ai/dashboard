import React from "react";
import { Dropdown } from "react-bootstrap";

export default function FlowSelection({
  flowOptions,
  loadFlow,
  selectedFlowId,
}) {
  return (
    <Dropdown className="flow-selection">
      <Dropdown.Toggle>{flowOptions[selectedFlowId].name}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => loadFlow("pokedex")}>
          <i className="material-icons">add</i>New Flow
        </Dropdown.Item>
        <Dropdown.Header>Your Flows</Dropdown.Header>
        {Object.entries(flowOptions).filter(([id,flow])=>flow.type!=='example').map(([flowId,flow]) => (
          <Dropdown.Item onClick={() => loadFlow(flowId)}>
            {
              selectedFlowId===flowId?
              <i className="material-icons text-primary">radio_button_checked</i>
              :
              <i className="material-icons">radio_button_unchecked</i>
            }
            {flow.name}
          </Dropdown.Item>
        ))}
        <Dropdown.Header>Examples</Dropdown.Header>
        {Object.entries(flowOptions).filter(([id,flow])=>flow.type==='example').map(([flowId,flow]) => (
          <Dropdown.Item onClick={() => loadFlow(flowId)}>
            {
              selectedFlowId===flowId?
              <i className="material-icons text-primary">radio_button_checked</i>
              :
              <i className="material-icons">radio_button_unchecked</i>
            }
            {flow.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
