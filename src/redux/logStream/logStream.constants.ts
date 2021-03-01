import { LogStreamState } from "./logStream.types"
import { RawLogLevel } from "./logStream.types"

export const SHOW_LOG_INDEX = "SHOW_LOG_INDEX"
export const HANDLE_NEW_LOG = "HANDLE_NEW_LOG"

export const intialLogStreamState: LogStreamState = {
  logIndex: 0,
  logLevelOccurrences: {},
  logs: [],
  logLevels: {
    INFO: 0,
    SUCCESS: 0,
    WARNING: 0,
    ERROR: 0,
    CRITICAL: 0,
    DEBUG: 0,
  },
  logSources: {},
}

export const getInitialLogLevel = (): RawLogLevel => ({
  lastLog: 0,
  levels: {
    INFO: 0,
    SUCCESS: 0,
    WARNING: 0,
    ERROR: 0,
    CRITICAL: 0,
    DEBUG: 0,
  },
})
