import { combineReducers, createStore, applyMiddleware } from "redux";
import flowReducer from "./flows/flows.reducer";
import { FlowState } from "./flows/flows.types";
import { composeWithDevTools } from "redux-devtools-extension";
import { SettingsState } from "./settings/settings.types";
import settingsReducer from "./settings/settings.reducer";
import { LogStreamState } from "./logStream/logStream.types";
import logStreamReducer from "./logStream/logStream.reducer";
import { GlobalState } from "./global/global.types";
import globalReducer from "./global/global.reducer";
import thunk from "redux-thunk";
import { handleConnectionStatus } from "./global/global.actions";
import taskReducer from "./task/task.reducer";
import { TaskState } from "./task/task.types";
import jinad from "../flux/jinad";

export type State = {
  flowState: FlowState;
  settingsState: SettingsState;
  logStreamState: LogStreamState;
  globalState: GlobalState;
  taskState: TaskState;
};

const rootReducer = combineReducers({
  flowState: flowReducer,
  settingsState: settingsReducer,
  logStreamState: logStreamReducer,
  globalState: globalReducer,
  taskState: taskReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function _handleLogConnectionStatus({connected, message}:{connected:boolean,message:string}) {
  store.dispatch<any>(handleConnectionStatus(connected, message));
}

jinad.connect(
  store.getState().settingsState.settings,
  _handleLogConnectionStatus,
);

export default store;
