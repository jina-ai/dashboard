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
type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends String ? K : never;
}[keyof T];

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}
function getProp<T, K extends keyof T>(o: T, key: K) {
  return String(o[key]);
}
function groupBy<T, K extends StringPropertyNames<T>>(data: T[], propKey: K) {
  return data.reduce((acc, curr) => {
    const groupByProperty = getProp(curr, propKey) as string;
    if (hasKey(acc, groupByProperty)) {
      acc[groupByProperty].push(curr);
    } else {
      acc[groupByProperty] = [curr];
    }
    console.log(acc);

    return acc;
  }, {} as Record<any, T[]>);
}

function objectToChartData(o: Record<string, any>) {
  return Object.entries(o).map(([key, value]) => ({ key, value }));
}

export { transformLog, groupBy, objectToChartData };
