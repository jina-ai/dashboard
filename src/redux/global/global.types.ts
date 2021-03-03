import {
  MODAL_HIDDEN,
  CONNECTION_STATUS_HANDLED,
  BANNER_HIDDEN,
  BANNER_SHOWN,
  ERROR_SHOWN,
  MODAL_SHOWN,
  SIDE_BAR_TOGGLED,
  JINAD_CONNECTED,
} from "./global.constants"
import { handleNewLogAction } from "../logStream/logStream.types"

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
  _json: any
  _raw: any
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

export type ModalParams = {
  imageId?: string
  nodeId?: string
  rerenderCanvas?: any
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
  type: typeof CONNECTION_STATUS_HANDLED
  payload: {
    connected: boolean
    message: string
  }
}

export type ToggleSidebarAction = {
  type: typeof SIDE_BAR_TOGGLED
}

export type ShowBannerAction = {
  type: typeof BANNER_SHOWN
  payload: {
    message: string
    theme: string
  }
}

export type HideBannerAction = {
  type: typeof BANNER_HIDDEN
}

export type ShowErrorAction = {
  type: typeof ERROR_SHOWN
  payload: {
    message: string
  }
}

export type ShowModalAction = {
  type: typeof MODAL_SHOWN
  payload: {
    modal: Modal
    modalParams: any
  }
}

export type CloseModalAction = {
  type: typeof MODAL_HIDDEN
}

export type ConnectJinaDAction = {
  type: typeof JINAD_CONNECTED
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
