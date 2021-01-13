import { SaveSettingsAction, SettingsState } from "./settings.types";
import { SAVE_SETTINGS } from "./settings.constants";

export function saveSettings(settings: SettingsState): SaveSettingsAction {
  return {
    type: SAVE_SETTINGS,
    payload: settings,
  };
}
