import { State } from "../index";

export const selectTaskData = (state: State) => state.taskState.taskData;
