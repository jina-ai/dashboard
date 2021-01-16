import { Settings, SettingsState } from "./settings.types";

export const testSettingsState: SettingsState = {
  settings: {
    host: "http://testHost",
    port: "12435",
    log: "/stream/testLog",
    profile: "/stream/testProfile",
    yaml: "/data/testYaml",
    shutdown: "/action/testShutdown",
    ready: "/status/testReady",
  },
};

export const newTestSettings: Settings = {
  host: "http://testHost2",
  port: "12435",
  log: "/stream/testLog2",
  profile: "/stream/testProfile2",
  yaml: "/data/testYaml2",
  shutdown: "/action/testShutdown2",
  ready: "/status/testReady2",
};
