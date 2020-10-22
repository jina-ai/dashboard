import { formatAsYAML, formatSeconds, formatBytes } from "./helpers";
import { flow1 } from "./data/flowTestData";

test("outputs flow chart as valid jina-ai config", () => {
  expect(formatAsYAML(flow1.parsed)).toBe(flow1.yaml);
});

describe(formatSeconds, () => {
  test("converts duration less than a minute", () => {
    expect(formatSeconds(54)).toEqual('54s')
  })
  test("converts duration less than an hour", () => {
    expect(formatSeconds(154)).toEqual('2m 34s')
  })
  test("converts duration more than an hour", () => {
    expect(formatSeconds(7291)).toEqual('2h 1m 31s')
  })
  test("converts duration more than a day", () => {
    expect(formatSeconds(86494)).toEqual('24h 1m 34s')
  })
  test("converts duration when minutes and seconds is zero", () => {
    expect(formatSeconds(43200)).toEqual('12h 0m 0s')
  })
  // Edge Cases:
  test("converts duration of zero seconds", () => {
    expect(formatSeconds(0)).toEqual('0s')
  })
  test("converts fractional duration less than one secons", () => {
    expect(formatSeconds(0.25)).toEqual('0s')
  })
  test("converts negative duration", () => {
    expect(formatSeconds(-8)).toEqual('-8s')
  })
})

describe(formatBytes, () => {
  test("converts size less than a KB", () => {
    expect(formatBytes(128)).toEqual('128 Bytes')
  })
  test("converts size greater than a KB", () => {
    expect(formatBytes(128000)).toEqual('125.0 KB')
  })
  test("converts size greater than a MB", () => {
    expect(formatBytes(128 ** 3)).toEqual('2.0 MB')
  })
  test("converts size greater than a MB", () => {
    expect(formatBytes(128 ** 3 + 328466)).toEqual('2.3 MB')
  })
  test("converts size greater than a GB", () => {
    expect(formatBytes(128 ** 5)).toEqual('32.0 GB')
  })
  test("converts size greater than a GB", () => {
    expect(formatBytes(128 ** 5 + 829000000)).toEqual('32.8 GB')
  })
})