import reducer from "./settings.reducer"
import { updateSettings } from "./settings.actions"
import { testSettingsState, newTestSettings } from "./settings.testData"
import { SettingName, Settings } from "./settings.types"

describe("settings reducer", () => {
  it("should save settings in Store", () => {
    const newSettingsState = reducer(
      testSettingsState,
      updateSettings(newTestSettings)
    )
    expect(newSettingsState.settings).toEqual(newTestSettings)
  })

  it("should save settings in localStorage", () => {
    reducer(testSettingsState, updateSettings(newTestSettings))
    const newSettingsAfterUpdate: Settings = {
      log: "",
      profile: "",
      yaml: "",
      host: "",
      shutdown: "",
      ready: "",
      port: "",
    }
    Object.keys(newTestSettings).forEach((key) => {
      const key2 = key as SettingName
      newSettingsAfterUpdate[key2] = localStorage.getItem(
        `preferences-${key}`
      ) as string
    })
    expect(newSettingsAfterUpdate).toEqual(newTestSettings)
  })

  it("should log the saved settings", () => {
    Object.defineProperty(window, "logsEnabled", {
      value: true,
      writable: true,
    })

    Object.defineProperty(window, "logs", {
      value: {
        push: () => {},
      },
      writable: false,
    })

    console.log = jest.fn()
    ;(window as any).logs.push = jest.fn()

    reducer(testSettingsState, updateSettings(newTestSettings))

    expect(console.log).toHaveBeenCalledWith("saveSettings - settings", {
      ...newTestSettings,
    })
    expect((window as any).logs.push).toHaveBeenCalledWith([
      "saveSettings - settings",
      newTestSettings,
    ])
  })
})
