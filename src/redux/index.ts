import { combineReducers, createStore } from "redux";
import flowReducer from "./flows/flows.reducer";
import { FlowState } from "./flows/flows.types";
import { composeWithDevTools } from "redux-devtools-extension";
import { SettingsState } from "./settings/settings.types";
import settingsReducer from "./settings/settings.reducer";

export type State = {
  flowState: FlowState;
  settingsState: SettingsState;
};

const rootReducer = combineReducers({
  flowState: flowReducer,
  settingsState: settingsReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
