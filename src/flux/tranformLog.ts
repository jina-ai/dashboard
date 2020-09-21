const levels = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;
type Level = typeof levels[number];

export type RawLog = {
  created: number;
  filename: string;
  funcName: string;
  levelname: Level;
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
