import { SettingsState } from "./settings.types";

export const testSettingsState: SettingsState = {
  settings: {
    host: "http://testHost",
    port: 12435,
    log: "/stream/testLog",
    profile: "/stream/testProfile",
    yaml: "/data/testYaml",
    shutdown: "/action/testShutdown",
    ready: "/status/testReady",
  },
};
