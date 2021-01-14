import reducer from "./settings.reducer";
import { updateSettings } from "./settings.actions";
import { testSettingsState, newTestSettings } from "./settings.testData";

describe("settings reducer", () => {
  it("should save settings in Store", () => {
    const newSettingsState = reducer(
      testSettingsState,
      updateSettings(newTestSettings)
    );
    expect(newSettingsState.settings).toEqual(newTestSettings);
  });

  it("should save settings in localStorage", () => {
    reducer(testSettingsState, updateSettings(newTestSettings));
    const newSettingsAfterUpdate: any = {};
    Object.keys(newTestSettings).forEach((key) => {
      if (key === "port")
        newSettingsAfterUpdate[key] = parseInt(
          localStorage.getItem(`preferences-${key}`) as string
        );
      else
        newSettingsAfterUpdate[key] = localStorage.getItem(
          `preferences-${key}`
        );
    });
    expect(newSettingsAfterUpdate).toEqual(newTestSettings);
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

    reducer(testSettingsState, updateSettings(newTestSettings));

    expect(console.log).toHaveBeenCalledWith("saveSettings - settings", {
      ...newTestSettings,
    });
    expect((window as any).logs.push).toHaveBeenCalledWith([
      "saveSettings - settings",
      newTestSettings,
    ]);
  });
});
