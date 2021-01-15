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
  created: number;
  filename: string;
  funcName: string;
  levelName: Level;
  lineno: number;
  module: string;
  msg: string;
  name: string;
  pathname: string;
  process: number;
  processName: string;
  thread: number;
  threadName: string;
};

export type ProcessedLog = RawLog & {
  createdDate: Date;
  id: string;
  idx: number;
  unixTime: number;
  timestamp: Date;
  formattedTimestamp: string;
};

export type LogLevels = {
  [logLevel in Level]: number;
};

export type LogStreamState = {
  logIndex: number;
  logLevelOccurences: {
    [timeStamp: number]: RawLogLevel;
  };
  logs: RawLog[];
  logLevels: LogLevels;
  logSources: {
    [pea: string]: number;
  };
};

export type Message = {
  data: RawLog;
};

export type showLogAtIndexAction = {
  type: typeof SHOW_LOG_INDEX;
  payload: number;
};

export type handleNewLogAction = {
  type: typeof HANDLE_NEW_LOG;
  payload: Message;
};

export type LogStreamActionTypes = showLogAtIndexAction | handleNewLogAction;
