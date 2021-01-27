import { HANDLE_NEW_TASK_EVENT } from "./task.constants";
import { Processes } from "../global/global.types";

type Unit = "units" | "Documents";

export type Message = {
  process: number;
  sent: number;
  received: number;
  node: string;
};
export type TaskEvent = {
  bar_len: number;
  created: number;
  elapsed: string;
  memory: number;
  module: string;
  num_bars: number;
  num_reqs: number;
  process: number;
  progress: number;
  qps: string;
  speed: string;
  speed_unit: Unit;
  task_name: string;
  thread: number;
  bytes_recv: number;
  bytes_sent: number;
  msg_recv: number;
  msg_sent: number;
};
export type TaskState = {
  taskData: {
    qps: {
      current: string;
      history: Array<string>;
    };
    elapsed: {
      task_name: string;
      seconds: string;
    };
    progress: {
      currentRequest: number;
      bar_len: number;
      num_bars: number;
    };
    speed: {
      current: string;
      unit: Unit;
      history: Array<string>;
    };
    lastUpdateChart: Date;
    messages: Message[];
    bytes: Message[];
  };
};

export type HandleNewTaskEventAction = {
  type: typeof HANDLE_NEW_TASK_EVENT;
  payload: { taskEvent: TaskEvent; processes: Processes };
};

export type TaskActions = HandleNewTaskEventAction;
