import { LogStreamState, RawLog } from "./logStream.types";

const startDate = new Date(0);
const startDateUptime = startDate.toISOString();
const startEpochMilliSeconds = startDate.getTime();
const startEpochSeconds = startEpochMilliSeconds / 1000;

const oneSecLaterDate = new Date(startEpochMilliSeconds + 1000);
const oneSecLaterUptime = oneSecLaterDate.toISOString();
const oneSecLaterEpochSeconds = oneSecLaterDate.getTime() / 1000;
const startFormattedTimeStamp = startDate.toLocaleString();
const oneSecLaterFormattedTimeStamp = oneSecLaterDate.toLocaleString();

export const testLogStreamState1: LogStreamState = {
  logIndex: 0,
  logLevelOccurrences: {
    [startEpochSeconds]: {
      lastLog: 0,
      levels: {
        INFO: 0,
        SUCCESS: 0,
        WARNING: 0,
        ERROR: 0,
        CRITICAL: 0,
        DEBUG: 0,
      },
    },
  },
  logs: [
    {
      log_id: "log_id_0",
      uptime: startDateUptime,
      workspace_path: "/testPath_0.py",
      host: "host_0",
      context: "testContext_0",
      type: "INFO",
      level: "INFO",
      message: "testMsg_0",
      name: "testName_0",
      process: "0",
      id: "testId_0",
      idx: 0,
      unixTime: 0,
      timestamp: startDate,
      formattedTimestamp: startFormattedTimeStamp,
    },
  ],
  logLevels: {
    INFO: 0,
    SUCCESS: 0,
    WARNING: 0,
    ERROR: 0,
    CRITICAL: 0,
    DEBUG: 0,
  },
  logSources: {
    testLogSource: 0,
  },
};

export const testMessage: RawLog = {
  log_id: "log_id_1",
  uptime: oneSecLaterUptime,
  host: "host_1",
  type: "INFO",
  workspace_path: "testFile_1.py",
  message: "testMsg_1",
  name: "testName_1",
  process: "1",
  context: "testContext_1"
};

export const testLogStreamState2: LogStreamState = {
  logIndex: 0,
  logLevelOccurrences: {
    [startEpochSeconds]: {
      lastLog: 0,
      levels: {
        INFO: 0,
        SUCCESS: 0,
        WARNING: 0,
        ERROR: 0,
        CRITICAL: 0,
        DEBUG: 0,
      },
    },
    [oneSecLaterEpochSeconds]: {
      lastLog: 1,
      levels: {
        INFO: 1,
        SUCCESS: 0,
        WARNING: 0,
        ERROR: 0,
        CRITICAL: 0,
        DEBUG: 0,
      },
    },
  },
  logs: [
    {
      log_id: "log_id_0",
      uptime: startDateUptime,
      workspace_path: "/testPath_0.py",
      host: "host_0",
      context: "testContext_0",
      type: "INFO",
      level: "INFO",
      message: "testMsg_0",
      name: "testName_0",
      process: "0",
      id: "testId_0",
      idx: 0,
      unixTime: 0,
      timestamp: startDate,
      formattedTimestamp: startFormattedTimeStamp,
    },
    {
      log_id: "log_id_1",
      uptime: oneSecLaterUptime,
      workspace_path: "testFile_1.py",
      host: "host_1",
      context: "testContext_1",
      type: "INFO",
      level: "INFO",
      message: "testMsg_1",
      name: "testName_1",
      process: "1",
      id: "testId_1",
      idx: 1,
      unixTime: 1,
      timestamp: oneSecLaterDate,
      formattedTimestamp: oneSecLaterFormattedTimeStamp,
    },
  ],
  logLevels: {
    INFO: 1,
    SUCCESS: 0,
    WARNING: 0,
    ERROR: 0,
    CRITICAL: 0,
    DEBUG: 0,
  },
  logSources: {
    testLogSource: 0,
    testName_1: 1,
  },
};
