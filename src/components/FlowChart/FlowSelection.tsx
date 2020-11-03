import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

type SelectionIndicatorProps = {
  selected: boolean;
};

function SelectionIndicator({ selected }: SelectionIndicatorProps) {
  return selected ? (
    <i className="material-icons text-primary">radio_button_checked</i>
  ) : (
    <i className="material-icons">radio_button_unchecked</i>
  );
}

type ConnectionIndicatorProps = {
  connected: boolean;
  show: boolean;
};

function ConnectionIndicator({ connected, show }: ConnectionIndicatorProps) {
  if (!show) return null;
  return connected ? (
    <i className="material-icons ml-2 text-success">wifi</i>
  ) : (
    <i className="material-icons ml-2 text-warning">wifi_off</i>
  );
}

function TitleConnectionIndicator({
  connected,
  show,
}: ConnectionIndicatorProps) {
  if (!show) return null;
  return connected ? (
    <i className="material-icons text-white ml-1 mr-2">wifi</i>
  ) : (
    <i className="material-icons text-warning ml-1 mr-2">wifi_off</i>
  );
}

type DeleteFlowProps = {
  deleteFlow: (e: any) => void;
  show: boolean;
};

function DeleteFlowButton({ show, deleteFlow }: DeleteFlowProps) {
  if (!show) return null;
  return (
    <i className="material-icons text-danger float-right" onClick={deleteFlow}>
      delete
    </i>
  );
}

type EditFlowsProps = {
  toggleEditing: () => void;
  isEditing: boolean;
};

function EditFlowsButton({ isEditing, toggleEditing }: EditFlowsProps) {
  return isEditing ? (
    <i
      onClick={toggleEditing}
      className="material-icons float-right cursor-pointer text-success"
    >
      done
    </i>
  ) : (
    <i
      onClick={toggleEditing}
      className="material-icons float-right cursor-pointer"
    >
      edit
    </i>
  );
}

type FlowSelectionProps = {
  flows: {
    [key: string]: any;
  };
  loadFlow: (flowId: string) => void;
  createNewFlow: (e: any) => void;
  deleteFlow: (e: any, flowId: string) => void;
  selectedFlowId: string;
  connected: boolean;
};

export default function FlowSelection({
  flows,
  loadFlow,
  selectedFlowId,
  createNewFlow,
  deleteFlow,
  connected,
}: FlowSelectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((currentIsEditing) => !currentIsEditing);
  };

  const userFlows = Object.entries(flows).filter(
    ([id, flow]) => flow.type !== "example"
  );

  const exampleFlows = Object.entries(flows).filter(
    ([id, flow]) => flow.type === "example"
  );

  const currentFlow = flows[selectedFlowId];

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
          <EditFlowsButton
            isEditing={isEditing}
            toggleEditing={toggleEditing}
          />
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
              deleteFlow={(e: any) => deleteFlow(e, flowId)}
            />
          </Dropdown.Item>
        ))}
        <Dropdown.Header className="text-uppercase">Examples</Dropdown.Header>
        {exampleFlows.map(([flowId, flow], idx) => (
          <Dropdown.Item onClick={() => loadFlow(flowId)} key={idx}>
            <SelectionIndicator selected={flowId === selectedFlowId} />
            {flow.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
