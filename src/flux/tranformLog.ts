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

function transformLog(log: RawLog, idx: number): ProcessedLog {
  const { uptime, type } = log;
  const id = nanoid();
  const timestamp = new Date(uptime);
  const unixTime = timestamp.valueOf();
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
