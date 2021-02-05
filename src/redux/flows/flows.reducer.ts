import _ from "lodash";
import exampleFlows from "../../data/exampleFlows";
import { formatForFlowchart, parseYAML } from "../../helpers";
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
  UPDATE_FLOW_PROPERTIES,
  IMPORT_FLOW,
} from "./flows.constants";
import {
  Flow,
  FlowActionTypes,
  FlowProperties,
  Flows,
  FlowState,
  NodeUpdate,
} from "./flows.types";
import { nanoid } from "nanoid";

//todo type this properly

interface LooseObject {
  [key: string]: any;
}

const saveFlowsToStorage = (state: FlowState) => {
  let toSave: LooseObject = {};
  const { flows } = state;
  Object.entries(flows).forEach(([id, flow]: [string, any]) => {
    if (flow.type === "user-generated") toSave[id] = flow;
  });
  localStorage.setItem("userFlows", JSON.stringify(toSave));
};

function getUserFlows(): Flows {
  const storedFlows = localStorage.getItem("userFlows");
  const userFlows = storedFlows ? JSON.parse(storedFlows) : null;
  return _.isEmpty(userFlows)
    ? {
        _userFlow: {
          name: "Custom Flow 1",
          type: "user-generated",
          flow: initialFlow,
        },
      }
    : userFlows;
}

function getExampleFlows() {
  const flows: Flows = {};

  Object.entries(exampleFlows).forEach(([id, flow]) => {
    const parsed = parseYAML(flow.yaml);
    if (parsed?.data) {
      const formatted = formatForFlowchart(parsed.data);
      flows[id] = {
        ...flow,
        isConnected: false,
        flow: formatted,
      };
    }
  });
  return flows;
}

const initialState: FlowState = {
  rerender: false,
  selectedFlow: "_userFlow",
  flows: {
    ...getUserFlows(),
    ...getExampleFlows(),
  },
  tooltipConfig: {
    tooltipsGlobal: {
      showTooltip: true,
      toogleOffWhenClicked: "global",
      text: "Hold Shift and click to select multiple nodes",
    },
  },
};

export default function flowReducer(
  state = initialState,
  action: FlowActionTypes
): FlowState {
  let newState;
  switch (action.type) {
    case DELETE_FLOW:
      newState = _deleteFlow(state, action.payload);
      saveFlowsToStorage(newState);
      return newState;
    case DUPLICATE_FLOW:
      newState = _createNewFlow(state, action.payload);
      saveFlowsToStorage(newState);
      return newState;
    case IMPORT_FLOW:
      newState = _importFlow(state, action.payload);
      saveFlowsToStorage(newState);
      return newState;
    case UPDATE_FLOW:
      newState = _updateFlow(state, action.payload);
      saveFlowsToStorage(newState);
      return newState;
    case UPDATE_FLOW_PROPERTIES:
      newState = _updateFlowProperties(state, action.payload);
      return newState;
    case CREATE_NEW_FLOW:
      newState = _createNewFlow(state);
      saveFlowsToStorage(newState);
      return newState;
    case LOAD_FLOW:
      return _loadFlow(state, action.payload);
    case UPDATE_NODE:
      newState = _updateNode(state, action.payload);
      saveFlowsToStorage(newState);
      return newState;
    case DELETE_NODE:
      newState = _deleteNode(state, action.payload);
      saveFlowsToStorage(newState);
      return newState;
    case RERENDER:
      return {
        ...state,
        rerender: !state.rerender,
      };
    default:
      return state;
  }
}

function _deleteFlow(state: FlowState, flowId: string): FlowState {
  let stateWithoutFlow: FlowState = {
    ...state,
    flows: _.omit(state.flows, flowId),
  };
  const nonExampleFlows = Object.entries(state.flows).filter(
    ([id, flowProperties]: [string, FlowProperties]) =>
      flowProperties.type !== "example"
  );
  if (state.selectedFlow === flowId && nonExampleFlows.length) {
    const idFirstNonExampleFlow = nonExampleFlows[0][0];
    stateWithoutFlow.selectedFlow = idFirstNonExampleFlow;
  } else if (!nonExampleFlows.length) {
    stateWithoutFlow = {
      ...state,
      flows: {
        _userFlow: {
          name: "Custom Flow 1",
          type: "user-generated",
          isConnected: false,
          flow: initialFlow,
        },
        ...stateWithoutFlow.flows,
      },
      selectedFlow: "_userFlow",
    };
  }

  return stateWithoutFlow;
}

function _importFlow(state: FlowState, customYAML: string): FlowState {
  return _createNewFlow(state, customYAML);
}

function _createNewFlow(state: FlowState, customYAML?: string): FlowState {
  const prefixString = "Custom Flow";

  let userFlows = Object.values(state.flows).filter((flow: any) =>
    flow.name.startsWith(prefixString)
  );

  const userFlowNumbers = userFlows
    .map(
      (userFlow: FlowProperties) =>
        parseInt(userFlow.name.substring(prefixString.length)) || 0
    )
    .sort((a, b) => a - b);

  const largestNumber = userFlowNumbers[userFlowNumbers.length - 1] || 0;

  const id = nanoid();

  let flow = initialFlow;

  if (customYAML) {
    const parsed = parseYAML(customYAML);
    if (parsed?.data) flow = formatForFlowchart(parsed.data);
  }

  return {
    ...state,
    flows: {
      ...state.flows,
      [id]: {
        isConnected: false,
        name: `${prefixString} ${largestNumber + 1}`,
        type: "user-generated",
        flow,
      },
    },
    selectedFlow: id,
  };
}

function _updateFlow(state: FlowState, newFlow: Flow): FlowState {
  if (state.selectedFlow) {
    return {
      ...state,
      selectedFlow: state.selectedFlow,
      flows: {
        ...state.flows,
        [state.selectedFlow]: {
          ...state.flows[state.selectedFlow],
          flow: newFlow,
        },
      },
    };
  } else return state;
}

function _updateFlowProperties(
  state: FlowState,
  newFlowProperties: FlowProperties
): FlowState {
  if (state.selectedFlow) {
    return {
      ...state,
      selectedFlow: state.selectedFlow,
      flows: {
        ...state.flows,
        [state.selectedFlow]: {
          ...state.flows[state.selectedFlow],
          ...newFlowProperties,
        },
      },
    };
  } else return state;
}

function _loadFlow(state: FlowState, flowId: string): FlowState {
  return {
    ...state,
    selectedFlow: flowId,
  };
}

function _updateNode(
  state: FlowState,
  { nodeId, nodeUpdate }: { nodeId: string; nodeUpdate: NodeUpdate }
): FlowState {
  const newState = { ...state };
  const oldNode = newState.flows[newState.selectedFlow].flow.nodes[nodeId];
  const newNode = {
    ...oldNode,
    ...nodeUpdate,
  };
  newState.flows[newState.selectedFlow].flow.nodes[nodeId] = newNode;
  return {
    ...newState,
  };
}

function _deleteNode(state: FlowState, nodeId: string): FlowState {
  const newState = { ...state };
  delete state.flows[newState.selectedFlow].flow.nodes[nodeId];
  return {
    ...newState,
  };
}
