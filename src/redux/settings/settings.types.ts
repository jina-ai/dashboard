import { UPDATE_SETTINGS } from "./settings.constants"

export type SettingName =
  | "jinadHost"
  | "jinadPort"
  | "gatewayHost"
  | "gatewayPort"
  | "jinadHost"
  | "jinadPort"
  | "gatewayHost"
  | "gatewayPort"
  | "log"
  | "profile"
  | "yaml"
  | "shutdown"
  | "ready"

export type Settings = {
  [settingName in SettingName]: string
}

export type SettingUpdate = {
  [settingName in SettingName]?: string
}
export type SettingsState = {
  settings: Settings
}

export type updateSettingsAction = {
  type: typeof UPDATE_SETTINGS
  payload: SettingUpdate
}

export type SettingsActionTypes = updateSettingsAction
