import {
  CLOSE_MODAL,
  HANDLE_CONNECTION_STATUS,
  HIDE_BANNER,
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

export function handleConnectionStatus(
  status: string,
  message: string
): HandleConnectionStatusAction {
  return {
    type: HANDLE_CONNECTION_STATUS,
    payload: {
      status,
      message,
    },
  };
}

export function toggleSidebar(): ToggleSidebarAction {
  return {
    type: TOGGLE_SIDE_BAR,
  };
}

export function showBanner(message: string, theme: string): ShowBannerAction {
  return {
    type: SHOW_BANNER,
    payload: {
      message,
      theme,
    },
  };
}

export function hideBanner(): HideBannerAction {
  return {
    type: HIDE_BANNER,
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

export function showModal(modal: string, modalParams: any): ShowModalAction {
  return {
    type: SHOW_MODAL,
    payload: {
      modal,
      modalParams,
    },
  };
}

export function closeModal(): CloseModalAction {
  return {
    type: CLOSE_MODAL,
  };
}
