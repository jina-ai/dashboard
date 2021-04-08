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
  SET_FLOW_ARGUMENTS,
  UPDATE_NODE,
  UPDATE_NODE_DATA,
  UPDATE_SELECTED_FLOW,
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
  FlowArguments,
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
  UpdateSelectedWorkspaceAction,
} from "./flows.types"

import { showBanner } from "../global/global.actions"
import { initLogStream } from "../logStream/logStream.actions"
import { AppThunk } from ".."
import logger from "../../logger"
import jinadClient from "../../services/jinad"
import { XYPosition } from "react-flow-renderer/dist/types"

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
  flowYAML: string,
  workspaceDaemonId?: string
): AppThunk<Promise<void>> {
  return async function (dispatch) {
    if (!workspaceDaemonId) {
      const creationResult = await jinadClient.createWorkspace(["empty_blob"]) //Creating a workspace in daemon requires files
      const {
        status: creationStatus,
        message: creationMessage,
        workspace_id,
      } = creationResult
      if (creationStatus === "error")
        return dispatch(showBanner(creationMessage, "error"))
      workspaceDaemonId = workspace_id as string
      dispatch(updateSelectedWorkspace({ daemon_id: workspaceDaemonId }))
    }

    const result = await jinadClient.startFlow(flowYAML, workspaceDaemonId)
    const { status, message, flow_id } = result

    logger.log("startFlow result", result)

    if (status === "error") return dispatch(showBanner(message, "error"))

    dispatch(updateSelectedFlow({ daemon_id: flow_id }))
    dispatch(showBanner("Successfully started flow", "success"))
    dispatch(initNetworkFlow(flow_id))
  }
}

export function createWorkspaceInDaemon(): AppThunk<Promise<void>> {
  return async function (dispatch) {
    const result = await jinadClient.createWorkspace()
    const { status, message, workspace_id } = result

    logger.log("createWorkspaceInDaemon result", result)

    if (status === "error") return dispatch(showBanner(message, "error"))

    dispatch(updateSelectedWorkspace({ daemon_id: workspace_id }))
    dispatch(showBanner(message, "success"))
  }
}

export function uploadFilesToWorkspace(
  files: Blob[],
  workspaceDaemonId?: string
): AppThunk<Promise<void>> {
  return async function (dispatch) {
    if (!workspaceDaemonId) {
      const creationResult = await jinadClient.createWorkspace(files)
      const {
        status: creationStatus,
        message: creationMessage,
        workspace_id,
      } = creationResult
      if (creationStatus === "error")
        return dispatch(showBanner(creationMessage, "error"))
      workspaceDaemonId = workspace_id as string
    } else {
      const result = await jinadClient.uploadFilesToWorkspace(
        workspaceDaemonId,
        files
      )
      const { status, message } = result

      logger.log("uploadFilesToWorkspace result", result)

      if (status === "error") return dispatch(showBanner(message, "error"))
    }

    const workspaceStatus = await jinadClient.getWorkspace(workspaceDaemonId)

    if (workspaceStatus.status === "error")
      return dispatch(showBanner(workspaceStatus.message, "error"))

    dispatch(
      updateSelectedWorkspace({
        files: workspaceStatus.workspace.arguments,
        daemon_id: workspaceDaemonId,
      })
    )
    dispatch(showBanner(`Successfully uploaded files to workspace`, "success"))
  }
}

export function stopFlow(flowDaemonId: string): AppThunk<Promise<void>> {
  return async function (dispatch) {
    const result = await jinadClient.terminateFlow(flowDaemonId)
    const { status, message } = result

    logger.log("stopFlow result: ", result)
    if (status === "error") return dispatch(showBanner(message, "error"))

    dispatch(showBanner(message, "success"))
    dispatch(updateSelectedFlow({ daemon_id: null }))
  }
}

export function initNetworkFlow(flowDaemonId: string): AppThunk<Promise<void>> {
  return async function (dispatch) {
    const { status, message, flow } = await jinadClient.getFlow(flowDaemonId)
    logger.log("got network flow:", flow)

    if (status === "error") return dispatch(showBanner(message, "error"))

    const { workspace_id } = flow

    dispatch(initLogStream(workspace_id, flowDaemonId))
  }
}
