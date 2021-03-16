import { State } from "../index"

export const selectSelectedFlow = (state: State) =>
  state.flowState.flows[state.flowState.selectedFlowId]

export const selectSelectedWorkspace = (state: State) =>
  state.flowState.workspaces[state.flowState.selectedWorkspaceId]

export const selectTooltipConfig = (state: State) =>
  state.flowState.tooltipConfig

export const selectFlows = (state: State) => state.flowState.flows

export const selectFlowArguments = (state: State) =>
  state.flowState.flowArguments

export const selectExampleFlowsKeyEntryPairs = (state: State) => {
  return Object.entries(state.flowState.flows).filter(
    (flowKeyEntryPair) => flowKeyEntryPair[1].type === "example"
  )
}

export const selectSelectedFlowId = (state: State) =>
  state.flowState.selectedFlowId
