import {
  HANDLE_NEW_LOG,
  getInitialLogLevel,
  intialLogStreamState,
  SHOW_LOG_INDEX,
} from "./logStream.constants";
import {
  LogStreamActionTypes,
  LogStreamState,
  RawLog,
} from "./logStream.types";
import logger from "../../logger";
import { transformLog } from "../../helpers";

export default function logStreamReducer(
  state = intialLogStreamState,
  action: LogStreamActionTypes
): LogStreamState {
  switch (action.type) {
    case SHOW_LOG_INDEX:
      return {
        ...state,
        logIndex: action.payload,
      };
    case HANDLE_NEW_LOG:
      return _handleNewLog(state, action.payload);
    default:
      return state;
  }
}

function _handleNewLog(state: LogStreamState, rawLog: RawLog): LogStreamState {
  logger.log("_handleNewLog");
  const log = transformLog(rawLog, state.logs.length);

  const { name, level, unixTime } = log;

  const newLogs = [...state.logs, log];

  const newLogSourceValue = state.logSources[name]
    ? state.logSources[name] + 1
    : 1;

  const newLogSources = {
    ...state.logSources,
    [name]: newLogSourceValue,
  };

  const newLogLevelValue = state.logLevels[level]
    ? state.logLevels[level] + 1
    : 1;

  const newLogLevels = {
    ...state.logLevels,
    [level]: newLogLevelValue,
  };

  const newLogLevelOccurrence = state.logLevelOccurrences[unixTime]
    ? { ...state.logLevelOccurrences[unixTime] }
    : getInitialLogLevel();

  const newLogLevelOccurrences = {
    ...state.logLevelOccurrences,
    [unixTime]: newLogLevelOccurrence,
  };

  newLogLevelOccurrences[unixTime].levels[level]++;
  newLogLevelOccurrences[unixTime].lastLog = log.idx;

  console.log("log level occurences: ", newLogLevelOccurrences);

  const newState = {
    ...state,
    logs: newLogs,
    logSources: newLogSources,
    logLevels: newLogLevels,
    logLevelOccurrences: newLogLevelOccurrences,
  };
  return newState;
}
