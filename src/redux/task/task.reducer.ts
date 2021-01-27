import { TaskActions, TaskEvent, TaskState } from "./task.types";
import { HANDLE_NEW_TASK_EVENT, initialTaskState } from "./task.constants";
import { Processes } from "../global/global.types";
import { formatSeconds } from "../../helpers";

export default function taskReduxer(
  state = initialTaskState,
  action: TaskActions
): TaskState {
  switch (action.type) {
    case HANDLE_NEW_TASK_EVENT:
      return _handleNewTaskEvent(state, action.payload);
    default:
      return state;
  }
}

function _handleNewTaskEvent(
  state: TaskState,
  payload: { taskEvent: TaskEvent; processes: Processes }
): TaskState {
  const { taskEvent, processes } = payload;

  const event = { ...taskEvent };

  const {
    task_name,
    process,
    bar_len,
    num_bars,
    elapsed,
    speed,
    speed_unit,
    bytes_recv,
    bytes_sent,
    msg_recv,
    msg_sent,
    num_reqs,
    qps,
  } = event;

  let newProgress = { ...state.taskData.progress };

  if (bar_len && num_bars) {
    newProgress.currentRequest = num_reqs;
    newProgress.bar_len = bar_len;
    newProgress.num_bars = num_bars;
  }

  let newMessages = [...state.taskData.messages];
  let newBytes = [...state.taskData.bytes];

  if (msg_recv && msg_sent) {
    let index = state.taskData.messages
      .map((obj: any) => obj.process)
      .indexOf(process);

    let msgData = {
      process,
      sent: msg_sent,
      received: msg_recv,
      node: processes[process],
    };

    let bytesData = {
      process,
      sent: bytes_sent,
      received: bytes_recv,
      node: processes[process],
    };

    if (index < 0) {
      newMessages.push(msgData);
      newBytes.push(bytesData);
    } else {
      newMessages[index] = msgData;
      newBytes[index] = bytesData;
    }

    newMessages = newMessages
      .sort((a: any, b: any) => b.sent + b.received - (a.sent + a.received))
      .slice(0, 20);

    newBytes = newBytes
      .sort((a: any, b: any) => b.sent + b.received - (a.sent + a.received))
      .slice(0, 20);
  }

  const newLastUpdateChart = new Date();

  let newQps = { ...state.taskData.qps };

  if (qps) {
    newQps.current = parseFloat(qps).toFixed(1);
    newQps.history.push(parseFloat(qps).toFixed(3));
    newQps.history.shift();
  }

  let newSpeed = { ...state.taskData.speed };

  if (speed && speed_unit) {
    newSpeed.unit = speed_unit;
    newSpeed.current = parseFloat(speed).toFixed(1);
    newSpeed.history.push(parseFloat(speed).toFixed(3));
    newSpeed.history.shift();
  }

  let newElapsed = { ...state.taskData.elapsed };

  if (elapsed) {
    newElapsed.seconds = formatSeconds(parseInt(elapsed));
    newElapsed.task_name = `Task: ${task_name}`;
  }

  return {
    ...state,
    taskData: {
      ...state.taskData,
      qps: newQps,
      elapsed: newElapsed,
      progress: newProgress,
      speed: newSpeed,
      lastUpdateChart: newLastUpdateChart,
      messages: newMessages,
      bytes: newBytes,
    },
  };
}
