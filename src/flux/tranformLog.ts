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
};

function transformLog(log: RawLog) {
  const { created } = log;
  const createdDate = fromUnixTime(created);
  const id = nanoid();
  return { ...log, createdDate, id };
}

export { transformLog };
