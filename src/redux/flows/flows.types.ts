import {
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DELETE_NODE,
  DUPLICATE_FLOW,
  LOAD_FLOW,
  RERENDER,
  UPDATE_SELECTED_FLOW_CHART,
  UPDATE_NODE,
  UPDATE_SELECTED_FLOW,
  IMPORT_FLOW,
  SET_FLOW_ARGUMENTS,
} from "./flows.constants"
import { Node } from "react-flow-renderer/dist/types"

import { Elements } from "react-flow-renderer"

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

export type FlowChartUpdate = Partial<FlowChart>

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
export type UpdateFlowChartAction = {
  type: typeof UPDATE_SELECTED_FLOW_CHART
  payload: FlowChartUpdate
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
  | UpdateFlowChartAction
  | UpdateSelectedFlowAction
  | DuplicateFlowAction
  | DeleteFlowAction
  | UpdateNodeAction
  | DeleteNodeAction
  | RerenderAction
  | ImportFlowAction
  | SetFlowArgumentsAction
