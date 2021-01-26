import { State } from "../index";

export const selectFlowChart = (state: State) => {
  return state.flowState.flows[state.flowState.selectedFlow];
};

export const selectTooltipConfig = (state: State) =>
  state.flowState.tooltipConfig;
export const selectFlows = (state: State) => state.flowState.flows;

export const selectExampleFlowsKeyEntryPairs = (state: State) => {
  return Object.entries(state.flowState.flows).filter(
    (flowKeyEntryPair) => flowKeyEntryPair[1].type === "example"
  );
};
export const selectSelectedFlowId = (state: State) =>
  state.flowState.selectedFlow;
