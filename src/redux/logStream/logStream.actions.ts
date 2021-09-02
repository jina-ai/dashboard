import { HANDLE_NEW_LOG, SHOW_LOG_INDEX } from "./logStream.constants"
import {
  handleNewLogAction,
  showLogAtIndexAction,
  RawLog,
} from "./logStream.types"

import store, { AppThunk } from ".."
import { showBanner } from "../global/global.actions"
import logger from "../../logger"
import jinadClient from "../../services/jinad"

export function showLogAtIndex(logIndex: number): showLogAtIndexAction {
  return {
    type: SHOW_LOG_INDEX,
    payload: logIndex,
  }
}

export function handleNewLog(log: RawLog): handleNewLogAction {
  return {
    type: HANDLE_NEW_LOG,
    payload: log,
  }
}

export function initLogStream(
  workspace_id: string,
  flow_id: string
): AppThunk<Promise<void>> {
  return async function (dispatch) {
    function handleConnection({
      connected,
      message,
    }: {
      connected: boolean
      message: string
    }) {
      if (!connected) return dispatch(showBanner(message, "error"))
    }

    let flowResult = await jinadClient.waitForFlow(workspace_id, flow_id)

    if (flowResult.status === "error")
      return dispatch(showBanner(flowResult.message, "error"))

    let logsResult = await jinadClient.getLogs(workspace_id, flow_id)

    if (logsResult.status === "error") {
      if (logsResult.message) dispatch(showBanner(logsResult.message, "error"))
      return
    }

    function handleLog(log: RawLog) {
      dispatch(handleNewLog(log))
    }

    const { logs } = logsResult

    logger.log("got logs:", logs)

    logs.forEach(handleLog)

    const settings = store.getState().settingsState.settings
    jinadClient.listenForLogs(
      workspace_id,
      flow_id,
      settings,
      handleConnection,
      handleLog
    )
  }
}
