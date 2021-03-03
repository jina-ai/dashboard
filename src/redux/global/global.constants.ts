import { GlobalState, TNavItem } from "./global.types"

export const CONNECTION_STATUS_HANDLED = "CONNECTION_STATUS_HANDLED"
export const SIDE_BAR_TOGGLED = "SIDE_BAR_TOGGLED"
export const BANNER_SHOWN = "BANNER_SHOWN"
export const BANNER_HIDDEN = "BANNER_HIDDEN"
export const ERROR_SHOWN = "ERROR_SHOWN"
export const MODAL_SHOWN = "MODAL_SHOWN"
export const MODAL_HIDDEN = "MODAL_HIDDEN"
export const JINAD_CONNECTED = "JINAD_CONNECTED"
export const ARGUMENTS_FROM_API_FETCHED = "ARGUMENTS_FROM_API_FETCHED"
export const ARGUMENTS_FROM_DAEMON_FETCHED = "ARGUMENTS_FROM_DAEMON_FETCHED"

export const BANNER_HIDDEN_TIMEOUT = 5000

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
]

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
  processes: {},
}
