import { SettingsState } from "./settings.types"

export const defaultJinaDPort = "5000"
export const defaultJinaDHost = "http://localhost"
export const defaultGatewayPort = "5555"
export const defaultGatewayHost = "http://localhost"

export const UPDATE_SETTINGS = "UPDATE_SETTINGS"

export const intialSettings: SettingsState = {
  settings: {
    jinadHost:
      localStorage.getItem("preferences-jinadhost") || defaultJinaDHost,
    jinadPort:
      localStorage.getItem("preferences-jinadPort") || defaultJinaDPort,
    gatewayHost:
      localStorage.getItem("preferences-gatewayHost") || defaultGatewayHost,
    gatewayPort:
      localStorage.getItem("preferences-gatewayPort") || defaultGatewayPort,
    log: localStorage.getItem("preferences-log") || "/stream/log",
    profile: localStorage.getItem("preferences-profile") || "/stream/profile",
    yaml: localStorage.getItem("preferences-yaml") || "/data/yaml",
    shutdown:
      localStorage.getItem("preferences-shutdown") || "/action/shutdown",
    ready: localStorage.getItem("preferences-ready") || "/status/ready",
  },
}
