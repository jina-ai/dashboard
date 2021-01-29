import {
  HANDLE_NEW_LOG,
  getInitialLogLevel,
  intialLogStreamState,
  SHOW_LOG_INDEX,
} from "./logStream.constants";
import {
  LogStreamActionTypes,
  LogStreamState,
  ProcessedLog,
  RawLog,
} from "./logStream.types";
import { nanoid } from "nanoid";
import logger from "../../logger";

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
  logger.log("_handleNewLog")
  const log = _transformLog(rawLog, state.logs.length);

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

  const newState = {
    ...state,
    logs: newLogs,
    logSources: newLogSources,
    logLevels: newLogLevels,
    logLevelOccurrences: newLogLevelOccurrences,
  };
  return newState;
}

function _transformLog(log: RawLog, idx: number): ProcessedLog {
  const { uptime, type } = log;
  const id = nanoid();
  const timestamp = new Date(uptime);
  const unixTime = Math.floor(timestamp.valueOf() / 1000);
  const formattedTimestamp = timestamp.toLocaleString();
  return {
    ...log,
    id,
    idx,
    unixTime,
    timestamp,
    formattedTimestamp,
    level: type,
  };
}
