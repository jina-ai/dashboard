import {
  CLOSE_MODAL,
  FETCH_ARGUMENTS_FROM_API,
  FETCH_ARGUMENTS_FROM_DAEMON,
  HANDLE_CONNECTION_STATUS,
  HIDE_BANNER,
  HIDE_BANNER_TIMEOUT,
  SHOW_BANNER,
  SHOW_ERROR,
  SHOW_MODAL,
  TOGGLE_SIDE_BAR,
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
import { setFlowArguments } from "../flows/flows.actions"
import logger from "../../logger"

export function handleJinadConnectionStatus(
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

export function handleGatewayConnectionStatus(
  connected: boolean,
  message: string
): AppThunk {
  return function (dispatch) {
    dispatch(_handleConnectionStatus(connected, message))
    if (connected) {
      dispatch(showBanner(message, "success"))
    }
  }
}

export function _handleConnectionStatus(
  connected: boolean,
  message: string
): HandleConnectionStatusAction {
  return {
    type: HANDLE_CONNECTION_STATUS,
    payload: {
      connected,
      message,
    },
  }
}

export function fetchArgumentsFromApi(): AppThunk {
  return async function (dispatch) {
    dispatch({ type: FETCH_ARGUMENTS_FROM_API })
    let flowArguments = await getJinaFlowArguments()
    logger.log("loadFlowArgumentsFromApi | flowArguments:", flowArguments)
    return dispatch(setFlowArguments(flowArguments))
  }
}

export function fetchArgumentsFromDaemon(): AppThunk {
  return async function (dispatch) {
    dispatch({ type: FETCH_ARGUMENTS_FROM_DAEMON })
    let flowArguments = await jinadClient.getJinaFlowArguments()
    logger.log("loadFlowArgumentsFromDaemon | flowArguments:", flowArguments)
    return dispatch(setFlowArguments(flowArguments))
  }
}

export function toggleSidebar(): ToggleSidebarAction {
  return {
    type: TOGGLE_SIDE_BAR,
  }
}

export function _showBanner(message: string, theme: string): ShowBannerAction {
  return {
    type: SHOW_BANNER,
    payload: {
      message,
      theme,
    },
  }
}

export function _hideBanner(): HideBannerAction {
  return {
    type: HIDE_BANNER,
  }
}

export function showBanner(message: string, theme: string): AppThunk {
  return function (dispatch) {
    dispatch(_showBanner(message, theme))
    setTimeout(() => {
      dispatch(_hideBanner())
    }, HIDE_BANNER_TIMEOUT)
  }
}

export function showError(message: string): ShowErrorAction {
  return {
    type: SHOW_ERROR,
    payload: {
      message,
    },
  }
}

export function showModal(modal: Modal, modalParams?: any): ShowModalAction {
  return {
    type: SHOW_MODAL,
    payload: {
      modal,
      modalParams: modalParams || null,
    },
  }
}

export function closeModal(): CloseModalAction {
  return {
    type: CLOSE_MODAL,
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
      dispatch(handleJinadConnectionStatus(connected, message))
    }
    jinadClient.connect(settings, onConnectionStatus)
  }
}
