import { HANDLE_NEW_LOG, SHOW_LOG_INDEX } from "./logStream.constants";
import {
  handleNewLogAction,
  Message,
  showLogAtIndexAction,
} from "./logStream.types";

export function showLogAtIndex(logIndex: number): showLogAtIndexAction {
  return {
    type: SHOW_LOG_INDEX,
    payload: logIndex,
  };
}

export function handleNewLog(message: Message): handleNewLogAction {
  return {
    type: HANDLE_NEW_LOG,
    payload: message,
  };
}
