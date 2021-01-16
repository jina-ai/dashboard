import { updateSettingsAction, SettingUpdate } from "./settings.types";
import { UPDATE_SETTINGS } from "./settings.constants";

export function updateSettings(settings: SettingUpdate): updateSettingsAction {
  return {
    type: UPDATE_SETTINGS,
    payload: settings,
  };
}
