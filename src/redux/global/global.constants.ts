import { GlobalState, NavItem } from "./global.types"
import Home from "@material-ui/icons/Home"
import Chart from "@material-ui/icons/InsertChart"
import Layers from "@material-ui/icons/Layers"
import Settings from "@material-ui/icons/Settings"
import Help from "@material-ui/icons/Help"

export const HANDLE_CONNECTION_STATUS = "HANDLE_CONNECTION_STATUS"
export const TOGGLE_SIDE_BAR = "TOGGLE_SIDE_BAR"
export const SHOW_BANNER = "SHOW_BANNER"
export const HIDE_BANNER = "HIDE_BANNER"
export const SHOW_ERROR = "SHOW_ERROR"
export const SHOW_MODAL = "SHOW_MODAL"
export const CLOSE_MODAL = "CLOSE_MODAL"
export const CONNECT_JINAD = "CONNECT_JINAD"
export const FETCH_ARGUMENTS_FROM_API = "FETCH_ARGUMENTS_FROM_API"
export const FETCH_ARGUMENTS_FROM_DAEMON = "FETCH_ARGUMENTS_FROM_DAEMON"
export const LOGOUT = "LOGOUT"
export const SETUSER = "SETUSER"

export const HIDE_BANNER_TIMEOUT = 5000

const navItems: NavItem[] = [
  {
    title: "Home",
    to: "/home",
    icon: Home,
    matches: ["home"],
  },
  {
    title: "Log Stream",
    to: "/logs",
    icon: Chart,
    matches: ["logs"],
  },
  {
    title: "Flow Design",
    to: "/flow",
    icon: Home,
    matches: ["flow"],
  },
  {
    title: "Hub",
    to: "/hub",
    icon: Layers,
    matches: ["hub", "package"],
  },
  {
    title: "Settings",
    to: "/settings",
    icon: Settings,
    matches: ["settings"],
  },
  {
    title: "Help",
    to: "/help",
    icon: Help,
    matches: ["help"],
  },
]

export function getInitialGlobalState(): GlobalState {
  let user = null
  const userString = localStorage.getItem("user")
  if (userString) {
    user = JSON.parse(userString)
  }

  return {
    user,
    banners: [],
    connected: false,
    currentTab: "logStream",
    loading: true,
    menuVisible: false,
    modal: null,
    modalParams: null,
    navItems,
    processes: {},
  }
}
