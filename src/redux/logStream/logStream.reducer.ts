import {
  HANDLE_NEW_LOG,
  getInitialLogLevel,
  intialLogStreamState,
  SHOW_LOG_INDEX,
} from "./logStream.constants"
import { LogStreamActionTypes, LogStreamState, RawLog } from "./logStream.types"
import logger from "../../logger"
import { transformLog } from "../../helpers"
import produce from "immer"

const logStreamReducer = produce(
  (draft: LogStreamState, action: LogStreamActionTypes) => {
    switch (action.type) {
      case SHOW_LOG_INDEX:
        draft.logIndex = action.payload
        break
      case HANDLE_NEW_LOG:
        _handleNewLog()
    }

    function _handleNewLog() {
      const rawLog = action.payload as RawLog
      logger.log("_handleNewLog")
      const log = transformLog(rawLog, draft.logs.length)

      const { name, level, unixTime } = log
      draft.logs.push(log)

      const newLogSourceValue = draft.logSources[name]
        ? draft.logSources[name] + 1
        : 1
      draft.logSources[name] = newLogSourceValue

      const newLogLevelValue = draft.logLevels[level]
        ? draft.logLevels[level] + 1
        : 1
      draft.logLevels[level] = newLogLevelValue

      const newLogLevelOccurrence = draft.logLevelOccurrences[unixTime]
        ? { ...draft.logLevelOccurrences[unixTime] }
        : getInitialLogLevel()
      draft.logLevelOccurrences[unixTime] = newLogLevelOccurrence
      draft.logLevelOccurrences[unixTime].levels[level]++
      draft.logLevelOccurrences[unixTime].lastLog = log.idx
    }
  },
  intialLogStreamState
)

export default logStreamReducer
