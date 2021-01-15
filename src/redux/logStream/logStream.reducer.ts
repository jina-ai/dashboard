import {
  HANDLE_NEW_LOG,
  initialLogLevel,
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
  const newState = { ...state };
  const { data } = message;
  const log = _transformLog(data, newState.logs.length);
  const { process, name, levelName, unixTime } = log;
  newState.logs.push(log);

  console.log(process);
  //todo process must be handled in a global reducer, which is another branch
  //  newState.processes[process] = log.name;
  // remove console.log afterwards

  newState.logSources[name]
    ? newState.logSources[name]++
    : (newState.logSources[name] = 1);

  newState.logLevels[levelName]++;

  if (!newState.logLevelOccurences[unixTime])
    newState.logLevelOccurences[unixTime] = { ...initialLogLevel };

  newState.logLevelOccurences[unixTime].levels[levelName]++;
  newState.logLevelOccurences[unixTime].lastLog = log.idx;

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
