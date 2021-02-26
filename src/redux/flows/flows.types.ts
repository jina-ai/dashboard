import {
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DELETE_NODE,
  DUPLICATE_FLOW,
  LOAD_FLOW,
  RERENDER,
  UPDATE_NODE,
  UPDATE_SELECTED_FLOW,
  IMPORT_FLOW,
  SET_FLOW_ARGUMENTS,
  ADD_NODE,
  ADD_LINK,
  DELETE_LINK,
  UPDATE_NODE_DATA,
} from "./flows.constants"
import { Node, XYPosition } from "react-flow-renderer/dist/types"

import { Elements } from "react-flow-renderer"
import { Connection } from "react-flow-renderer/nocss"

export type Pod = {
  needs: string
}

export type NodeId = string
export type LinkId = string
//todo maybe this will be obsolete
export type NodeUpdate = Partial<Node>
export type NodeDataUpdate = Partial<NodeData>

export type DeleteLinkProps = LinkId | Connection

export type NodeData = {
  [key: string]: any
}

export interface FlowChart {
  elements: Elements //todo inherit this ad type data properly
  with?:
    | {
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
    | {}
}

export type Flow = {
  name: string
  type: string
  isConnected: boolean
  workspace_id?: string
  flow_id?: string
  flowChart: FlowChart
  yaml?: string
}
export type FlowUpdate = Partial<Flow>

export type Flows = {
  [flowId: string]: Flow
}

export type LoadFlowAction = {
  type: typeof LOAD_FLOW
  payload: string
}

export type CreateNewFlowAction = {
  type: typeof CREATE_NEW_FLOW
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
  rerender: boolean
  selectedFlowId: string
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

export type UpdateNodePropertiesAction = {
  type: typeof UPDATE_NODE_DATA
  payload: { nodeId: string; nodePropertiesUpdate: NodeDataUpdate }
}

export type DeleteNodeAction = {
  type: typeof DELETE_NODE
  payload: string
}

export type AddLinkAction = {
  type: typeof ADD_LINK
  payload: Connection
}

export type DeleteLinkAction = {
  type: typeof DELETE_LINK
  payload: DeleteLinkProps
}

export type RerenderAction = {
  type: typeof RERENDER
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
  | RerenderAction
  | ImportFlowAction
  | AddNodeAction
  | AddLinkAction
  | DeleteLinkAction
  | UpdateNodePropertiesAction
