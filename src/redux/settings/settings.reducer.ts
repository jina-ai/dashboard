import { intialSettings, SAVE_SETTINGS } from "./settings.constants";
import { SettingsActionTypes, SettingsState } from "./settings.types";
import logger from "../../logger";

export default function settingsReducer(
  state = intialSettings,
  action: SettingsActionTypes
): SettingsState {
  switch (action.type) {
    case SAVE_SETTINGS:
      logger.log("saveSettings - settings", action.payload.settings);
      _saveSettingsInStore(action.payload.settings);
      return action.payload;
    default:
      return state;
  }
}

function _saveSettingsInStore(settings: any) {
  Object.keys(settings).forEach((key) => {
    localStorage.setItem(`preferences-${key}`, settings[key]);
    const item = localStorage.getItem(`preferences-${key}`);
    console.log(item);
  });
}
