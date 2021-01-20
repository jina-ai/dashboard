import { combineReducers, createStore } from "redux";
import flowReducer from "./flows/flows.reducer";
import { FlowState } from "./flows/flows.types";
import { composeWithDevTools } from "redux-devtools-extension";
import { SettingsState } from "./settings/settings.types";
import settingsReducer from "./settings/settings.reducer";
import { LogStreamState, Message } from "./logStream/logStream.types";
import logStreamReducer from "./logStream/logStream.reducer";
import api from "../flux/api";
import { handleNewLog } from "./logStream/logStream.actions";

export type State = {
  flowState: FlowState;
  settingsState: SettingsState;
  logStreamState: LogStreamState;
};

const rootReducer = combineReducers({
  flowState: flowReducer,
  settingsState: settingsReducer,
  logStreamState: logStreamReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

function handleLogConnectionStatus(status: string, message: string) {}

function _handleNewLog(message: Message) {
  store.dispatch(handleNewLog(message));
}

function handleNewTaskEvent(update: { type: string; data: string }) {}
api.connect(
  store.getState().settingsState.settings,
  handleLogConnectionStatus,
  _handleNewLog,
  handleNewTaskEvent
);

export default store;
