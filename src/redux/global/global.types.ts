import {
  CLOSE_MODAL,
  HANDLE_CONNECTION_STATUS,
  HIDE_BANNER,
  SHOW_BANNER,
  SHOW_ERROR,
  SHOW_MODAL,
  TOGGLE_SIDE_BAR,
} from "./global.constants";
import { handleNewLogAction } from "../logStream/logStream.types";

type Title =
  | "Home"
  | "Log Stream"
  | "Task"
  | "Flow Design"
  | "Hub"
  | "Settings"
  | "Help";

type To =
  | "/home"
  | "/logs"
  | "/task"
  | "/flow"
  | "/hub"
  | "/settings"
  | "/help";

type IconName =
  | "home"
  | "insert_comment"
  | "assessment"
  | "device_hub"
  | "store"
  | "settings"
  | "help";

type Match =
  | "home"
  | "logs"
  | "task"
  | "flow"
  | "hub"
  | "package"
  | "settings"
  | "help";

export type NavItem = {
  title: Title;
  to: To;
  iconName: IconName;
  matches: Match[];
};

type Tap = "logStream";

export type Banner =
  | {
      message: string;
      theme: string;
    }
  | {};
export type GlobalState = {
  connected: boolean;
  banner: Banner;
  loading: boolean;
  modal: string;
  modalParams: {};
  menuVisible: boolean;
  navItems: NavItem[];
  processes: {
    [processNum: number]: string;
  };
  currentTab: Tap;
};

export type HandleConnectionStatusAction = {
  type: typeof HANDLE_CONNECTION_STATUS;
  payload: {
    status: string;
    message: string;
  };
};

export type ToggleSidebarAction = {
  type: typeof TOGGLE_SIDE_BAR;
};

export type ShowBannerAction = {
  type: typeof SHOW_BANNER;
  payload: {
    message: string;
    theme: string;
  };
};

export type HideBannerAction = {
  type: typeof HIDE_BANNER;
};

export type ShowErrorAction = {
  type: typeof SHOW_ERROR;
  payload: {
    message: string;
  };
};

export type ShowModalAction = {
  type: typeof SHOW_MODAL;
  payload: {
    modal: string;
    modalParams: any;
  };
};

export type CloseModalAction = {
  type: typeof CLOSE_MODAL;
};

export type GlobalActionTypes =
  | HandleConnectionStatusAction
  | ToggleSidebarAction
  | ShowBannerAction
  | HideBannerAction
  | ShowErrorAction
  | ShowModalAction
  | CloseModalAction
  | handleNewLogAction;
