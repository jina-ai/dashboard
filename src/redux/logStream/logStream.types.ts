import { HANDLE_NEW_LOG, SHOW_LOG_INDEX } from "./logStream.constants";

const levels = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;
export type Level = typeof levels[number];

export type RawLogLevel = {
  lastLog: number;
  levels: {
    [level in Level]: number;
  };
};

export type RawLog = {
  context: string;
  host: string;
  log_id: string;
  message: string;
  name: string;
  process: string;
  type: Level;
  uptime: string;
  workspace_path: string;
};

export type ProcessedLog = RawLog & {
  id: string;
  idx: number;
  unixTime: number;
  timestamp: Date;
  formattedTimestamp: string;
  level: Level;
};

export type LogLevels = {
  [logLevel in Level]: number;
};

export type LogLevelOccurrences = {
  [timeStamp: number]: RawLogLevel;
};

export type LogStreamState = {
  logIndex: number;
  logLevelOccurrences: LogLevelOccurrences;
  logs: ProcessedLog[];
  logLevels: LogLevels;
  logSources: {
    [pea: string]: number;
  };
};

export type Message = {
  data: RawLog;
};

type PodPropertyType = "str" | "int" | "bool" | "SocketType" | "ReplicaType";
export type PodProperty = {
  name: string;
  type: PodPropertyType;
};

export type showLogAtIndexAction = {
  type: typeof SHOW_LOG_INDEX;
  payload: number;
};

export type handleNewLogAction = {
  type: typeof HANDLE_NEW_LOG;
  payload: RawLog;
};

export type LogStreamActionTypes = showLogAtIndexAction | handleNewLogAction;
