import { GlobalActionTypes, GlobalState } from "./global.types";
import {
  CLOSE_MODAL,
  HANDLE_CONNECTION_STATUS,
  HIDE_BANNER,
  initialGlobalState,
  SHOW_BANNER,
  SHOW_ERROR,
  SHOW_MODAL,
  TOGGLE_SIDE_BAR,
} from "./global.constants";
import logger from "../../logger";
import { HANDLE_NEW_LOG } from "../logStream/logStream.constants";

export default function globalReducer(
  state: GlobalState = initialGlobalState,
  action: GlobalActionTypes
): GlobalState {
  switch (action.type) {
    case HANDLE_CONNECTION_STATUS:
      return _handleConnectionStatus(state, action.payload);
    case TOGGLE_SIDE_BAR:
      return {
        ...state,
        menuVisible: !state.menuVisible,
      };
    case SHOW_BANNER:
      return {
        ...state,
        banner: {
          message: action.payload.message,
          theme: action.payload.theme,
        },
      };
    case HIDE_BANNER:
      return {
        ...state,
        banner: null,
      };
    case SHOW_ERROR:
      return {
        ...state,
        banner: {
          message: action.payload.message,
          theme: "error",
        },
      };
    case SHOW_MODAL:
      return {
        ...state,
        modal: action.payload.modal,
        modalParams: action.payload.modalParams,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: null,
        modalParams: null,
      };

    case HANDLE_NEW_LOG:
      return {
        ...state,
        processes: {
          ...state.processes,
          [action.payload.data.process]: action.payload.data.name,
        },
      };
    default:
      return state;
  }
}

function _handleConnectionStatus(
  state: GlobalState,
  { status, message }: { status: string; message: string }
): GlobalState {
  logger.log("handleLogConnectionStatus - status", status);
  logger.log("handleLogConnectionStatus - message", message);
  const connected = status === "connected";
  return {
    ...state,
    loading: false,
    connected: connected,
  };
}
