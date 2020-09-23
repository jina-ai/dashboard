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
  pod: string;
  createdDate: Date;
  id: string;
};

function getPod(log: RawLog) {
  const { processName } = log;
  return processName.split("-")[0];
}

function transformLog(log: RawLog) {
  const pod = getPod(log);
  const { created } = log;
  const createdDate = fromUnixTime(created);
  const id = nanoid();
  return { ...log, createdDate, pod, id };
}

export { transformLog };
