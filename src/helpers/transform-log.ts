import { nanoid } from "nanoid";
import { ProcessedLog, RawLog } from "../redux/logStream/logStream.types";
const levels = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;
export type Level = typeof levels[number];

function transformLog(log: RawLog, idx: number): ProcessedLog {
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

export { transformLog };
