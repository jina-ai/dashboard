import reducer from "./settings.reducer";
import { saveSettings } from "./settings.actions";
import { testSettingsState, testSettingsState2 } from "./settings.testData";

describe("settings reducer", () => {
  it("should save settings in Store", () => {
    const newSettings = reducer(
      testSettingsState,
      saveSettings(testSettingsState2)
    );
    expect(newSettings).toEqual(testSettingsState2);
  });

  it("should save settings in localStorage", () => {
    reducer(testSettingsState, saveSettings(testSettingsState2));
    const newSettingsState: any = { settings: {} };
    Object.keys(testSettingsState2.settings).forEach((key) => {
      if (key === "port")
        newSettingsState.settings[key] = parseInt(
          localStorage.getItem(`preferences-${key}`)
        );
      else
        newSettingsState.settings[key] = localStorage.getItem(
          `preferences-${key}`
        );
    });
    expect(newSettingsState).toEqual(testSettingsState2);
  });
});
