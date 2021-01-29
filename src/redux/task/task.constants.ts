import { TaskState } from "./task.types";

export const HANDLE_NEW_TASK_EVENT = "HANDLE_TASK";

export const initialTaskState: TaskState = {
  taskData: {
    qps: {
      current: "0",
      history: new Array(30).fill(0),
    },
    elapsed: {
      task_name: "No Current Task",
      seconds: "0s",
    },
    progress: {
      currentRequest: 0,
      bar_len: 0,
      num_bars: 0,
    },
    speed: {
      current: "0",
      unit: "units",
      history: new Array(30).fill(0),
    },
    lastUpdateChart: new Date(),
    messages: [],
    bytes: [],
  },
};
