import {
  CLOSE_MODAL,
  HANDLE_CONNECTION_STATUS,
  HIDE_BANNER,
  initialGlobalState,
  GITHUBLOGIN,
  LOGOUT,
  SHOW_BANNER,
  SHOW_ERROR,
  SHOW_MODAL,
  TOGGLE_SIDE_BAR,
} from "./global.constants"
import logger from "../../logger"
import { HANDLE_NEW_LOG } from "../logStream/logStream.constants"
import produce from "immer"
import { GlobalActionTypes, GlobalState } from "./global.types"

const globalReducer = produce(
  (draft: GlobalState, action: GlobalActionTypes) => {
    switch (action.type) {
      case HANDLE_CONNECTION_STATUS:
        logger.log(
          "handleLogConnectionStatus - status",
          action.payload.connected
        )
        logger.log(
          "handleLogConnectionStatus - message",
          action.payload.message
        )
        draft.loading = false
        draft.connected = action.payload.connected
        break
      case TOGGLE_SIDE_BAR:
        draft.menuVisible = !draft.menuVisible
        break
      case SHOW_BANNER:
        draft.banner = {
          message: action.payload.message,
          theme: action.payload.theme,
        }
        break
      case HIDE_BANNER:
        draft.banner = null
        break
      case SHOW_ERROR:
        draft.banner = {
          message: action.payload.message,
          theme: "error",
        }
        break
      case SHOW_MODAL:
        draft.modal = action.payload.modal
        draft.modalParams = action.payload.modalParams
        break
      case CLOSE_MODAL:
        draft.modal = null
        draft.modalParams = null
        break
      case HANDLE_NEW_LOG:
        draft.processes[action.payload.process] = action.payload.name
        break
      case GITHUBLOGIN:
        draft.loginData = action.payload.githubLoginData
        break
      case LOGOUT:
        draft.user = null
        break
    }
  },
  initialGlobalState
)

export default globalReducer
