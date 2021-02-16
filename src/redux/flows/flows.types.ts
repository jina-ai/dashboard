import {
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DELETE_NODE,
  DUPLICATE_FLOW,
  IMPORT_FLOW,
  LOAD_FLOW,
  RERENDER,
  UPDATE_FLOW,
  UPDATE_FLOW_ARGUMENTS,
  UPDATE_FLOW_PROPERTIES,
  UPDATE_NODE,
} from "./flows.constants"
import { INode } from "@bastinjafari/react-flow-chart-with-tooltips-and-multi-select"
import { Elements } from "react-flow-renderer"

export interface Node extends INode {
  label?: string
  needs?:
    | {
        [pod: string]: boolean
      }
    | {}
  send_to?: {}
  depth?: number
}

export type NodeUpdate = Partial<Node>
export interface FlowChart {
  elements: Elements
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
  selectedFlow: string
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
export type UpdateFlowAction = {
  type: typeof UPDATE_FLOW
  payload: FlowChart
}
export type UpdateFlowArgumentsAction = {
  type: typeof UPDATE_FLOW_ARGUMENTS
  payload: FlowArguments
}
export type UpdateFlowPropertiesAction = {
  type: typeof UPDATE_FLOW_PROPERTIES
  payload: Flow
}
export type DuplicateFlowAction = {
  type: typeof DUPLICATE_FLOW
  payload: string
}
export type DeleteFlowAction = {
  type: typeof DELETE_FLOW
  payload: string
}

export type UpdateNodeAction = {
  type: typeof UPDATE_NODE
  payload: { nodeId: string; nodeUpdate: NodeUpdate }
}

export type DeleteNodeAction = {
  type: typeof DELETE_NODE
  payload: string
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
  | UpdateFlowAction
  | UpdateFlowPropertiesAction
  | DuplicateFlowAction
  | DeleteFlowAction
  | UpdateNodeAction
  | DeleteNodeAction
  | RerenderAction
  | ImportFlowAction
  | UpdateFlowArgumentsAction
