import { newVersionLocalStorageReset, timeout } from "../utils"

describe("timeout", () => {
  it("should return a promise after supplied ms have elapsed", async () => {
    const TIMEOUT_MS = 1000
    const MARGIN_OF_ERROR = 10

    const t1 = new Date()
    await timeout(TIMEOUT_MS)
    const t2 = new Date()
    const difference = t2.valueOf() - t1.valueOf()
    expect(Math.abs(difference - TIMEOUT_MS)).toBeLessThan(MARGIN_OF_ERROR)
  })
})

describe("newVersionLocalStorageReset", () => {
  it("should reset storage if it has an older version in it", () => {
    localStorage.setItem("testItemKey", "testItemValue")
    expect(localStorage.getItem("testItemKey")).toBe("testItemValue")
    newVersionLocalStorageReset("1.1.1", "1.0.12")
    expect(localStorage.key(0)).toBe(null)
  })
})
