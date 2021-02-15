import _ from "lodash"
import exampleFlows from "../../data/exampleFlows"
import { formatForFlowchart, parseYAML } from "../../helpers"
import {
  initialFlow,
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DUPLICATE_FLOW,
  LOAD_FLOW,
  UPDATE_FLOW,
  UPDATE_NODE,
  DELETE_NODE,
  RERENDER,
  SET_FLOW_PROPERTIES,
  IMPORT_FLOW,
  SET_FLOW_ARGUMENTS,
} from "./flows.constants"
import {
  Flow,
  FlowActionTypes,
  FlowProperties,
  Flows,
  FlowState,
  NodeUpdate,
} from "./flows.types"
import { nanoid } from "nanoid"
import produce from "immer"

//todo type this properly

interface LooseObject {
  [key: string]: any
}

const saveFlowsToStorage = (state: FlowState) => {
  let toSave: LooseObject = {}
  const { flows } = state
  Object.entries(flows).forEach(([id, flow]: [string, any]) => {
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
          flow: initialFlow,
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
        flow: formatted,
      }
    }
  })
  return flows
}

const initialState: FlowState = {
  rerender: false,
  selectedFlow: "_userFlow",
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
    case UPDATE_FLOW: {
      const newState = _updateFlow(baseState, action.payload)
      saveFlowsToStorage(newState)
      return newState
    }
    case SET_FLOW_PROPERTIES: {
      return _setFlowProperties(baseState, action.payload)
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
        draftState.selectedFlow = action.payload
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

    const nonExampleFlows = Object.entries(baseState.flows).filter(
      ([id, flowProperties]: [string, FlowProperties]) =>
        flowProperties.type !== "example"
    )

    if (draftState.selectedFlow === flowId && nonExampleFlows.length) {
      const idFirstNonExampleFlow = nonExampleFlows[0][0]
      draftState.selectedFlow = idFirstNonExampleFlow
    } else if (!nonExampleFlows.length) {
      draftState.flows._userFlow = {
        name: "Custom Flow 1",
        type: "user-generated",
        isConnected: false,
        flow: initialFlow,
      }
      draftState.selectedFlow = "_userFlow"
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
        (userFlow: FlowProperties) =>
          parseInt(userFlow.name.substring(prefixString.length)) || 0
      )
      .sort((a, b) => a - b)

    const largestNumber = userFlowNumbers[userFlowNumbers.length - 1] || 0

    const id = nanoid()

    let flow = initialFlow

    if (customYAML) {
      const parsed = parseYAML(customYAML)
      if (parsed?.data) flow = formatForFlowchart(parsed.data)
    }

    draftState.flows[id] = {
      isConnected: false,
      name: `${prefixString} ${largestNumber + 1}`,
      type: "user-generated",
      flow,
    }
    draftState.selectedFlow = id
  })
}

function _updateFlow(baseState: FlowState, newFlow: Flow): FlowState {
  return produce(baseState, (draftState) => {
    if (draftState.selectedFlow) {
      draftState.flows[draftState.selectedFlow].flow = newFlow
    }
  })
}

function _setFlowProperties(
  baseState: FlowState,
  newFlowProperties: FlowProperties
): FlowState {
  return produce(baseState, (draftState) => {
    if (draftState.selectedFlow) {
      draftState.flows[draftState.selectedFlow] = newFlowProperties
    }
  })
}

function _updateNode(
  baseState: FlowState,
  { nodeId, nodeUpdate }: { nodeId: string; nodeUpdate: NodeUpdate }
): FlowState {
  return produce(baseState, (draftState) => {
    const oldNode = draftState.flows[draftState.selectedFlow].flow.nodes[nodeId]
    const newNode = {
      ...oldNode,
      ...nodeUpdate,
    }
    draftState.flows[draftState.selectedFlow].flow.nodes[nodeId] = newNode
  })
}

function _deleteNode(baseState: FlowState, nodeId: string): FlowState {
  return produce(baseState, (draftState) => {
    Object.keys(draftState.flows[draftState.selectedFlow].flow.links).forEach(
      (linkId) => {
        const link =
          draftState.flows[draftState.selectedFlow].flow.links[linkId]
        if (link.from.nodeId === nodeId || link.to.nodeId === nodeId) {
          delete draftState.flows[draftState.selectedFlow].flow.links[linkId]
        }
      }
    )
    delete draftState.flows[draftState.selectedFlow].flow.nodes[nodeId]
  })
}
