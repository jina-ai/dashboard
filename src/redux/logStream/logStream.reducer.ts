import {
  HANDLE_NEW_LOG,
  getInitialLogLevel,
  intialLogStreamState,
  SHOW_LOG_INDEX,
} from "./logStream.constants";
import {
  LogStreamActionTypes,
  LogStreamState,
  Message,
  ProcessedLog,
  RawLog,
} from "./logStream.types";
import { fromUnixTime } from "date-fns";
import { nanoid } from "nanoid";

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

function _handleNewLog(
  state: LogStreamState,
  message: Message
): LogStreamState {
  const { data } = message;
  const log = _transformLog(data, state.logs.length);

  const { name, levelname, unixTime } = log;

  const newLogs = [...state.logs, log];

  const newLogSourceValue = state.logSources[name]
    ? state.logSources[name] + 1
    : 1;

  const newLogSources = {
    ...state.logSources,
    [name]: newLogSourceValue,
  };

  const newLogLevelValue = state.logLevels[levelname]
    ? state.logLevels[levelname] + 1
    : 1;

  const newLogLevels = {
    ...state.logLevels,
    [levelname]: newLogLevelValue,
  };

  const newLogLevelOccurrence = state.logLevelOccurrences[unixTime]
    ? { ...state.logLevelOccurrences[unixTime] }
    : getInitialLogLevel();

  const newLogLevelOccurrences = {
    ...state.logLevelOccurrences,
    [unixTime]: newLogLevelOccurrence,
  };

  newLogLevelOccurrences[unixTime].levels[levelname]++;
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
  const { created } = log;
  const createdDate = fromUnixTime(created);
  const id = nanoid();
  const unixTime = Math.floor(created);
  const timestamp = new Date(unixTime * 1000);
  const formattedTimestamp = timestamp.toLocaleString();
  return {
    ...log,
    createdDate,
    id,
    idx,
    unixTime,
    timestamp,
    formattedTimestamp,
  };
}
