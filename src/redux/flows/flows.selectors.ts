import _ from "lodash"
import { State } from "../index"

export const selectSelectedFlow = (state: State) => {
  const { selectedFlowId } = state.flowState.workspaces[
    state.flowState.selectedWorkspaceId
  ]
  return state.flowState.flows[selectedFlowId]
}

export const selectSelectedWorkspace = (state: State) =>
  state.flowState.workspaces[state.flowState.selectedWorkspaceId]

export const selectTooltipConfig = (state: State) =>
  state.flowState.tooltipConfig
export const selectSelectedWorkspace = (state: State) =>
  state.flowState.workspaces[state.flowState.selectedWorkspaceId]

export const selectFlows = (state: State) => {
  const { selectedWorkspaceId } = state.flowState
  return _.pickBy(
    state.flowState.flows,
    (flow) => flow.workspaceId === selectedWorkspaceId
  )
}

export const selectWorkspaces = (state: State) => state.flowState.workspaces

export const selectFlowArguments = (state: State) =>
  state.flowState.workspaces[state.flowState.selectedWorkspaceId].flowArguments

export const selectExampleFlowsKeyEntryPairs = (state: State) => {
  const { selectedWorkspaceId } = state.flowState
  const workspaceFlows = _.pickBy(
    state.flowState.flows,
    (flow) => flow.workspaceId === selectedWorkspaceId
  )
  return Object.entries(workspaceFlows).filter(
    (flowKeyEntryPair) => flowKeyEntryPair[1].type === "example"
  )
}

export const selectSelectedFlowId = (state: State) =>
  state.flowState.workspaces[state.flowState.selectedWorkspaceId].selectedFlowId

export const selectSelectedWorkspaceId = (state: State) =>
  state.flowState.selectedWorkspaceId
