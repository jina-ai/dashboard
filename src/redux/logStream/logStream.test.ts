import reducer from "./logStream.reducer";
import { handleNewLog } from "./logStream.actions";
import {
  testLogStreamState1,
  testLogStreamState2,
  testMessage,
} from "./logStream.testData";
import nanoid from "nanoid";
jest.mock("nanoid");

describe("logStream reducer", () => {
  let idCount = 1;

  beforeEach(() => {
    nanoid.nanoid.mockImplementation(() => {
      const currentIdCount = idCount;
      idCount++;
      return `testId_${currentIdCount}`;
    });
  });

  it("should handle a new log correctly", () => {
    const newLogStreamState = reducer(
      testLogStreamState1,
      handleNewLog(testMessage)
    );
    expect(newLogStreamState).toEqual(testLogStreamState2);
  });
});
