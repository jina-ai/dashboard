import {
  MODAL_HIDDEN,
  CONNECTION_STATUS_HANDLED,
  BANNER_HIDDEN,
  initialGlobalState,
  BANNER_SHOWN,
  ERROR_SHOWN,
  MODAL_SHOWN,
  SIDE_BAR_TOGGLED,
} from "./global.constants"
import logger from "../../logger"
import { HANDLE_NEW_LOG } from "../logStream/logStream.constants"
import produce from "immer"
import { GlobalActionTypes, GlobalState } from "./global.types"

const globalReducer = produce(
  (draft: GlobalState, action: GlobalActionTypes) => {
    switch (action.type) {
      case CONNECTION_STATUS_HANDLED:
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
      case SIDE_BAR_TOGGLED:
        draft.menuVisible = !draft.menuVisible
        break
      case BANNER_SHOWN:
        draft.banner = {
          message: action.payload.message,
          theme: action.payload.theme,
        }
        break
      case BANNER_HIDDEN:
        draft.banner = null
        break
      case ERROR_SHOWN:
        draft.banner = {
          message: action.payload.message,
          theme: "error",
        }
        break
      case MODAL_SHOWN:
        draft.modal = action.payload.modal
        draft.modalParams = action.payload.modalParams
        break
      case MODAL_HIDDEN:
        draft.modal = null
        draft.modalParams = null
        break
      case HANDLE_NEW_LOG:
        draft.processes[action.payload.process] = action.payload.name
        break
    }
  },
  initialGlobalState
)

export default globalReducer
