import {
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DELETE_NODE,
  UPDATE_NODE,
  DUPLICATE_FLOW,
  LOAD_FLOW,
  RERENDER,
  UPDATE_FLOW,
  SET_FLOW_PROPERTIES,
  IMPORT_FLOW,
  SET_FLOW_ARGUMENTS,
} from "./flows.constants"
import {
  CreateNewFlowAction,
  DeleteFlowAction,
  DeleteNodeAction,
  DuplicateFlowAction,
  Flow,
  FlowProperties,
  FlowState,
  LoadFlowAction,
  NodeUpdate,
  RerenderAction,
  UpdateFlowAction,
  UpdateNodeAction,
  UpdateFlowPropertiesAction,
  ImportFlowAction,
  FlowArguments,
  UpdateFlowArgumentsAction,
} from "./flows.types"

import { ThunkAction } from "redux-thunk"
import { Action } from "redux"

import { showBanner } from "../global/global.actions"
import { initLogStream } from "../logStream/logStream.actions"
import store from ".."
import { formatAsYAML } from "../../helpers"
import logger from "../../logger"
import jinadClient from "../../services/jinad"

export function loadFlow(flowId: string): LoadFlowAction {
  return {
    type: LOAD_FLOW,
    payload: flowId,
  }
}

export function createNewFlow(): CreateNewFlowAction {
  return {
    type: CREATE_NEW_FLOW,
  }
}
export function updateFlow(flow: Flow): UpdateFlowAction {
  return {
    type: UPDATE_FLOW,
    payload: flow,
  }
}
export function setFlowArguments(
  flowArguments: FlowArguments
): UpdateFlowArgumentsAction {
  return {
    type: SET_FLOW_ARGUMENTS,
    payload: flowArguments,
  }
}
export function setFlowProperties(
  flowProperties: FlowProperties
): UpdateFlowPropertiesAction {
  return {
    type: SET_FLOW_PROPERTIES,
    payload: flowProperties,
  }
}
export function duplicateFlow(flowYAML: string): DuplicateFlowAction {
  return {
    type: DUPLICATE_FLOW,
    payload: flowYAML,
  }
}
export function importFlow(flowYAML: string): ImportFlowAction {
  return {
    type: IMPORT_FLOW,
    payload: flowYAML,
  }
}
export function deleteFlow(flowId: string): DeleteFlowAction {
  return {
    type: DELETE_FLOW,
    payload: flowId,
  }
}
export function updateNode(
  nodeId: string,
  nodeUpdate: NodeUpdate
): UpdateNodeAction {
  return {
    type: UPDATE_NODE,
    payload: { nodeId, nodeUpdate },
  }
}
export function deleteNode(nodeId: string): DeleteNodeAction {
  return {
    type: DELETE_NODE,
    payload: nodeId,
  }
}
export function rerender(): RerenderAction {
  return {
    type: RERENDER,
  }
}

export function startFlow(
  selectedFlowId: string
): ThunkAction<void, FlowState, unknown, Action<string>> {
  return async function (dispatch) {
    logger.log("starting flow: ", selectedFlowId)
    const flow = store.getState().flowState.flows[selectedFlowId]
    const { flowArguments } = store.getState().flowState
    const { flow: chart } = flow
    logger.log("starting flow chart: ", chart)
    const yaml = formatAsYAML(chart, flowArguments)
    logger.log("starting flow yaml: ", chart)
    const result = await jinadClient.startFlow(yaml)
    const { status, message, flow_id } = result

    dispatch(setFlowProperties({ ...flow, flow_id }))

    if (status === "error") return dispatch(showBanner(message, "error") as any)

    dispatch(showBanner(message, "success") as any)

    dispatch(initNetworkFlow(selectedFlowId))
    //TODO: initialize flow (logs, etc)
  }
}

export function stopFlow(
  selectedFlowId: string
): ThunkAction<void, FlowState, unknown, Action<string>> {
  return async function (dispatch) {
    logger.log("stop flow: ", selectedFlowId)
    const flowProperties = store.getState().flowState.flows[selectedFlowId]
    const { flow_id } = flowProperties
    logger.log("flowProperties:", flowProperties)
    logger.log("flow_id:", flow_id)
    if (!flow_id)
      return dispatch(showBanner("Flow is not deployed", "error") as any)

    const result = await jinadClient.terminateFlow(flow_id)
    const { status, message } = result

    logger.log("stopFlow result: ", result)
    if (status === "error") return dispatch(showBanner(message, "error") as any)

    dispatch(showBanner(message, "success") as any)
    //TODO: initialize flow (logs, etc)
  }
}

export function initNetworkFlow(
  selectedFlowId: string
): ThunkAction<void, FlowState, unknown, Action<string>> {
  return async function (dispatch) {
    const flowProperties = store.getState().flowState.flows[selectedFlowId]
    const { flow_id } = flowProperties
    if (!flow_id) return
    const flowResult = await jinadClient.getFlow(flow_id)
    logger.log("got network flow:", flowResult)
    if (flowResult.status === "error") {
      if (flowResult.message)
        dispatch(showBanner(flowResult.message, "error") as any)
      return
    }
    const { workspace_id } = flowResult.flow

    dispatch(setFlowProperties({ ...flowProperties, workspace_id }))

    //See: https://github.com/jina-ai/jina/issues/1812
    setTimeout(() => dispatch(initLogStream(workspace_id, flow_id)), 5000)
  }
}
