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
} from "./flows.constants";
import {
  Flow,
  FlowActionTypes,
  FlowProperties,
  Flows,
  FlowState,
} from "./flows.types";
import { nanoid } from "nanoid";

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
    let canvas;
    try {
      canvas = parsed.data.with.board.canvas;
    } catch (e) {
      canvas = {};
    }
    const formatted = formatForFlowchart(parsed.data.pods, canvas);
    flows[id] = {
      ...flow,
      flow: formatted,
    };
  });
  return flows;
}

const initialState: FlowState = {
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
  switch (action.type) {
    case DELETE_FLOW:
      return _deleteFlow(state, action.payload);
    case DUPLICATE_FLOW:
      return _createNewFlow(state, action.payload);
    case UPDATE_FLOW:
      return _updateFlow(state, action.payload);
    case CREATE_NEW_FLOW:
      return _createNewFlow(state);
    case LOAD_FLOW:
      return _loadFlow(state, action.payload);

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
          flow: initialFlow,
        },
        ...stateWithoutFlow.flows,
      },
      selectedFlow: "_userFlow",
    };
  }

  return stateWithoutFlow;
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
    let canvas;
    try {
      canvas = parsed.data.with.board.canvas;
    } catch (e) {
      canvas = {};
    }
    flow = formatForFlowchart(parsed.data.pods, canvas);
  }

  return {
    ...state,
    flows: {
      ...state.flows,
      [id]: {
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

function _loadFlow(state: FlowState, flowId: string): FlowState {
  return {
    ...state,
    selectedFlow: flowId,
  };
}
