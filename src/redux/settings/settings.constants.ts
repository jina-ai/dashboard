import { SettingsState } from "./settings.types";

export const SAVE_SETTINGS = "SAVE_SETTINGS";

export const intialSettings: SettingsState = {
  settings: {
    host: localStorage.getItem("preferences-host") || "http://localhost",
    port: parseInt(localStorage.getItem("preferences-port") || "5000"),
    log: localStorage.getItem("preferences-log") || "/stream/log",
    profile: localStorage.getItem("preferences-profile") || "/stream/profile",
    yaml: localStorage.getItem("preferences-yaml") || "/data/yaml",
    shutdown:
      localStorage.getItem("preferences-shutdown") || "/action/shutdown",
    ready: localStorage.getItem("preferences-ready") || "/status/ready",
  },
};
