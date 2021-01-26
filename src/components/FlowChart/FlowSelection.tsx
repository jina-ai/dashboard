import React from "react";

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import deleteIcon from "../../assets/icons/Delete.svg";

// type SelectionIndicatorProps = {
//   selected: boolean;
// };

// function SelectionIndicator({ selected }: SelectionIndicatorProps) {
//   return selected ? (
//     <i className="material-icons text-primary">radio_button_checked</i>
//   ) : (
//     <i className="material-icons">radio_button_unchecked</i>
//   );
// }

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
};

function DeleteFlowButton({ deleteFlow }: DeleteFlowProps) {
  return <img alt={"deleteFlowButton"} src={deleteIcon} onClick={deleteFlow} />;
}

// type EditFlowsProps = {
//   toggleEditing: () => void;
//   isEditing: boolean;
// };

// function EditFlowsButton({ isEditing, toggleEditing }: EditFlowsProps) {
//   return isEditing ? (
//     <i
//       onClick={toggleEditing}
//       className="material-icons float-right cursor-pointer text-success"
//     >
//       done
//     </i>
//   ) : (
//     <i
//       onClick={toggleEditing}
//       className="material-icons float-right cursor-pointer"
//     >
//       edit
//     </i>
//   );
// }

type FlowSelectionProps = {
  flows: {
    [key: string]: any;
  };
  showNewFlowModal: () => void;
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
  showNewFlowModal,
  deleteFlow,
  connected,
}: FlowSelectionProps) {
  const { palette } = useTheme();

  const FlowSelectionMenu = styled.div`
    font-family: "Montserrat";
    min-width: 10rem;
    margin-right: 3rem;
  `;

  const SelectedFlowHeader = styled.div`
    font-weight: 600;
    font-size: 20px;
    color: ${palette.headerTextColor};
  `;

  const FlowTap = styled.div`
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin-left: 1rem;
  `;

  const FlowHeader = styled.div`
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.headerTextColor};
  `;

  // const [isEditing, setIsEditing] = useState(false);

  // const toggleEditing = () => {
  //   setIsEditing((currentIsEditing) => !currentIsEditing);
  // };

  const userFlows = Object.entries(flows).filter(
    ([id, flow]) => flow.type !== "example"
  );

  const exampleFlows = Object.entries(flows).filter(
    ([id, flow]) => flow.type === "example"
  );

  const currentFlow = flows[selectedFlowId];

  return (
    <FlowSelectionMenu>
      <SelectedFlowHeader>
        {currentFlow.name}
        <TitleConnectionIndicator
          show={currentFlow.type === "remote"}
          connected={connected}
        />
      </SelectedFlowHeader>

      <FlowTap onClick={showNewFlowModal}>
        New Flow <i className="material-icons">add</i>
      </FlowTap>

      <FlowHeader>My flow </FlowHeader>

      {userFlows.map(([flowId, flow], idx) => (
        <FlowTap onClick={() => loadFlow(flowId)} key={idx}>
          {flow.name}
          <ConnectionIndicator
            show={flow.type === "remote"}
            connected={connected}
          />
          <DeleteFlowButton deleteFlow={(e: any) => deleteFlow(e, flowId)} />
        </FlowTap>
      ))}
      <FlowHeader>Examples</FlowHeader>
      {exampleFlows.map(([flowId, flow], idx) => (
        <FlowTap onClick={() => loadFlow(flowId)} key={idx}>
          {flow.name}
        </FlowTap>
      ))}
    </FlowSelectionMenu>
  );
}
