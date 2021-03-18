import { State } from "../index"

export const selectSelectedFlow = (state: State) => {
  const workspace =
    state.flowState.workspaces[state.flowState.selectedWorkspaceId]
  const flow = workspace.flows[workspace.selectedFlowId]
  return flow
}

export const selectSelectedWorkspace = (state: State) =>
  state.flowState.workspaces[state.flowState.selectedWorkspaceId]

export const selectFlows = (state: State) =>
  state.flowState.workspaces[state.flowState.selectedWorkspaceId].flows

export const selectWorkspaces = (state: State) => state.flowState.workspaces

export const selectFlowArguments = (state: State) =>
  state.flowState.workspaces[state.flowState.selectedWorkspaceId].flowArguments

export const selectExampleFlowsKeyEntryPairs = (state: State) => {
  return Object.entries(
    state.flowState.workspaces[state.flowState.selectedWorkspaceId].flows
  ).filter((flowKeyEntryPair) => flowKeyEntryPair[1].type === "example")
}

export const selectSelectedFlowId = (state: State) =>
  state.flowState.workspaces[state.flowState.selectedWorkspaceId].selectedFlowId

export const selectSelectedWorkspaceId = (state: State) =>
  state.flowState.selectedWorkspaceId
