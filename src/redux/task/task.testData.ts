import { TaskEvent, TaskState } from "./task.types";
import { Processes } from "../global/global.types";
import { formatSeconds } from "../../helpers";

const qpsCurrentOld = "5";
const qpsCurrentOldHistory = ["0", "1", "2", "3", "4", "5"];

const elapsedTaskNameOld = "Task: download fashion-mnist";
const elapsedSecondsOld = "4s";

const progressCurrentRequestOld = 6;
const progressBarLenOld = 7;
const progressNumBarsOld = 8;

const speedCurrentOld = "34.2";
const speedUnitOld = "Documents";
const speedHistoryOld = ["0", "1", "2", "3", "4", "5"];

export const TIME_LAST_UPDATE_CHART = 1000;

const testBar_len = 20;
const testCreated = 1611328615.749;
const testElapsed = "0.667214273999889";
const testMemory = 52308;
const testModule = "helper";
const testNum_bars = 11;
const testNum_reqs = 11;
const testProcess = 1;
const testProgress = 0.55;
const testQps = "16.486457842180144";
const testSpeed = "16.486457842180144";
const testSpeedUnit = "Documents";
const testTaskName = "download fashion-mnist";
const testThread = 140090586826560;
const testMsgSent = 9000;
const testMsgResv = 10000;
const testBytesSent = 8000;
const testBytesRecv = 7000;

export const testTaskState: TaskState = {
  taskData: {
    qps: {
      current: qpsCurrentOld,
      history: qpsCurrentOldHistory,
    },
    elapsed: {
      task_name: elapsedTaskNameOld,
      seconds: elapsedSecondsOld,
    },
    progress: {
      currentRequest: progressCurrentRequestOld,
      bar_len: progressBarLenOld,
      num_bars: progressNumBarsOld,
    },
    speed: {
      current: speedCurrentOld,
      unit: speedUnitOld,
      history: speedHistoryOld,
    },
    lastUpdateChart: new Date(TIME_LAST_UPDATE_CHART),
    messages: [],
    bytes: [],
  },
};

export const testProcesses: Processes = {
  0: "testProcess_0",
  1: "testProcess_1",
  2: "testProcess_2",
  3: "testProcess_3",
  4: "testProcess_4",
  5: "testProcess_5",
  6: "testProcess_6",
  7: "testProcess_7",
  8: "testProcess_8",
};

export const testTaskEvent: TaskEvent = {
  bar_len: testBar_len,
  created: testCreated,
  elapsed: testElapsed,
  memory: testMemory,
  module: testModule,
  num_bars: testNum_bars,
  num_reqs: testNum_reqs,
  process: testProcess,
  progress: testProgress,
  qps: testQps,
  speed: testSpeed,
  speed_unit: testSpeedUnit,
  task_name: testTaskName,
  thread: testThread,
  msg_recv: testMsgResv,
  msg_sent: testMsgSent,
  bytes_sent: testBytesSent,
  bytes_recv: testBytesRecv,
};

const expectedQpsHistory = [
  ...qpsCurrentOldHistory,
  parseFloat(testQps).toFixed(3),
];
expectedQpsHistory.shift();

const expectedSpeedHistory = [
  ...speedHistoryOld,
  parseFloat(testSpeed).toFixed(3),
];
expectedSpeedHistory.shift();

export const testExpectedTaskState: TaskState = {
  taskData: {
    bytes: [
      {
        process: testProcess,
        sent: testBytesSent,
        received: testBytesRecv,
        node: testProcesses[testProcess],
      },
    ],
    elapsed: {
      seconds: formatSeconds(parseInt(testElapsed)),
      task_name: `Task: ${testTaskName}`,
    },
    lastUpdateChart: new Date(TIME_LAST_UPDATE_CHART),
    messages: [
      {
        process: testTaskEvent.process,
        sent: testMsgSent,
        received: testMsgResv,
        node: testProcesses[testTaskEvent.process],
      },
    ],
    progress: {
      currentRequest: testTaskEvent.num_reqs,
      bar_len: testTaskEvent.bar_len,
      num_bars: testTaskEvent.num_bars,
    },
    qps: {
      current: parseFloat(testQps).toFixed(1),
      history: expectedQpsHistory,
    },
    speed: {
      current: parseFloat(testSpeed).toFixed(1),
      history: expectedSpeedHistory,
      unit: testSpeedUnit,
    },
  },
};
