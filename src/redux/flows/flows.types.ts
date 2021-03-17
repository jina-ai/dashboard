import {
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DELETE_NODE,
  DUPLICATE_FLOW,
  LOAD_FLOW,
  UPDATE_NODE,
  UPDATE_SELECTED_FLOW,
  IMPORT_FLOW,
  SET_FLOW_ARGUMENTS,
  ADD_NODE,
  ADD_LINK,
  DELETE_LINK,
  UPDATE_NODE_DATA,
  LOAD_WORKSPACE,
  CREATE_NEW_WORKSPACE,
  UPDATE_SELECTED_WORKSPACE,
  ADD_FILES_TO_WORKSPACE,
  DELETE_WORKSPACE,
} from "./flows.constants"

import { Edge, Node, XYPosition } from "react-flow-renderer"

const PodNecessaryObject = {
  name: "string",
}

const PodOptionalObject = {
  uses: "string",
  inspect: "string",
  add: "string",
  needs: ["string"],
  parallel: "string",
  timeout_ready: 0,
  separated_workspace: true,
}

type Pod = typeof PodNecessaryObject & Partial<typeof PodOptionalObject>

export const CustomDataObjectReq = {
  label: "string",
}

export const CustomDataObjectOpt = {
  depth: 0,
}

export const CustomDataObject = {
  ...CustomDataObjectOpt,
  ...CustomDataObjectReq,
}

type CustomData = typeof CustomDataObjectReq &
  Partial<typeof CustomDataObjectOpt>

export type NodeData = CustomData & Pod

export type FlowNode = Node<NodeData>
export type FlowEdge = Edge
export type FlowElement = FlowNode | FlowEdge
export type NodeId = string
export type LinkId = string
export type HandlerId = string
export type NodeUpdate = Partial<FlowNode>
export type NodeDataUpdate = Partial<NodeData>

export type NodeConnection = {
  source: NodeId
  target: NodeId
  sourceHandle?: HandlerId
  targetHandle?: HandlerId
}

export type DeleteLinkProps = LinkId | NodeConnection

export type With = {
  logserver: string
  compress_hwm: number
  rest_api: boolean
  port_expose: number
  board: {
    canvas: {
      [pod: string]: {
        x: number
        y: number
      }
    }
  }
}
export interface FlowChart {
  elements: FlowElement[]
  with?: With
}

type FlowType = "user-generated" | "remote" | "example"

type WorkspaceType = "user-generated" | "remote" | "example"

export type Flow = {
  name: string
  type: FlowType
  isConnected: boolean
  workspace_id?: string
  flow_id?: string
  flowChart: FlowChart
  yaml?: string
}

export type Workspace = {
  name: string
  type: WorkspaceType
  daemon_endpoint: string
  workspace_id: string
  isConnected: boolean
  files: string[]
}

export type FlowUpdate = Partial<Flow>
export type WorkspaceUpdate = Partial<Workspace>

export type Flows = {
  [flowId: string]: Flow
}

export type Workspaces = {
  [workspaceId: string]: Workspace
}

export type LoadFlowAction = {
  type: typeof LOAD_FLOW
  payload: string
}

export type CreateNewFlowAction = {
  type: typeof CREATE_NEW_FLOW
}

export type LoadWorkspaceAction = {
  type: typeof LOAD_WORKSPACE
  payload: string
}

export type CreateNewWorkspaceAction = {
  type: typeof CREATE_NEW_WORKSPACE
}

export type UpdateSelectedWorkspaceAction = {
  type: typeof UPDATE_SELECTED_WORKSPACE
  payload: WorkspaceUpdate
}

export type AddFilesToWorkspaceAction = {
  type: typeof ADD_FILES_TO_WORKSPACE
}

export type DeleteWorkspaceAction = {
  type: typeof DELETE_WORKSPACE
  payload: string
}

export type FlowArgumentType = "string" | "boolean" | "integer"

export type FlowArgument = {
  name: string
  description: string
  type: FlowArgumentType
  defaultValue?: string | number | boolean | null
}

export type FlowArguments = {
  version: string
  flow: FlowArgument[]
  pea: FlowArgument[]
  pod: FlowArgument[]
}

export type FlowState = {
  selectedFlowId: string
  selectedWorkspaceId: string
  workspaces: Workspaces
  flows: Flows
  flowArguments: FlowArguments
  tooltipConfig: {
    tooltipsGlobal: {
      showTooltip: boolean
      toogleOffWhenClicked: string
      text: string
    }
  }
}

export type ExampleFlows = {
  [name: string]: {
    name: string
    type: FlowType
    yaml: string
  }
}
export type SetFlowArgumentsAction = {
  type: typeof SET_FLOW_ARGUMENTS
  payload: FlowArguments
}
export type UpdateSelectedFlowAction = {
  type: typeof UPDATE_SELECTED_FLOW
  payload: FlowUpdate
}
export type DuplicateFlowAction = {
  type: typeof DUPLICATE_FLOW
  payload: string
}
export type DeleteFlowAction = {
  type: typeof DELETE_FLOW
  payload: string
}

export type AddNodeAction = {
  type: typeof ADD_NODE
  payload: {
    data?: NodeData
    id: string
    position: XYPosition
  }
}

export type UpdateNodeAction = {
  type: typeof UPDATE_NODE
  payload: { nodeId: string; nodeUpdate: NodeUpdate }
}

export type UpdateNodeDataAction = {
  type: typeof UPDATE_NODE_DATA
  payload: { nodeId: string; nodeDataUpdate: NodeDataUpdate }
}

export type DeleteNodeAction = {
  type: typeof DELETE_NODE
  payload: string
}

export type AddLinkAction = {
  type: typeof ADD_LINK
  payload: NodeConnection
}

export type DeleteLinkAction = {
  type: typeof DELETE_LINK
  payload: DeleteLinkProps
}

export type ImportFlowAction = {
  type: typeof IMPORT_FLOW
  payload: string
}

export type FlowActionTypes =
  | LoadFlowAction
  | CreateNewFlowAction
  | UpdateSelectedFlowAction
  | DuplicateFlowAction
  | SetFlowArgumentsAction
  | DeleteFlowAction
  | UpdateNodeAction
  | DeleteNodeAction
  | ImportFlowAction
  | AddNodeAction
  | AddLinkAction
  | DeleteLinkAction
  | UpdateNodeDataAction
  | LoadWorkspaceAction
  | CreateNewWorkspaceAction
  | UpdateSelectedWorkspaceAction
  | AddFilesToWorkspaceAction
  | DeleteWorkspaceAction
