import {
  CREATE_NEW_FLOW,
  DELETE_FLOW,
  DUPLICATE_FLOW,
  LOAD_FLOW,
  UPDATE_FLOW,
} from "./flows.constants";

export type LoadFlowAction = {
  type: typeof LOAD_FLOW;
  payload: string;
};

export type CreateNewFlowAction = {
  type: typeof CREATE_NEW_FLOW;
};
export type Flow = {
  selected: {
    type?: "link" | "node" | "port";
    id?: string;
  };
  hovered: {
    type?: "link" | "node" | "port";
    id?: string;
  };
  scale: number;
  nodes?: {
    [nodeName: string]: {
      id: string;
      label: string;
      ports: {
        outPort: {
          id: string;
          type: string;
        };
        inPort?: {
          id: string;
          type: string;
        };
      };
      properties: Object;
      position: { x: number; y: number };
      needs?: Object;
      send_to?: Object;
      depth?: number;
    };
  };
  links: {};
  offset: { x: number; y: number };
  with?:
    | {
        logserver: string;
        compress_hwm: number;
        board: {
          canvas: {
            [podName: string]: {
              x: number;
              y: number;
            };
          };
        };
      }
    | {};
};

export type FlowProperties = {
  name: string;
  type: string;
  flow: Flow;
  yaml?: string;
};

export type Flows = {
  [flowId: string]: FlowProperties;
};

export type FlowState = {
  selectedFlow: string;
  flows: Flows;
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
