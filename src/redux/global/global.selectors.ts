import { isFeatureEnabled } from "../../helpers/featureSwitch"
import { State } from "../index"

export const selectProcesses = (state: State) => state.globalState.processes

export const selectMenuState = (state: State) => state.globalState.menuVisible

// Todo: remove feature switch condition after releasing to all instance
export const selectSidebarItems = (state: State) =>
  isFeatureEnabled("DEBUGGING_TOOL")
    ? state.globalState.navItems
    : state.globalState.navItems.filter((navItem) => navItem.title !== "Debug")

export const selectCurrentTab = (state: State) => state.globalState.currentTab

export const selectUser = (state: State) => state.globalState.user

export const selectBanners = (state: State) => state.globalState.banners

export const selectModal = (state: State) => state.globalState.modal

export const selectModalParams = (state: State) => state.globalState.modalParams

export const selectConnectionStatus = (state: State) =>
  state.globalState.connected

export const selectLoading = (state: State) => state.globalState.loading
