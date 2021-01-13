import { SAVE_SETTINGS } from "./settings.constants";

export type SettingsState = {
  settings: {
    host: string;
    port: number;
    log: string;
    profile: string;
    yaml: string;
    shutdown: string;
    ready: string;
  };
};

export type SaveSettingsAction = {
  type: typeof SAVE_SETTINGS;
  payload: SettingsState;
};

export type SettingsActionTypes = SaveSettingsAction;
