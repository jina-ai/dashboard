import React from "react"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectFlows,
  selectSelectedFlowId,
} from "../../redux/flows/flows.selectors"
import { selectConnectionStatus } from "../../redux/global/global.selectors"
import { showModal } from "../../redux/global/global.actions"
import { deleteFlow, loadFlow } from "../../redux/flows/flows.actions"

const FALLBACK_FLOW_NAME = "untitled flow"

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
  idx: number
}

function DeleteFlowButton({ deleteFlow, idx }: DeleteFlowProps) {
  const Delete = styled.div`
    font-size: 1.15rem;
    position: absolute;
    top: 0;
    right: 0;
  `
  return (
    <Delete>
      <i
        data-name={`deleteFlowButton-${idx}`}
        onClick={deleteFlow}
        className="material-icons"
      >
        delete
      </i>
    </Delete>
  )
}

export default function FlowSelection() {
  const flows = useSelector(selectFlows)
  const selectedFlowId = useSelector(selectSelectedFlowId)
  const connected = useSelector(selectConnectionStatus)
  const { palette } = useTheme()

  const dispatch = useDispatch()

  const FlowSelectionMenu = styled.div`
    font-family: "Montserrat", serif;
    min-width: 12rem;
    margin-right: 3rem;
  `

  const SelectedFlowHeader = styled.div`
    position: relative;
    font-weight: 600;
    font-size: 20px;
    color: ${palette.headerTextColor};
    margin-bottom: 1rem;
    white-space: nowrap;
    overflow: hidden;
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
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
  `

  const FlowTapOverflowHider = styled.div`
    position: absolute;
    height: 1.75rem;
    width: 2rem;
    top: 0;
    right: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      ${palette.bodyBackground} 40%
    );
  `

  const FlowHeader = styled.div`
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 1rem;
    color: ${palette.headerTextColor};
  `

  function FlowSettingsButton() {
    const Settings = styled.div`
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      background: linear-gradient(
        to right,
        transparent 0%,
        ${palette.bodyBackground} 40%
      );
      padding-left: 1rem;
      color: ${palette.mutedText};
    `
    return (
      <Settings
        data-name={"settingsButton"}
        onClick={() => {
          dispatch(showModal("flowSettings"))
        }}
      >
        <i
          className="material-icons"
          onClick={() => {
            dispatch(showModal("flowSettings"))
          }}
        >
          settings
        </i>
      </Settings>
    )
  }

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
        {currentFlow.name || <i>{FALLBACK_FLOW_NAME}</i>}
        {currentFlow.type !== "example" && <FlowSettingsButton />}
        <TitleConnectionIndicator
          show={currentFlow.type === "remote"}
          connected={connected}
        />
      </SelectedFlowHeader>

      <FlowTap
        data-name={"newFlowButton"}
        selected={false}
        onClick={() => dispatch(showModal("newFlow"))}
      >
        New Flow <i className="material-icons plus-icon">add</i>
      </FlowTap>

      <FlowHeader>My Flows </FlowHeader>

      {userFlows.map(([flowId, flow], idx) => (
        <FlowTap selected={selectedFlowId === flowId} key={idx}>
          <i onClick={() => dispatch(loadFlow(flowId))}>
            {flow.name || FALLBACK_FLOW_NAME}
          </i>
          <ConnectionIndicator
            show={flow.type === "remote"}
            connected={connected}
          />
          <FlowTapOverflowHider />
          {flowId !== "_userFlow" && (
            <DeleteFlowButton
              deleteFlow={(e: any) => dispatch(deleteFlow(flowId))}
              idx={idx}
            />
          )}
        </FlowTap>
      ))}
      <FlowHeader>Example Flows</FlowHeader>
      {exampleFlows.map(([flowId, flow], idx) => (
        <FlowTap
          selected={selectedFlowId === flowId}
          onClick={() => loadFlow(flowId)}
          key={idx}
        >
          {flow.name}
        </FlowTap>
      ))}
    </FlowSelectionMenu>
  )
}
