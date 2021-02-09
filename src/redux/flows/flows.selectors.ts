import { State } from "../index";

export const selectFlowChart = (state: State) =>
  state.flowState.flows[state.flowState.selectedFlow];

export const selectRerender = (state: State) => state.flowState.rerender;

export const selectTooltipConfig = (state: State) =>
  state.flowState.tooltipConfig;

export const selectFlows = (state: State) => state.flowState.flows;

export const selectFlowArguments = (state: State) =>
  state.flowState.flowArguments;

export const selectExampleFlowsKeyEntryPairs = (state: State) => {
  return Object.entries(state.flowState.flows).filter(
    (flowKeyEntryPair) => flowKeyEntryPair[1].type === "example"
  );
};

export const selectSelectedNode = (state: State) =>
  state.flowState.flows[state.flowState.selectedFlow].flow.selected;

export const selectSelectedFlowId = (state: State) =>
  state.flowState.selectedFlow;
