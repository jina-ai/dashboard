import { State } from "../index"

export const selectProcesses = (state: State) => state.globalState.processes

export const selectMenuState = (state: State) => state.globalState.menuVisible

export const selectSidebarItems = (state: State) => state.globalState.navItems

export const selectCurrentTab = (state: State) => state.globalState.currentTab

export const selectUser = (state: State) => state.globalState.user

export const selectBanners = (state: State) => state.globalState.banners

export const selectModal = (state: State) => state.globalState.modal

export const selectModalParams = (state: State) => state.globalState.modalParams

export const selectConnectionStatus = (state: State) =>
  state.globalState.connected

export const selectLoading = (state: State) => state.globalState.loading
