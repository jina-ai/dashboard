import { getLogLevelCharts } from "../format";
import { getLogLevelChartsData } from "./format.testData";

describe("getLogLevelCharts", () => {
  it("should create correct logLevelCharts", () => {
    const {
      logLevelOccurrencesTest,
      MAX_CHART_TICKS_TEST,
      numSecondsTest,
      currentDateTest,
      logLevelChartTest,
    } = getLogLevelChartsData;
    const { data, numSeconds, lastTimestamp, numTicks } = getLogLevelCharts(
      numSecondsTest,
      MAX_CHART_TICKS_TEST,
      logLevelOccurrencesTest,
      currentDateTest
    );
    expect(numSeconds).toEqual(numSecondsTest);
    expect(numTicks).toEqual(MAX_CHART_TICKS_TEST);
    expect(lastTimestamp).toEqual(currentDateTest.getTime() / 1000);
    expect(data).toEqual(logLevelChartTest);
  });
});
