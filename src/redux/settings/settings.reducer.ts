import { intialSettings, SAVE_SETTINGS } from "./settings.constants";
import { SettingsActionTypes, SettingsState } from "./settings.types";

export default function settingsReducer(
  state = intialSettings,
  action: SettingsActionTypes
): SettingsState {
  switch (action.type) {
    case SAVE_SETTINGS:
      return action.payload;
    default:
      return state;
  }
}
