import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

function SelectionIndicator({ selected }) {
  return selected ? (
    <i className="material-icons text-primary">radio_button_checked</i>
  ) : (
    <i className="material-icons">radio_button_unchecked</i>
  );
}

function ConnectionIndicator({ connected, show }) {
  if (!show) return null;
  return connected ? (
    <i className="material-icons ml-2 text-success">wifi</i>
  ) : (
    <i className="material-icons ml-2 text-warning">wifi_off</i>
  );
}

function TitleConnectionIndicator({ connected, show }) {
  if (!show) return null;
  return connected ? (
    <i className="material-icons text-white ml-1 mr-2">wifi</i>
  ) : (
    <i className="material-icons text-warning ml-1 mr-2">wifi_off</i>
  );
}

function DeleteFlowButton({ show, deleteFlow }) {
  if (!show) return null;
  return (
    <i className="material-icons text-danger float-right" onClick={deleteFlow}>
      delete
    </i>
  );
}

function EditFlowsButton({ isEditing, onClick }) {
  return isEditing ? (
    <i
      onClick={onClick}
      className="material-icons float-right cursor-pointer text-success"
    >
      done
    </i>
  ) : (
    <i onClick={onClick} className="material-icons float-right cursor-pointer">
      edit
    </i>
  );
}

export default function FlowSelection({
  flowOptions,
  loadFlow,
  selectedFlowId,
  createNewFlow,
  deleteFlow,
  connected,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((currentIsEditing) => !currentIsEditing);
  };

  const userFlows = Object.entries(flowOptions).filter(
    ([id, flow]) => flow.type !== "example"
  );

  const exampleFlows = Object.entries(flowOptions).filter(
    ([id, flow]) => flow.type === "example"
  );

  const currentFlow = flowOptions[selectedFlowId];

  return (
    <Dropdown className="flow-selection">
      <Dropdown.Toggle>
        {currentFlow.name}
        <TitleConnectionIndicator
          show={currentFlow.type === "remote"}
          connected={connected}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={createNewFlow}>
          <i className="material-icons">add</i>New Flow
        </Dropdown.Item>
        <Dropdown.Header className="text-uppercase">
          Your Flows{" "}
          <EditFlowsButton isEditing={isEditing} onClick={toggleEditing} />
        </Dropdown.Header>
        {userFlows.map(([flowId, flow], idx) => (
          <Dropdown.Item onClick={() => loadFlow(flowId)} key={idx}>
            <SelectionIndicator selected={flowId === selectedFlowId} />
            {flow.name}
            <ConnectionIndicator
              show={flow.type === "remote"}
              connected={connected}
            />
            <DeleteFlowButton
              show={flow.type === "user-generated" && isEditing}
              deleteFlow={(e) => deleteFlow(e, flowId)}
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
