import { State } from "../index";

export const selectFlowChart = (state: State) => {
  return state.flowState.flows[state.flowState.selectedFlow];
};

export const selectFlows = (state: State) => state.flowState.flows;

export const selectSelectedFlowId = (state: State) =>
  state.flowState.selectedFlow;
