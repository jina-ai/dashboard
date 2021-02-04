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
  Modal,
  ShowBannerAction,
  ShowErrorAction,
  ShowModalAction,
  ToggleSidebarAction,
} from "./global.types";
import { AppThunk } from "../index";
import store from "..";
import jinadClient from "../../services/jinad";

export function handleConnectionStatus(
  connected: boolean,
  message: string
): AppThunk {
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

export function showBanner(message: string, theme: string): AppThunk {
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

export function showModal(modal: Modal, modalParams?: any): ShowModalAction {
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

export function connectJinaD(): AppThunk {
  return function (dispatch) {
    const settings = store.getState().settingsState.settings;
    function onConnectionStatus({
      connected,
      message,
    }: {
      connected: boolean;
      message: string;
    }) {
      dispatch(handleConnectionStatus(connected, message));
    }
    jinadClient.connect(settings, onConnectionStatus);
  };
}
