import {
  CLOSE_MODAL,
  HANDLE_CONNECTION_STATUS,
  HIDE_BANNER,
  HIDE_BANNER_TIMEOUT,
  SHOW_BANNER,
  SHOW_ERROR,
  SHOW_MODAL,
  TOGGLE_SIDE_BAR,
} from "./global.constants";
import {
  CloseModalAction,
  HandleConnectionStatusAction,
  HideBannerAction,
  ShowBannerAction,
  ShowErrorAction,
  ShowModalAction,
  ToggleSidebarAction,
} from "./global.types";
import { ThunkAction } from "redux-thunk";
import { State } from "../index";
import { Action } from "redux";

export function handleConnectionStatus(
  connected: boolean,
  message: string
): ThunkAction<void, State, unknown, Action<string>> {
  return function (dispatch) {
    dispatch(_handleConnectionStatus(connected, message));
    if (connected) {
      dispatch(showBanner(message, "success"));
    }
  };
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
  };
}

export function toggleSidebar(): ToggleSidebarAction {
  return {
    type: TOGGLE_SIDE_BAR,
  };
}

export function _showBanner(message: string, theme: string): ShowBannerAction {
  return {
    type: SHOW_BANNER,
    payload: {
      message,
      theme,
    },
  };
}

export function _hideBanner(): HideBannerAction {
  return {
    type: HIDE_BANNER,
  };
}

export function showBanner(
  message: string,
  theme: string
): ThunkAction<void, State, unknown, Action<string>> {
  return function (dispatch) {
    dispatch(_showBanner(message, theme));
    setTimeout(() => {
      dispatch(_hideBanner());
    }, HIDE_BANNER_TIMEOUT);
  };
}

export function showError(message: string): ShowErrorAction {
  return {
    type: SHOW_ERROR,
    payload: {
      message,
    },
  };
}

export function showModal(modal: string, modalParams?: any): ShowModalAction {
  return {
    type: SHOW_MODAL,
    payload: {
      modal,
      modalParams: modalParams || null,
    },
  };
}

export function closeModal(): CloseModalAction {
  return {
    type: CLOSE_MODAL,
  };
}
