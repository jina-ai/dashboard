import { State } from "../index";

export const selectSettings = (state: State) => state.settingsState.settings;
