import { HandleNewTaskEventAction, TaskEvent } from "./task.types";
import { HANDLE_NEW_TASK_EVENT } from "./task.constants";
import { Processes } from "../global/global.types";

export function handleNewTaskEvent(
  taskEvent: TaskEvent,
  processes: Processes
): HandleNewTaskEventAction {
  return {
    type: HANDLE_NEW_TASK_EVENT,
    payload: { taskEvent, processes },
  };
}
