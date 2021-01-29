import {
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DELETE_NODE,
  DUPLICATE_FLOW,
  LOAD_FLOW,
  RERENDER,
  UPDATE_FLOW,
  UPDATE_NODE,
} from "./flows.constants";
import {
  CreateNewFlowAction,
  DeleteFlowAction,
  DeleteNodeAction,
  DuplicateFlowAction,
  Flow,
  LoadFlowAction,
  NodeUpdate,
  RerenderAction,
  UpdateFlowAction,
  UpdateNodeAction,
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
export function updateNode(
  nodeId: string,
  nodeUpdate: NodeUpdate
): UpdateNodeAction {
  return {
    type: UPDATE_NODE,
    payload: { nodeId, nodeUpdate },
  };
}
export function deleteNode(nodeId: string): DeleteNodeAction {
  return {
    type: DELETE_NODE,
    payload: nodeId,
  };
}
export function rerender(): RerenderAction {
  return {
    type: RERENDER,
  };
}
