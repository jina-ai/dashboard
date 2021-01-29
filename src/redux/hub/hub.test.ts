import reducer from "./hub.reducer";
import { HIDE_BANNER_TIMEOUT, initialHubState } from "./hub.constants";
import {
  fetchHubImages
} from "./hub.actions";
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { HubState } from "./hub.types";
import { AnyAction } from "redux";
import { State } from "../index";

const middlewares = [thunk];
type DispatchExts = ThunkDispatch<State, void, AnyAction>;
const mockStore = configureMockStore<GlobalState, DispatchExts>(middlewares);

describe("global reducer", () => {
  describe("when a new log is submitted", () => {
    const newGlobalState = reducer(
      initialGlobalState,
      handleNewLog(testMessage)
    );
    const numberOldProcesses = Object.keys(initialGlobalState.processes).length;
    const numberNewProcesses = Object.keys(newGlobalState.processes).length;

    it(" should add a new process", () => {
      expect(numberNewProcesses - numberOldProcesses).toEqual(1);
      expect(newGlobalState.processes[testMessage.data.process]).toEqual(
        testMessage.data.name
      )
    })
  })
})
