import {
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DUPLICATE_FLOW,
  LOAD_FLOW,
  UPDATE_FLOW,
} from "./flows.constants";
import {
  CreateNewFlowAction,
  DeleteFlowAction,
  DuplicateFlowAction,
  Flow,
  LoadFlowAction,
  UpdateFlowAction,
} from "./flows.types";

export function loadFlow(flowId: string): LoadFlowAction {
  return {
    type: LOAD_FLOW,
    payload: flowId,
  };
}

export function createNewFlow(): CreateNewFlowAction {
  return {
    type: CREATE_NEW_FLOW,
  };
}
export function updateFlow(flow: Flow): UpdateFlowAction {
  return {
    type: UPDATE_FLOW,
    payload: flow,
  };
}
export function duplicateFlow(customYAML: string): DuplicateFlowAction {
  return {
    type: DUPLICATE_FLOW,
    payload: customYAML,
  };
}
export function deleteFlow(flowId: string): DeleteFlowAction {
  return {
    type: DELETE_FLOW,
    payload: flowId,
  };
}
