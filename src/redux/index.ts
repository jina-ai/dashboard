import { combineReducers, createStore } from "redux";
import flowState from "./flows/flows.reducer";
import { FlowState } from "./flows/flows.types";
import { composeWithDevTools } from "redux-devtools-extension";

export type State = {
  flowState: FlowState;
};

const rootReducer = combineReducers({
  flowState,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
