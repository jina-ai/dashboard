import { LogStreamState, Message } from "./logStream.types";

const startDate = new Date(0);
const startEpochMilliSeconds = startDate.getTime();
const startEpochSeconds = startEpochMilliSeconds / 1000;
const oneSecLaterDate = new Date(startEpochMilliSeconds + 1000);
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
      created: startEpochSeconds,
      filename: "testFile_0.py",
      funcName: "testFunc_0",
      levelname: "INFO",
      lineno: 0,
      module: "testModule_0",
      msg: "testMsg_0",
      name: "testName_0",
      pathname: "testPathName_0",
      process: 0,
      processName: "testProcessName_0",
      thread: 0,
      threadName: "testThreadName_0",
      createdDate: startDate,
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

export const testMessage: Message = {
  data: {
    created: oneSecLaterEpochSeconds,
    filename: "testFile_1.py",
    funcName: "testFunc_1",
    levelname: "INFO",
    lineno: 1,
    module: "testModule_1",
    msg: "testMsg_1",
    name: "testName_1",
    pathname: "testPathName_1",
    process: 1,
    processName: "testProcessName_1",
    thread: 1,
    threadName: "testThreadName_1",
  },
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
      created: startEpochSeconds,
      filename: "testFile_0.py",
      funcName: "testFunc_0",
      levelname: "INFO",
      lineno: 0,
      module: "testModule_0",
      msg: "testMsg_0",
      name: "testName_0",
      pathname: "testPathName_0",
      process: 0,
      processName: "testProcessName_0",
      thread: 0,
      threadName: "testThreadName_0",
      createdDate: startDate,
      id: "testId_0",
      idx: 0,
      unixTime: 0,
      timestamp: startDate,
      formattedTimestamp: startFormattedTimeStamp,
    },
    {
      created: oneSecLaterEpochSeconds,
      filename: "testFile_1.py",
      funcName: "testFunc_1",
      levelname: "INFO",
      lineno: 1,
      module: "testModule_1",
      msg: "testMsg_1",
      name: "testName_1",
      pathname: "testPathName_1",
      process: 1,
      processName: "testProcessName_1",
      thread: 1,
      threadName: "testThreadName_1",
      createdDate: oneSecLaterDate,
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
