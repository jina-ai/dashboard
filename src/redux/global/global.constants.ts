import { GlobalState, TNavItem } from "./global.types";

export const HANDLE_CONNECTION_STATUS = "HANDLE_CONNECTION_STATUS";
export const TOGGLE_SIDE_BAR = "TOGGLE_SIDE_BAR";
export const SHOW_BANNER = "SHOW_BANNER";
export const HIDE_BANNER = "HIDE_BANNER";
export const SHOW_ERROR = "SHOW_ERROR";
export const SHOW_MODAL = "SHOW_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const HIDE_BANNER_TIMEOUT = 5000;

const navItems: TNavItem[] = [
  {
    title: "Home",
    to: "/home",
    iconName: "home",
    matches: ["home"],
  },
  {
    title: "Log Stream",
    to: "/logs",
    iconName: "insert_comment",
    matches: ["logs"],
  },
  {
    title: "Task",
    to: "/task",
    iconName: "assessment",
    matches: ["task"],
  },
  {
    title: "Flow Design",
    to: "/flow",
    iconName: "device_hub",
    matches: ["flow"],
  },
  {
    title: "Hub",
    to: "/hub",
    iconName: "store",
    matches: ["hub", "package"],
  },
  {
    title: "Settings",
    to: "/settings",
    iconName: "settings",
    matches: ["settings"],
  },
  {
    title: "Help",
    to: "/help",
    iconName: "help",
    matches: ["help"],
  },
];

export const initialGlobalState: GlobalState = {
  user: null,
  banner: null,
  connected: false,
  currentTab: "logStream",
  loading: true,
  menuVisible: false,
  modal: null,
  modalParams: null,
  navItems,
  processes: [],
};
