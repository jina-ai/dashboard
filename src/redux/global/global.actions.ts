import {
  MODAL_HIDDEN,
  ARGUMENTS_FROM_API_FETCHED,
  ARGUMENTS_FROM_DAEMON_FETCHED,
  CONNECTION_STATUS_HANDLED,
  BANNER_HIDDEN,
  BANNER_HIDDEN_TIMEOUT,
  BANNER_SHOWN,
  ERROR_SHOWN,
  MODAL_SHOWN,
  SIDE_BAR_TOGGLED,
} from "./global.constants"
import {
  CloseModalAction,
  HandleConnectionStatusAction,
  HideBannerAction,
  Modal,
  ShowBannerAction,
  ShowErrorAction,
  ShowModalAction,
  ToggleSidebarAction,
} from "./global.types"
import { AppThunk } from "../index"
import store from ".."
import jinadClient from "../../services/jinad"
import { getJinaFlowArguments } from "../../services/jinaApi"
import { updateFlowArguments } from "../flows/flows.actions"
import logger from "../../logger"

export function handleConnectionStatus(
  connected: boolean,
  message: string
): AppThunk {
  return function (dispatch) {
    dispatch(_handleConnectionStatus(connected, message))
    if (connected) {
      dispatch(showBanner(message, "success"))
      dispatch(fetchArgumentsFromDaemon())
    } else {
      dispatch(fetchArgumentsFromApi())
    }
  }
}

export function _handleConnectionStatus(
  connected: boolean,
  message: string
): HandleConnectionStatusAction {
  return {
    type: CONNECTION_STATUS_HANDLED,
    payload: {
      connected,
      message,
    },
  }
}

export function fetchArgumentsFromApi(): AppThunk {
  return async function (dispatch) {
    dispatch({ type: ARGUMENTS_FROM_API_FETCHED })
    let flowArguments = await getJinaFlowArguments()
    logger.log("loadFlowArgumentsFromApi | flowArguments:", flowArguments)
    return dispatch(updateFlowArguments(flowArguments))
  }
}

export function fetchArgumentsFromDaemon(): AppThunk {
  return async function (dispatch) {
    dispatch({ type: ARGUMENTS_FROM_DAEMON_FETCHED })
    let flowArguments = await jinadClient.getJinaFlowArguments()
    logger.log("loadFlowArgumentsFromDaemon | flowArguments:", flowArguments)
    return dispatch(updateFlowArguments(flowArguments))
  }
}

export function toggleSidebar(): ToggleSidebarAction {
  return {
    type: SIDE_BAR_TOGGLED,
  }
}

export function _showBanner(message: string, theme: string): ShowBannerAction {
  return {
    type: BANNER_SHOWN,
    payload: {
      message,
      theme,
    },
  }
}

export function _hideBanner(): HideBannerAction {
  return {
    type: BANNER_HIDDEN,
  }
}

export function showBanner(message: string, theme: string): AppThunk {
  return function (dispatch) {
    dispatch(_showBanner(message, theme))
    setTimeout(() => {
      dispatch(_hideBanner())
    }, BANNER_HIDDEN_TIMEOUT)
  }
}

export function showError(message: string): ShowErrorAction {
  return {
    type: ERROR_SHOWN,
    payload: {
      message,
    },
  }
}

export function showModal(modal: Modal, modalParams?: any): ShowModalAction {
  return {
    type: MODAL_SHOWN,
    payload: {
      modal,
      modalParams: modalParams || null,
    },
  }
}

export function closeModal(): CloseModalAction {
  return {
    type: MODAL_HIDDEN,
  }
}

export function connectJinaD(): AppThunk {
  return function (dispatch) {
    const settings = store.getState().settingsState.settings
    function onConnectionStatus({
      connected,
      message,
    }: {
      connected: boolean
      message: string
    }) {
      dispatch(handleConnectionStatus(connected, message))
    }
    jinadClient.connect(settings, onConnectionStatus)
  }
}
