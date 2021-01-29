import { nanoid } from "nanoid";
const levels = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;
export type Level = typeof levels[number];

//todo look into possible refactoring of the types

export type RawLogEntry = {
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
