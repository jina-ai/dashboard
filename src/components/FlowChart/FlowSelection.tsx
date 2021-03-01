import React from "react"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"

type ConnectionIndicatorProps = {
  connected: boolean
  show: boolean
}

function ConnectionIndicator({ connected, show }: ConnectionIndicatorProps) {
  if (!show) return null
  return connected ? (
    <i className="material-icons ml-2 text-success">wifi</i>
  ) : (
    <i className="material-icons ml-2 text-warning">wifi_off</i>
  )
}

function TitleConnectionIndicator({
  connected,
  show,
}: ConnectionIndicatorProps) {
  if (!show) return null
  return connected ? (
    <i className="material-icons text-white ml-1 mr-2">wifi</i>
  ) : (
    <i className="material-icons text-warning ml-1 mr-2">wifi_off</i>
  )
}

type DeleteFlowProps = {
  deleteFlow: (e: any) => void
}

function DeleteFlowButton({ deleteFlow }: DeleteFlowProps) {
  const Delete = styled.div`
    font-size: 1.25rem;
    margin-right: -0.125rem;
  `
  return (
    <Delete>
      <i onClick={deleteFlow} className="material-icons">
        delete
      </i>
    </Delete>
  )
}

type FlowSelectionProps = {
  flows: {
    [key: string]: any
  }
  showNewFlowModal: () => void
  loadFlow: (flowId: string) => void
  createNewFlow: (e: any) => void
  deleteFlow: (e: any, flowId: string) => void
  selectedFlowId: string
  connected: boolean
}

export default function FlowSelection({
  flows,
  loadFlow,
  selectedFlowId,
  showNewFlowModal,
  deleteFlow,
  connected,
}: FlowSelectionProps) {
  const { palette } = useTheme()

  const FlowSelectionMenu = styled.div`
    font-family: "Montserrat", serif;
    min-width: 12rem;
    margin-right: 3rem;
  `

  const SelectedFlowHeader = styled.div`
    font-weight: 600;
    font-size: 20px;
    color: ${palette.headerTextColor};
    margin-bottom: 1rem;
  `

  type FlowTapProps = {
    selected: boolean
  }

  const FlowTap = styled.div`
    cursor: pointer;
    font-weight: ${(props: FlowTapProps) => (props.selected ? "bold" : 500)};
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 1rem;
    margin-bottom: 1rem;
  `

  const FlowHeader = styled.div`
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 1rem;
    color: ${palette.headerTextColor};
  `

  const userFlows = Object.entries(flows).filter(
    ([id, flow]) => flow.type !== "example"
  )

  const exampleFlows = Object.entries(flows).filter(
    ([id, flow]) => flow.type === "example"
  )

  const currentFlow = flows[selectedFlowId]

  return (
    <FlowSelectionMenu>
      <SelectedFlowHeader>
        {currentFlow.name}
        <TitleConnectionIndicator
          show={currentFlow.type === "remote"}
          connected={connected}
        />
      </SelectedFlowHeader>

      <FlowTap selected={false} onClick={showNewFlowModal}>
        New Flow <i className="material-icons plus-icon">add</i>
      </FlowTap>

      <FlowHeader>My Flows </FlowHeader>

      {userFlows.map(([flowId, flow], idx) => (
        <FlowTap
          selected={currentFlow.name === flow.name}
          onClick={() => loadFlow(flowId)}
          key={idx}
        >
          {flow.name}
          <ConnectionIndicator
            show={flow.type === "remote"}
            connected={connected}
          />
          {flowId !== "_userFlow" && (
            <DeleteFlowButton deleteFlow={(e: any) => deleteFlow(e, flowId)} />
          )}
        </FlowTap>
      ))}
      <FlowHeader>Example Flows</FlowHeader>
      {exampleFlows.map(([flowId, flow], idx) => (
        <FlowTap
          selected={currentFlow.name === flow.name}
          onClick={() => loadFlow(flowId)}
          key={idx}
        >
          {flow.name}
        </FlowTap>
      ))}
    </FlowSelectionMenu>
  )
}
