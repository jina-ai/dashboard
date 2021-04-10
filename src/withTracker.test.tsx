import React from "react"
import withTracker from "./withTracker"
import GA from "react-ga"
import { render } from "@testing-library/react"

describe("withTracker test cases", () => {
  const mockTrackerOption1 = () => {
    return ("test" as unknown) as JSX.Element
  }

  const mockTrackerOption2 = {}

  it("should render as a react.component type", () => {
    const target = withTracker(mockTrackerOption1, mockTrackerOption2)
    expect(typeof target).toBe(typeof React.Component)
  })

  it("should init with specified value by default", () => {
    withTracker(mockTrackerOption1, mockTrackerOption2)
    expect(GA.testModeAPI.calls).toEqual([["create", "UA-164627626-1", "auto"]])
  })

  it("should track a page which props contain specified location value", () => {
    const mockLocation = {
      pathname: "/flow",
      search: "?q=indexer",
    }
    const TestPage = withTracker(mockTrackerOption1, mockTrackerOption2)
    render(<TestPage location={mockLocation} />)
    expect(GA.testModeAPI.calls[2]).toEqual([
      "send",
      { hitType: "pageview", page: "/flow?q=indexer" },
    ])
  })
})
