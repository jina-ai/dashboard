import { State } from "../index";

export const selectLogs = (state: State) => state.logStreamState.logs;
export const selectLogLevels = (state: State) => state.logStreamState.logLevels;
