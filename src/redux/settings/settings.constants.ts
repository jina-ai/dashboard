import { SettingsState } from "./settings.types"

export const defaultPort = "5000"
export const defaultHost = "http://localhost"

export const UPDATE_SETTINGS = "UPDATE_SETTINGS"

export const intialSettings: SettingsState = {
  settings: {
    host: localStorage.getItem("preferences-host") || defaultHost,
    port: localStorage.getItem("preferences-port") || defaultPort,
    log: localStorage.getItem("preferences-log") || "/stream/log",
    profile: localStorage.getItem("preferences-profile") || "/stream/profile",
    yaml: localStorage.getItem("preferences-yaml") || "/data/yaml",
    shutdown:
      localStorage.getItem("preferences-shutdown") || "/action/shutdown",
    ready: localStorage.getItem("preferences-ready") || "/status/ready",
  },
}
