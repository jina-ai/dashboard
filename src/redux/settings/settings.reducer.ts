import { intialSettings, UPDATE_SETTINGS } from "./settings.constants";
import {
  SettingName,
  Settings,
  SettingsActionTypes,
  SettingsState,
} from "./settings.types";
import logger from "../../logger";

export default function settingsReducer(
  state = intialSettings,
  action: SettingsActionTypes
): SettingsState {
  switch (action.type) {
    case UPDATE_SETTINGS:
      const newSettings = {
        ...state.settings,
        ...action.payload,
      };
      const newSettingsState = {
        settings: newSettings,
      };
      logger.log("saveSettings - settings", newSettings);
      _saveSettingsInStore(newSettings);
      return newSettingsState;
    default:
      return state;
  }
}

function _saveSettingsInStore(settings: Settings) {
  Object.keys(settings).forEach((key) => {
    localStorage.setItem(
      `preferences-${key}`,
      settings[key as SettingName] as string
    );
  });
}
