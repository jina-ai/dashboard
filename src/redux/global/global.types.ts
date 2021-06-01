import {
  CLOSE_MODAL,
  HANDLE_CONNECTION_STATUS,
  HIDE_BANNER,
  SHOW_BANNER,
  SHOW_ERROR,
  SHOW_MODAL,
  TOGGLE_SIDE_BAR,
  CONNECT_JINAD,
  LOGOUT,
  SETUSER,
} from "./global.constants"
import { handleNewLogAction } from "../logStream/logStream.types"
import { SvgIconComponent } from "@material-ui/icons"

export type ConnectionCallback = (data: {
  connected: boolean
  message: string
}) => void

type Title =
  | "Home"
  | "Log Stream"
  | "Task"
  | "Flow Design"
  | "Hub"
  | "Settings"
  | "Help"
  | "Colors"
  | "Typography"
  | "Misc"

type To =
  | "/home"
  | "/logs"
  | "/task"
  | "/flow"
  | "/hub"
  | "/settings"
  | "/help"
  | "/colors"
  | "/typography"
  | "/misc"

export type Match =
  | "home"
  | "logs"
  | "task"
  | "flow"
  | "hub"
  | "package"
  | "settings"
  | "help"
  | "colors"
  | "typography"
  | "misc"

export type NavItem = {
  title: Title
  to: To
  icon?: SvgIconComponent
  matches: Match[]
}

type Tap = "logStream"
export type GithubCode = string

export type Banner = {
  message: string
  theme: string
} | null

export type User = {
  username: string
  displayName: string
  emails: string[]
  id: string
  nodeId?: string
  profileUrl?: string
  provider?: string
  _json?: { [userAttribute: string]: string }
  _raw?: string
  githubCode?: string
} | null

export type Processes = {
  [processId: string]: string
}

export type Modal =
  | null
  | "logDetails"
  | "newFlow"
  | "import"
  | "review"
  | "podEdit"
  | "flowSettings"
  | "QuerySearch"

export type ModalParams = {
  imageId?: string
  nodeId?: string
} | null

export type GlobalState = {
  user: User
  connected: boolean
  banners: Banner[]
  loading: boolean
  modal: Modal
  modalParams: ModalParams
  menuVisible: boolean
  navItems: NavItem[]
  processes: Processes
  currentTab: Tap
}

export type HandleConnectionStatusAction = {
  type: typeof HANDLE_CONNECTION_STATUS
  payload: {
    connected: boolean
    message: string
  }
}

export type ToggleSidebarAction = {
  type: typeof TOGGLE_SIDE_BAR
}

export type ShowBannerAction = {
  type: typeof SHOW_BANNER
  payload: {
    message: string
    theme: string
  }
}

export type HideBannerAction = {
  type: typeof HIDE_BANNER
}

export type ShowErrorAction = {
  type: typeof SHOW_ERROR
  payload: {
    message: string
  }
}

export type ShowModalAction = {
  type: typeof SHOW_MODAL
  payload: {
    modal: Modal
    modalParams: any
  }
}

export type CloseModalAction = {
  type: typeof CLOSE_MODAL
}

export type ConnectJinaDAction = {
  type: typeof CONNECT_JINAD
}

export type LogoutAction = {
  type: typeof LOGOUT
}

export type SetUserAction = {
  type: typeof SETUSER
  payload: { user: User }
}

export type GlobalActionTypes =
  | HandleConnectionStatusAction
  | ToggleSidebarAction
  | ShowBannerAction
  | HideBannerAction
  | ShowErrorAction
  | ShowModalAction
  | CloseModalAction
  | handleNewLogAction
  | ConnectJinaDAction
  | LogoutAction
  | SetUserAction
