import { TaskActions, TaskEvent, TaskState } from "./task.types"
import { HANDLE_NEW_TASK_EVENT, initialTaskState } from "./task.constants"
import { Processes } from "../global/global.types"
import { formatSeconds } from "../../helpers"
import produce from "immer"

const taskReducer = produce((draft: TaskState, action: TaskActions) => {
  switch (action.type) {
    case HANDLE_NEW_TASK_EVENT:
      return _handleNewTaskEvent()
  }

  function _handleNewTaskEvent() {
    const {
      taskEvent,
      processes,
    }: { taskEvent: TaskEvent; processes: Processes } = action.payload

    const event = { ...taskEvent }

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
    } = event

    if (bar_len && num_bars) {
      draft.taskData.progress.currentRequest = num_reqs
      draft.taskData.progress.bar_len = bar_len
      draft.taskData.progress.num_bars = num_bars
    }

    if (msg_recv && msg_sent) {
      let index = draft.taskData.messages
        .map((obj: any) => obj.process)
        .indexOf(process)

      let msgData = {
        process,
        sent: msg_sent,
        received: msg_recv,
        node: processes[process],
      }

      let bytesData = {
        process,
        sent: bytes_sent,
        received: bytes_recv,
        node: processes[process],
      }

      if (index < 0) {
        draft.taskData.messages.push(msgData)
        draft.taskData.bytes.push(bytesData)
      } else {
        draft.taskData.messages[index] = msgData
        draft.taskData.bytes[index] = bytesData
      }

      draft.taskData.messages = draft.taskData.messages
        .sort((a: any, b: any) => b.sent + b.received - (a.sent + a.received))
        .slice(0, 20)

      draft.taskData.bytes = draft.taskData.bytes
        .sort((a: any, b: any) => b.sent + b.received - (a.sent + a.received))
        .slice(0, 20)
    }

    draft.taskData.lastUpdateChart = new Date()

    if (qps) {
      draft.taskData.qps.current = parseFloat(qps).toFixed(1)
      draft.taskData.qps.history.push(parseFloat(qps).toFixed(3))
      draft.taskData.qps.history.shift()
    }

    if (speed && speed_unit) {
      draft.taskData.speed.unit = speed_unit
      draft.taskData.speed.current = parseFloat(speed).toFixed(1)
      draft.taskData.speed.history.push(parseFloat(speed).toFixed(3))
      draft.taskData.speed.history.shift()
    }

    if (elapsed) {
      draft.taskData.elapsed.seconds = formatSeconds(parseInt(elapsed))
      draft.taskData.elapsed.task_name = `Task: ${task_name}`
    }
  }
}, initialTaskState)

export default taskReducer
