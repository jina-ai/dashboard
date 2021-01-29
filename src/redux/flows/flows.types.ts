import {
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DELETE_NODE,
  DUPLICATE_FLOW,
  LOAD_FLOW,
  RERENDER,
  UPDATE_FLOW,
  UPDATE_NODE,
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

export type NodeUpdate = Partial<Node>;

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
  rerender: boolean;
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

export type UpdateNodeAction = {
  type: typeof UPDATE_NODE;
  payload: { nodeId: string; nodeUpdate: NodeUpdate };
};

export type DeleteNodeAction = {
  type: typeof DELETE_NODE;
  payload: string;
};

export type RerenderAction = {
  type: typeof RERENDER;
};

export type FlowActionTypes =
  | LoadFlowAction
  | CreateNewFlowAction
  | UpdateFlowAction
  | DuplicateFlowAction
  | DeleteFlowAction
  | UpdateNodeAction
  | DeleteNodeAction
  | RerenderAction;
