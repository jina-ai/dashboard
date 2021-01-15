import { combineReducers, createStore } from "redux";
import flowReducer from "./flows/flows.reducer";
import { FlowState } from "./flows/flows.types";
import { composeWithDevTools } from "redux-devtools-extension";
import { SettingsState } from "./settings/settings.types";
import settingsReducer from "./settings/settings.reducer";
import { LogStreamState } from "./logStream/logStream.types";

export type State = {
  flowState: FlowState;
  settingsState: SettingsState;
  logStreamState: LogStreamState;
};

const rootReducer = combineReducers({
  flowState: flowReducer,
  settingsState: settingsReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
