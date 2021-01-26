import {
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DUPLICATE_FLOW,
  LOAD_FLOW,
  UPDATE_FLOW,
} from "./flows.constants";
import {
  IChart,
  ILink,
  INode,
} from "@bastinjafari/react-flow-chart-with-tooltips-and-multi-select";

export interface Node extends Omit<INode, "type"> {
  label?: string;
  needs?:
    | {
        [pod: string]: boolean;
      }
    | {};
  send_to?: {};
  depth?: number;
}

type colors = "red";

interface Link extends ILink {
  color: colors;
}

export interface Flow extends Omit<IChart, "nodes" | "links"> {
  nodes: { [id: string]: Node };
  links: {
    [id: string]: Link;
  };
  with?:
    | {
        logserver: string;
        compress_hwm: number;
        board: {
          canvas: {
            [pod: string]: {
              x: number;
              y: number;
            };
          };
        };
      }
    | {};
}

export type FlowProperties = {
  name: string;
  type: string;
  flow: Flow;
  yaml?: string;
};

export type Flows = {
  [flowId: string]: FlowProperties;
};

export type LoadFlowAction = {
  type: typeof LOAD_FLOW;
  payload: string;
};

export type CreateNewFlowAction = {
  type: typeof CREATE_NEW_FLOW;
};

export type FlowState = {
  selectedFlow: string;
  flows: Flows;
  tooltipConfig: {
    tooltipsGlobal: {
      showTooltip: boolean;
      toogleOffWhenClicked: string;
      text: string;
    };
  };
};
export type UpdateFlowAction = {
  type: typeof UPDATE_FLOW;
  payload: Flow;
};
export type DuplicateFlowAction = {
  type: typeof DUPLICATE_FLOW;
  payload: string;
};
export type DeleteFlowAction = {
  type: typeof DELETE_FLOW;
  payload: string;
};

export type FlowActionTypes =
  | LoadFlowAction
  | CreateNewFlowAction
  | UpdateFlowAction
  | DuplicateFlowAction
  | DeleteFlowAction;
