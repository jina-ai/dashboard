import { parseDaemonFlowMethodOptions } from "../jinad";
import {
  daemonArgumentsResponse,
  parsedDaemonArgumentResponse,
} from "./jinad.testData";

describe(parseDaemonFlowMethodOptions, () => {
  it("should output correctly formatted arguments", () => {
    const result = parseDaemonFlowMethodOptions(daemonArgumentsResponse);
    expect(result).toEqual(parsedDaemonArgumentResponse);
  });
});
