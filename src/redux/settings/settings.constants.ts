import { SettingsState } from "./settings.types"
import {
  PREFERENCES_HOST,
  PREFERENCES_LOG,
  PREFERENCES_PORT,
  PREFERENCES_PROFILE,
  PREFERENCES_READY,
  PREFERENCES_SHUTDOWN,
  PREFERENCES_YAML,
} from "../../services/localStorageKeys"

export const defaultPort = "5000"
export const defaultHost = "http://localhost"

export const UPDATE_SETTINGS = "UPDATE_SETTINGS"

export const intialSettings: SettingsState = {
  settings: {
    host: localStorage.getItem(PREFERENCES_HOST) || defaultHost,
    port: localStorage.getItem(PREFERENCES_PORT) || defaultPort,
    log: localStorage.getItem(PREFERENCES_LOG) || "/stream/log",
    profile: localStorage.getItem(PREFERENCES_PROFILE) || "/stream/profile",
    yaml: localStorage.getItem(PREFERENCES_YAML) || "/data/yaml",
    shutdown: localStorage.getItem(PREFERENCES_SHUTDOWN) || "/action/shutdown",
    ready: localStorage.getItem(PREFERENCES_READY) || "/status/ready",
  },
}
