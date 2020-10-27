import { fromUnixTime } from "date-fns";
import { nanoid } from "nanoid";
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

export type ProcessedLog = RawLog & {
  createdDate: Date;
  id: string;
  idx: number;
  unixTime: number;
  timestamp: Date;
  formattedTimestamp: string;
};

function transformLog(log: RawLog, idx: number): ProcessedLog {
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

export { transformLog };
