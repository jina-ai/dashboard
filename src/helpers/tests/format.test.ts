import {
  getLogLevelCharts,
  parseYAML,
  formatBytes,
  formatSeconds,
  decodePropValue,
  capitalizeFirstLetter,
} from "../format"
import { getLogLevelChartsData, parsedYamlObject } from "./format.testData"
import { flowArguments } from "./flow-chart.testData"
import { v1YAML } from "./flow-chart.testData"

describe("getLogLevelCharts", () => {
  it("should create correct logLevelCharts", () => {
    const {
      logLevelOccurrencesTest,
      MAX_CHART_TICKS_TEST,
      numSecondsTest,
      currentDateTest,
      logLevelChartTest,
    } = getLogLevelChartsData
    const { data, numSeconds, lastTimestamp, numTicks } = getLogLevelCharts(
      numSecondsTest,
      MAX_CHART_TICKS_TEST,
      logLevelOccurrencesTest,
      currentDateTest
    )
    expect(numSeconds).toEqual(numSecondsTest)
    expect(numTicks).toEqual(MAX_CHART_TICKS_TEST)
    expect(lastTimestamp).toEqual(currentDateTest.getTime() / 1000)
    expect(data).toEqual(logLevelChartTest)
  })
})

describe("parseYAML", () => {
  it("should correctly parse YAML with !Flow syntax", () => {
    const result = parseYAML(v1YAML)
    expect(result).toEqual(parsedYamlObject)
  })
})

describe(formatBytes, () => {
  test("converts size less than a KB", () => {
    expect(formatBytes(128)).toEqual("128 Bytes")
  })
  test("converts size greater than a KB", () => {
    expect(formatBytes(128000)).toEqual("125.0 KB")
  })
  test("converts size greater than a MB", () => {
    expect(formatBytes(128 ** 3)).toEqual("2.0 MB")
  })
  test("converts size greater than a MB", () => {
    expect(formatBytes(128 ** 3 + 328466)).toEqual("2.3 MB")
  })
  test("converts size greater than a GB", () => {
    expect(formatBytes(128 ** 5)).toEqual("32.0 GB")
  })
  test("converts size greater than a GB", () => {
    expect(formatBytes(128 ** 5 + 829000000)).toEqual("32.8 GB")
  })
})

describe(formatSeconds, () => {
  test("converts duration less than a minute", () => {
    expect(formatSeconds(54)).toEqual("54s")
  })
  test("converts duration less than an hour", () => {
    expect(formatSeconds(154)).toEqual("2m 34s")
  })
  test("converts duration more than an hour", () => {
    expect(formatSeconds(7291)).toEqual("2h 1m 31s")
  })
  test("converts duration more than a day", () => {
    expect(formatSeconds(86494)).toEqual("24h 1m 34s")
  })
  test("converts duration when minutes and seconds is zero", () => {
    expect(formatSeconds(43200)).toEqual("12h 0m 0s")
  })
  // Edge Cases:
  test("converts duration of zero seconds", () => {
    expect(formatSeconds(0)).toEqual("0s")
  })
  test("converts fractional duration less than one secons", () => {
    expect(formatSeconds(0.25)).toEqual("0s")
  })
  test("converts negative duration", () => {
    expect(formatSeconds(-8)).toEqual("-8s")
  })
})

describe(decodePropValue, () => {
  it("should return a boolean true", () => {
    const result = decodePropValue("read_only", "true", flowArguments.pod)
    expect(result).toEqual(true)
  })
})

describe(capitalizeFirstLetter, () => {
  it("should capitalize the first letter", () => {
    const str = "test"
    const result = capitalizeFirstLetter(str)
    expect(result).toEqual("Test")
  })
})
