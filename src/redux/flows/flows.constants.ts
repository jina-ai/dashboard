import { FlowChart } from "./flows.types"

export const LOAD_FLOW = "LOAD_FLOW"
export const CREATE_NEW_FLOW = "CREATE_NEW_FLOW"
export const UPDATE_SELECTED_FLOW = "UPDATE_SELECTED_FLOW"
export const DUPLICATE_FLOW = "DUPLICATE_FLOW"
export const ADD_NODE = "ADD_NODE"
export const DELETE_FLOW = "DELETE_FLOW"
export const UPDATE_NODE = "UPDATE_NODE"
export const DELETE_NODE = "DELETE_NODE"
export const ADD_LINK = "ADD_LINK"
export const DELETE_LINK = "DELETE_LINK"
export const RERENDER = "RERENDER"
export const START_FLOW = "START_FLOW"
export const STOP_FLOW = "STOP_FLOW"
export const IMPORT_FLOW = "IMPORT_FLOW"
export const SET_FLOW_ARGUMENTS = "SET_FLOW_ARGUMENTS"

export const initialFlowChart: FlowChart = {
  elements: [
    {
      id: "gateway",
      type: "input",
      data: { label: "gateway" },
      position: { x: 629, y: 72 },
    },
  ],
}
