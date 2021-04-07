import { timeout } from "../utils"

describe("timeout", () => {
  it("should return a promise after supplied ms have elapsed", async () => {
    const TIMEOUT_MS = 1000
    const MARGIN_OF_ERROR = 50

    const t1 = new Date()
    await timeout(TIMEOUT_MS)
    const t2 = new Date()
    const difference = t2.valueOf() - t1.valueOf()
    expect(Math.abs(difference - TIMEOUT_MS)).toBeLessThan(MARGIN_OF_ERROR)
  })
})
