import {
  CLOSE_MODAL,
  HANDLE_CONNECTION_STATUS,
  HIDE_BANNER,
  SHOW_BANNER,
  SHOW_ERROR,
  SHOW_MODAL,
  TOGGLE_SIDE_BAR,
  CONNECT_JINAD,
} from "./global.constants"
import { handleNewLogAction } from "../logStream/logStream.types"

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

type IconName =
  | "home"
  | "insert_comment"
  | "assessment"
  | "device_hub"
  | "store"
  | "settings"
  | "help"

type Match =
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

export type TNavItem = {
  title: Title
  to: To
  iconName?: IconName
  matches: Match[]
}

type Tap = "logStream"

export type Banner = {
  message: string
  theme: string
} | null

export type User = {
  displayName: string
  emails: [{ value: string }]
  id: string
  nodeId: string
  photos: [{ value: string }]
  profileUrl: string
  provider: string
  username: string
  _json: string
  _raw: string
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
  | "CRUD"

export type ModalParams = {
  imageId?: string
  nodeId?: string
} | null

export type GlobalState = {
  user: User
  connected: boolean
  banner: Banner
  loading: boolean
  modal: Modal
  modalParams: ModalParams
  menuVisible: boolean
  navItems: TNavItem[]
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
