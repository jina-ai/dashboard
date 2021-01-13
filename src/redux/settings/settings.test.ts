import reducer from "./settings.reducer";
import { saveSettings } from "./settings.actions";
import { testSettingsState } from "./settings.testData";
import { SettingsState } from "./settings.types";

describe("settings reducer", () => {
  it("should save settings in Store", () => {
    const testSettingsState2: SettingsState = {
      settings: {
        host: "http://testHost2",
        port: 12435,
        log: "/stream/testLog2",
        profile: "/stream/testProfile2",
        yaml: "/data/testYaml2",
        shutdown: "/action/testShutdown2",
        ready: "/status/testReady2",
      },
    };
    const newState = reducer(
      testSettingsState,
      saveSettings(testSettingsState2)
    );
    expect(newState).toEqual(testSettingsState2);
  });
});
