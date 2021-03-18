import { FlowChart, Flows } from "./flows.types"

export const LOAD_FLOW = "LOAD_FLOW"
export const CREATE_NEW_FLOW = "CREATE_NEW_FLOW"
export const UPDATE_SELECTED_FLOW = "UPDATE_SELECTED_FLOW"
export const DUPLICATE_FLOW = "DUPLICATE_FLOW"
export const ADD_NODE = "ADD_NODE"
export const DELETE_FLOW = "DELETE_FLOW"
export const UPDATE_NODE = "UPDATE_NODE"
export const UPDATE_NODE_DATA = "UPDATE_NODE_DATA"
export const DELETE_NODE = "DELETE_NODE"
export const ADD_LINK = "ADD_LINK"
export const DELETE_LINK = "DELETE_LINK"
export const START_FLOW = "START_FLOW"
export const STOP_FLOW = "STOP_FLOW"
export const IMPORT_FLOW = "IMPORT_FLOW"
export const SET_FLOW_ARGUMENTS = "SET_FLOW_ARGUMENTS"
export const LOAD_WORKSPACE = "LOAD_WORKSPACE"
export const CREATE_NEW_WORKSPACE = "CREATE_NEW_WORKSPACE"
export const UPDATE_SELECTED_WORKSPACE = "UPDATE_SELECTED_WORKSPACE"
export const ADD_FILES_TO_WORKSPACE = "ADD_FILES_TO_WORKSPACE"
export const DELETE_WORKSPACE = "DELETE_WORKSPACE"

export const initialFlowChart: FlowChart = {
  elements: [
    {
      id: "gateway",
      type: "gateway",
      data: {
        name: "gateway",
        label: "gateway",
      },
      position: { x: 629, y: 72 },
    },
  ],
}

export const defaultFlow: Flows = {
  _userFlow: {
    name: "Custom Flow 1",
    type: "user-generated",
    flowChart: initialFlowChart,
    isConnected: false,
    daemon_id: null,
  },
}

export const defaultSelectedFlowId = Object.keys(defaultFlow)[0] as string

export const defaultJinaVersion = "1"

export const defaultFlowArguments = {
  version: "0.0",
  flow: [],
  pea: [],
  pod: [],
}
