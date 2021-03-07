import reducer from "./task.reducer";
import {
  testExpectedTaskState,
  testProcesses,
  testTaskEvent,
  testTaskState,
  TIME_LAST_UPDATE_CHART,
} from "./task.testData";
import { handleNewTaskEvent } from "./task.actions";
import MockDate from "mockdate";

describe("task reducer", () => {
  describe("when handling a new task event", () => {
    MockDate.set(TIME_LAST_UPDATE_CHART);
    const newTaskState = reducer(
      testTaskState,
      handleNewTaskEvent(testTaskEvent, testProcesses)
    );
    it("should match expected task state", () => {
      expect(newTaskState).toEqual(testExpectedTaskState);
    });
  });
});
