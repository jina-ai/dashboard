import reducer from "./global.reducer";
import { HIDE_BANNER_TIMEOUT, initialGlobalState } from "./global.constants";
import { handleNewLog } from "../logStream/logStream.actions";
import { testMessage } from "../logStream/logStream.testData";
import logger from "../../logger";
import {
  closeModal,
  handleConnectionStatus,
  _hideBanner,
  _showBanner,
  showError,
  showModal,
  toggleSidebar,
  showBanner,
} from "./global.actions";
import {
  testError,
  testMessage_0,
  testModal,
  testModalParams,
  testTheme,
} from "./global.testData";
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { GlobalState } from "./global.types";
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
      );
    });
  });

  describe("when handling connection", () => {
    const newGlobalState = reducer(
      initialGlobalState,
      handleConnectionStatus("connected", testMessage_0)
    );

    it("should be able to connect", () => {
      expect(newGlobalState.connected).toBe(true);
    });

    it("should disable loading", () => {
      const newGlobalState = reducer(
        initialGlobalState,
        handleConnectionStatus("connected", testMessage_0)
      );
      expect(newGlobalState.loading).toBe(false);
    });

    it("should log the connection", () => {
      const loggerSpy = jest.spyOn(logger, "log");
      reducer(
        initialGlobalState,
        handleConnectionStatus("connected", testMessage_0)
      );
      expect(loggerSpy).toHaveBeenNthCalledWith(
        1,
        "handleLogConnectionStatus - status",
        "connected"
      );
      expect(loggerSpy).toHaveBeenNthCalledWith(
        2,
        "handleLogConnectionStatus - message",
        testMessage_0
      );
    });

    it("should set a banner", () => {
      expect(newGlobalState.banner).toEqual({
        message: testMessage_0,
        theme: "success",
      });
    });

    it("should be able to disconnect", () => {
      const disconnectedState = reducer(
        newGlobalState,
        handleConnectionStatus("disconnected", testMessage_0)
      );
      expect(disconnectedState.connected).toBe(false);
    });
  });

  describe("when toggling the sidebar", () => {
    const newGlobalState = reducer(initialGlobalState, toggleSidebar());
    it("should set the sidebarStatus to the opposite of the former", () => {
      expect(newGlobalState.menuVisible).toBe(!initialGlobalState.menuVisible);
    });
  });

  describe("when showing the banner", () => {
    const newGlobalState = reducer(
      initialGlobalState,
      _showBanner(testMessage_0, testTheme)
    );
    it("should set the banner", () => {
      expect(newGlobalState.banner).toEqual({
        message: testMessage_0,
        theme: testTheme,
      });
    });
  });

  describe("when hiding the banner", () => {
    const newGlobalState = reducer(initialGlobalState, _hideBanner());

    it("should set the banner to empty", () => {
      expect(newGlobalState.banner).toEqual({});
    });
  });

  describe("when showing an error", () => {
    const newGlobalState = reducer(initialGlobalState, showError(testError));
    it("should set the banner to error object", () => {
      expect(newGlobalState.banner).toEqual({
        message: testError,
        theme: "error",
      });
    });
  });

  describe("when showing a modal", () => {
    const newGlobalState = reducer(
      initialGlobalState,
      showModal(testModal, testModalParams)
    );
    it("should set the modal and modalParams", () => {
      expect(newGlobalState.modal).toEqual(testModal);
      expect(newGlobalState.modalParams).toEqual(testModalParams);
    });
  });

  describe("when closing  a modal", () => {
    const newGlobalState = reducer(initialGlobalState, closeModal());
    it("should set the modal and modalParams to empty", () => {
      expect(newGlobalState.modal).toEqual("");
      expect(newGlobalState.modalParams).toEqual({});
    });
  });
});

describe("global actions", () => {
  describe("when calling showBanner", () => {
    it("should open and close the banner after HIDE_BANNER_TIMEOUT", () => {
      const store = mockStore(initialGlobalState);
      jest.useFakeTimers();
      store.dispatch(showBanner(testMessage_0, testTheme));
      expect(store.getActions()).toEqual([
        _showBanner(testMessage_0, testTheme),
      ]);
      jest.runTimersToTime(HIDE_BANNER_TIMEOUT);
      expect(store.getActions()).toEqual([
        _showBanner(testMessage_0, testTheme),
        _hideBanner(),
      ]);
    });
  });
});
