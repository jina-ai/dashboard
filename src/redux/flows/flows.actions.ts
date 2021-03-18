import {
  ADD_LINK,
  ADD_NODE,
  CREATE_NEW_FLOW,
  CREATE_NEW_WORKSPACE,
  DELETE_FLOW,
  DELETE_LINK,
  DELETE_NODE,
  DELETE_WORKSPACE,
  DUPLICATE_FLOW,
  IMPORT_FLOW,
  LOAD_FLOW,
  LOAD_WORKSPACE,
  IMPORT_FLOW,
  LOAD_FLOW,
4  LOAD_WORKSPACE,
  SET_FLOW_ARGUMENTS,
  UPDATE_NODE,
  UPDATE_NODE_DATA,
  UPDATE_SELECTED_FLOW,
  LOAD_WORKSPACE,
  CREATE_NEW_WORKSPACE,
  DELETE_WORKSPACE,
  UPDATE_SELECTED_WORKSPACE,
  UPDATE_SELECTED_FLOW,
  UPDATE_SELECTED_WORKSPACE,
  LOAD_WORKSPACE,
  CREATE_NEW_WORKSPACE,
  DELETE_WORKSPACE,
  UPDATE_SELECTED_WORKSPACE,
} from "./flows.constants"
import {
  AddLinkAction,
  AddNodeAction,
  CreateNewFlowAction,
  CreateNewWorkspaceAction,
  DeleteFlowAction,
  DeleteLinkAction,
  DeleteLinkProps,
  DeleteNodeAction,
  DeleteWorkspaceAction,
  DuplicateFlowAction,
  Flow,
  FlowArguments,
  FlowState,
  FlowUpdate,
  ImportFlowAction,
  LoadFlowAction,
  NodeData,
  NodeDataUpdate,
  NodeId,
  NodeUpdate,
  SetFlowArgumentsAction,
  UpdateNodeAction,
  UpdateNodeDataAction,
  UpdateSelectedFlowAction,
  LoadWorkspaceAction,
  WorkspaceUpdate,
  ImportFlowAction,
  FlowArguments,
  SetFlowArgumentsAction,
  UpdateNodeAction,
  UpdateNodeDataAction,
  UpdateSelectedFlowAction,
  LoadWorkspaceAction,
  WorkspaceUpdate,
  UpdateSelectedWorkspaceAction,
  LoadWorkspaceAction,
  CreateNewWorkspaceAction,
  DeleteWorkspaceAction,
  WorkspaceUpdate,
  UpdateSelectedWorkspaceAction,
  UpdateSelectedWorkspaceAction,
} from "./flows.types"

import { ThunkAction } from "redux-thunk"
import { Action } from "redux"
import { showBanner } from "../global/global.actions"
import { initLogStream } from "../logStream/logStream.actions"
import store from ".."
import { formatAsYAML } from "../../helpers"
import logger from "../../logger"
import jinadClient from "../../services/jinad"
import { XYPosition } from "react-flow-renderer/dist/types"

export function createNewWorkspace(): CreateNewWorkspaceAction {
  return {
    type: CREATE_NEW_WORKSPACE,
  }
}

export function updateSelectedWorkspace(
  workspaceUpdate: WorkspaceUpdate
): UpdateSelectedWorkspaceAction {
  return {
    type: UPDATE_SELECTED_WORKSPACE,
    payload: workspaceUpdate,
  }
}

export function deleteWorkspace(workspaceId: string): DeleteWorkspaceAction {
  return {
    type: DELETE_WORKSPACE,
    payload: workspaceId,
  }
}

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

export function setFlowArguments(
  flowArguments: FlowArguments
): SetFlowArgumentsAction {
  return {
    type: SET_FLOW_ARGUMENTS,
    payload: flowArguments,
  }
}

export function updateSelectedFlow(
  flowUpdate: FlowUpdate
): UpdateSelectedFlowAction {
  return {
    type: UPDATE_SELECTED_FLOW,
    payload: flowUpdate,
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

export function addNode(
  id: string,
  position: XYPosition,
  data?: NodeData
): AddNodeAction {
  return {
    type: ADD_NODE,
    payload: {
      data,
      id,
      position,
    },
  }
}

export function addLink(source: NodeId, target: NodeId): AddLinkAction {
  return {
    type: ADD_LINK,
    payload: {
      source,
      target,
    },
  }
}

export function deleteLink(deleteLinkProps: DeleteLinkProps): DeleteLinkAction {
  return {
    type: DELETE_LINK,
    payload: deleteLinkProps,
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

export function updateNodeData(
  nodeId: string,
  nodeDataUpdate: NodeDataUpdate
): UpdateNodeDataAction {
  return {
    type: UPDATE_NODE_DATA,
    payload: { nodeId, nodeDataUpdate },
  }
}

export function deleteNode(nodeId: string): DeleteNodeAction {
  return {
    type: DELETE_NODE,
    payload: nodeId,
  }
}

export function loadWorkspace(workspaceId: string): LoadWorkspaceAction {
  return {
    type: LOAD_WORKSPACE,
    payload: workspaceId,
  }
}

export function createNewWorkspace(): CreateNewWorkspaceAction {
  return {
    type: CREATE_NEW_WORKSPACE,
  }
}

export function deleteWorkspace(workspaceId: string): DeleteWorkspaceAction {
  return {
    type: DELETE_WORKSPACE,
    payload: workspaceId,
  }
}

export function updateSelectedWorkspace(
  workspaceUpdate: WorkspaceUpdate
): UpdateSelectedWorkspaceAction {
  return {
    type: UPDATE_SELECTED_WORKSPACE,
    payload: workspaceUpdate,
  }
}

export function startFlow(
  workspaceId: string,
  flowId: string
): ThunkAction<void, FlowState, unknown, Action<string>> {
  return async function (dispatch) {
    const flowArguments = store.getState().flowState.workspaces[workspaceId]
      ?.flowArguments
    const flow = store.getState().flowState.workspaces[workspaceId]?.flows[
      flowId
    ]

    if (typeof flow === undefined)
      return dispatch(showBanner("Could not start flow", "error") as any)

    const { flowChart } = flow as Flow
    const yaml = formatAsYAML(flowChart, flowArguments as FlowArguments)
    logger.log(
      "startFlow",
      "\n\tworkspaceId:",
      workspaceId,
      "\n\tflowId: ",
      flowId,
      "\n\tchart:",
      flowChart,
      "\n\tyaml:",
      yaml
    )

    const result = await jinadClient.startFlow(yaml)
    const { status, message, flow_id } = result

    logger.log("startFlow result", result)

    if (status === "error") return dispatch(showBanner(message, "error") as any)

    dispatch(updateSelectedFlow({ daemon_id: flow_id }))
    dispatch(showBanner(message, "success") as any)
    dispatch(initNetworkFlow(workspaceId, flowId))
  }
}

export function stopFlow(
  workspaceId: string,
  flowId: string
): ThunkAction<void, FlowState, unknown, Action<string>> {
  return async function (dispatch) {
    const flow = store.getState().flowState.workspaces[workspaceId]?.flows[
      flowId
    ]
    logger.log("stopFlow: ", flowId)

    if (typeof flow === undefined)
      return dispatch(showBanner("Could not stop flow", "error") as any)

    const { daemon_id } = flow
    logger.log("flow:", flow)
    logger.log("daemon_id:", daemon_id)
    if (!daemon_id)
      return dispatch(showBanner("Flow is not deployed", "error") as any)

    const result = await jinadClient.terminateFlow(daemon_id)
    const { status, message } = result

    logger.log("stopFlow result: ", result)
    if (status === "error") return dispatch(showBanner(message, "error") as any)

    dispatch(showBanner(message, "success") as any)
  }
}

export function initNetworkFlow(
  workspaceId: string,
  flowId: string
): ThunkAction<void, FlowState, unknown, Action<string>> {
  return async function (dispatch) {
    const flow = store.getState().flowState.workspaces[workspaceId]?.flows[
      flowId
    ]
    const { daemon_id } = flow
    if (!daemon_id)
      return dispatch(showBanner("Could not initialize flow", "error") as any)

    const flowResult = await jinadClient.getFlow(daemon_id)
    logger.log("got network flow:", flowResult)
    if (flowResult.status === "error") {
      if (flowResult.message)
        dispatch(showBanner(flowResult.message, "error") as any)
      return
    }
    const { workspace_id } = flowResult.flow

    dispatch(updateSelectedWorkspace({ daemon_id: workspace_id }))

    //See: https://github.com/jina-ai/jina/issues/1812
    setTimeout(() => dispatch(initLogStream(workspace_id, daemon_id)), 5000)
  }
}
