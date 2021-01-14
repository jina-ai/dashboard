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
          localStorage.getItem(`preferences-${key}`) as string
        );
      else
        newSettingsState.settings[key] = localStorage.getItem(
          `preferences-${key}`
        );
    });
    expect(newSettingsState).toEqual(testSettingsState2);
  });

  it("should log the saved settings", () => {
    Object.defineProperty(window, "logsEnabled", {
      value: true,
      writable: true,
    });

    Object.defineProperty(window, "logs", {
      value: { push: (data: any) => {} },
      writable: false,
    });

    console.log = jest.fn();
    (window as any).logs.push = jest.fn();

    reducer(testSettingsState, saveSettings(testSettingsState2));

    expect(console.log).toHaveBeenCalledWith("saveSettings - settings", {
      ...testSettingsState2.settings,
    });
    expect((window as any).logs.push).toHaveBeenCalledWith([
      "saveSettings - settings",
      testSettingsState2.settings,
    ]);
  });
});
