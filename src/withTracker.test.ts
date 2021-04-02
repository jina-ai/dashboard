import React from "react"
import withTracker from "./withTracker"
import GA from "react-ga"

describe("withTracker", () => {
  const mockTrackerOption1 = () => {
    return ("test" as unknown) as JSX.Element
  }
  const mockTrackerOption2 = {}

  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV } // Make a copy
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  it("should render a react.component type", () => {
    const res = withTracker(mockTrackerOption1, mockTrackerOption2)
    expect(typeof res).toBe(typeof React.Component)
  })

  it("should create specified value if REACT_APP_GAID is NOT set", () => {
    process.env.REACT_APP_GAID = "my-test-gaid"
    withTracker(mockTrackerOption1, mockTrackerOption2)
    expect(GA.testModeAPI.calls).toEqual([["create", "UA-164627626-1", "auto"]])
  })
})
