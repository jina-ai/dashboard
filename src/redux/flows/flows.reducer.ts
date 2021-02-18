import _ from "lodash"
import exampleFlows from "../../data/exampleFlows"
import { formatForFlowchart, parseYAML } from "../../helpers"
import {
  initialFlowChart,
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DUPLICATE_FLOW,
  LOAD_FLOW,
  UPDATE_SELECTED_FLOW_CHART,
  UPDATE_NODE,
  DELETE_NODE,
  RERENDER,
  UPDATE_SELECTED_FLOW,
  IMPORT_FLOW,
  SET_FLOW_ARGUMENTS,
} from "./flows.constants"
import {
  Flow,
  FlowActionTypes,
  FlowChartUpdate,
  Flows,
  FlowState,
  FlowUpdate,
  NodeUpdate,
} from "./flows.types"
import { nanoid } from "nanoid"
import produce from "immer"
import { Edge, Node } from "react-flow-renderer/dist/types"

export const saveFlowsToStorage = (state: FlowState) => {
  let toSave: { [id: string]: Flow } = {}
  const { flows } = state
  Object.entries(flows).forEach(([id, flow]: [string, Flow]) => {
    if (flow.type === "user-generated") toSave[id] = flow
  })
  localStorage.setItem("userFlows", JSON.stringify(toSave))
}

function getUserFlows(): Flows {
  const storedFlows = localStorage.getItem("userFlows")
  const userFlows = storedFlows ? JSON.parse(storedFlows) : null
  return _.isEmpty(userFlows)
    ? {
        _userFlow: {
          name: "Custom Flow 1",
          type: "user-generated",
          flowChart: initialFlowChart,
        },
      }
    : userFlows
}

function getExampleFlows() {
  const flows: Flows = {}

  Object.entries(exampleFlows).forEach(([id, flow]) => {
    const parsed = parseYAML(flow.yaml)
    if (parsed?.data) {
      const formatted = formatForFlowchart(parsed.data)
      flows[id] = {
        ...flow,
        isConnected: false,
        flowChart: formatted,
      }
    }
  })
  return flows
}

const initialState: FlowState = {
  rerender: false,
  selectedFlowId: "_userFlow",
  flows: {
    ...getUserFlows(),
    ...getExampleFlows(),
  },
  flowArguments: {
    version: "0.0",
    flow: [],
    pea: [],
    pod: [],
  },
  tooltipConfig: {
    tooltipsGlobal: {
      showTooltip: true,
      toogleOffWhenClicked: "global",
      text: "Hold Shift and click to select multiple nodes",
    },
  },
}

export default function flowReducer(
  baseState = initialState,
  action: FlowActionTypes
): FlowState {
  switch (action.type) {
    case DELETE_FLOW: {
      const newState = _deleteFlow(baseState, action.payload)
      saveFlowsToStorage(newState)
      return newState
    }
    case DUPLICATE_FLOW: {
      const newState = _createNewFlow(baseState, action.payload)
      saveFlowsToStorage(newState)
      return newState
    }
    case IMPORT_FLOW: {
      const newState = _importFlow(baseState, action.payload)
      saveFlowsToStorage(newState)
      return newState
    }
    case UPDATE_SELECTED_FLOW_CHART: {
      const newState = _updateSelectedFlowChart(baseState, action.payload)
      saveFlowsToStorage(newState)
      return newState
    }
    case UPDATE_SELECTED_FLOW: {
      const newState = _updateSelectedFlow(baseState, action.payload)
      saveFlowsToStorage(newState)
      return newState
    }
    case SET_FLOW_ARGUMENTS: {
      return produce(baseState, (draftState) => {
        draftState.flowArguments = action.payload
      })
    }
    case CREATE_NEW_FLOW: {
      const newState = _createNewFlow(baseState)
      saveFlowsToStorage(newState)
      return newState
    }
    case LOAD_FLOW:
      return produce(baseState, (draftState) => {
        draftState.selectedFlowId = action.payload
      })
    case UPDATE_NODE: {
      const newState = _updateNode(baseState, action.payload)
      saveFlowsToStorage(newState)
      return newState
    }
    case DELETE_NODE: {
      const newState = _deleteNode(baseState, action.payload)
      saveFlowsToStorage(newState)
      return newState
    }
    case RERENDER:
      return {
        ...baseState,
        rerender: !baseState.rerender,
      }
    default:
      return baseState
  }
}

function _deleteFlow(baseState: FlowState, flowId: string): FlowState {
  const newState = produce(baseState, (draftState) => {
    draftState.flows = _.omit(draftState.flows, flowId)

    const nonExampleFlows = Object.entries(draftState.flows).filter(
      ([id, flow]: [string, Flow]) => flow.type !== "example"
    )

    if (draftState.selectedFlowId === flowId && nonExampleFlows.length) {
      const idFirstNonExampleFlow = nonExampleFlows[0][0]
      draftState.selectedFlowId = idFirstNonExampleFlow
    } else if (!nonExampleFlows.length) {
      draftState.flows._userFlow = {
        name: "Custom Flow 1",
        type: "user-generated",
        isConnected: false,
        flowChart: initialFlowChart,
      }
      draftState.selectedFlowId = "_userFlow"
    }
  })

  return newState
}

function _importFlow(state: FlowState, customYAML: string): FlowState {
  return _createNewFlow(state, customYAML)
}

function _createNewFlow(baseState: FlowState, customYAML?: string): FlowState {
  return produce(baseState, (draftState) => {
    const prefixString = "Custom Flow"

    let userFlows = Object.values(baseState.flows).filter((flow: any) =>
      flow.name.startsWith(prefixString)
    )

    const userFlowNumbers = userFlows
      .map(
        (userFlow: Flow) =>
          parseInt(userFlow.name.substring(prefixString.length)) || 0
      )
      .sort((a, b) => a - b)

    const largestNumber = userFlowNumbers[userFlowNumbers.length - 1] || 0

    const id = nanoid()

    let flowChart = initialFlowChart

    if (customYAML) {
      const parsed = parseYAML(customYAML)
      if (parsed?.data) flowChart = formatForFlowchart(parsed.data)
    }

    draftState.flows[id] = {
      isConnected: false,
      name: `${prefixString} ${largestNumber + 1}`,
      type: "user-generated",
      flowChart,
    }
    draftState.selectedFlowId = id
  })
}

function _updateSelectedFlowChart(
  baseState: FlowState,
  flowChartUpdate: FlowChartUpdate
): FlowState {
  return produce(baseState, (draftState) => {
    if (draftState.selectedFlowId) {
      const selectedFlow = draftState.flows[draftState.selectedFlowId]
      draftState.flows[draftState.selectedFlowId] = {
        ...selectedFlow,
        ...flowChartUpdate,
      }
    }
  })
}

function _updateSelectedFlow(
  baseState: FlowState,
  flowUpdate: FlowUpdate
): FlowState {
  return produce(baseState, (draftState) => {
    if (draftState.selectedFlowId) {
      const selectedFlow = draftState.flows[draftState.selectedFlowId]
      draftState.flows[draftState.selectedFlowId] = {
        ...selectedFlow,
        ...flowUpdate,
      }
    }
  })
}
function _updateNode(
  baseState: FlowState,
  { nodeId, nodeUpdate }: { nodeId: string; nodeUpdate: NodeUpdate }
): FlowState {
  return produce(baseState, (draftState) => {
    const selectedFlow = draftState.selectedFlowId
    const oldNodeIndex = draftState.flows[
      selectedFlow
    ].flowChart.elements.findIndex((element) => element.id === nodeId)

    if (oldNodeIndex > 0) {
      const oldNode =
        draftState.flows[selectedFlow].flowChart.elements[oldNodeIndex]
      const newNode = {
        ...oldNode,
        ...nodeUpdate,
      }
      draftState.flows[selectedFlow].flowChart.elements[oldNodeIndex] = newNode
    }
  })
}

function _deleteNode(baseState: FlowState, nodeId: string): FlowState {
  return produce(baseState, (draftState) => {
    const selectedFlow = draftState.flows[draftState.selectedFlowId]
    const withoutLinksAndNode = selectedFlow.flowChart.elements.filter(
      (element) => {
        function instanceOfEdge(object: any): object is Edge {
          return "source" in object
        }

        function instanceOfNode(object: any): object is Node {
          return "position" in object
        }

        if (instanceOfNode(element)) return element.id !== nodeId

        if (instanceOfEdge(element))
          return element.source !== nodeId || element.target !== nodeId

        return true
      }
    )

    draftState.flows[
      draftState.selectedFlowId
    ].flowChart.elements = withoutLinksAndNode
  })
}
