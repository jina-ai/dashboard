import { getChartElements, getEdge } from "../Matches"
import { theme } from "../../../theme"
import { sampleResponse, expectedElements } from "./Matches.testData"

describe("getChartElements", () => {
  const { palette } = theme
  it("generates a flow chart based on a document", () => {
    const elements = getChartElements(
      sampleResponse.data.docs[0],
      palette,
      undefined
    )
    expect(elements).toEqual(expectedElements)
  })
})

describe("getEdge", () => {
  const { palette } = theme
  it("creates an edge object for react-flow", () => {
    expect(getEdge("source", "target", true, "edge", palette)).toEqual({
      animated: true,
      id: "edge-source-target",
      label: "edge",
      labelBgBorderRadius: 4,
      labelBgPadding: [8, 4],
      labelBgStyle: {
        color: palette.text.primary,
        fill: "rgb(51, 173, 173)",
        fillOpacity: 0.7,
      },
      source: "source",
      style: { stroke: palette.primary.main },
      target: "target",
    })
  })
  it("creates a match edge", () => {
    expect(getEdge("source", "target", true, "match", palette)).toEqual({
      animated: true,
      id: "edge-source-target",
      label: "match",
      labelBgBorderRadius: 4,
      labelBgPadding: [8, 4],
      labelBgStyle: {
        color: palette.text.primary,
        fill: "rgb(51, 173, 173)",
        fillOpacity: 0.7,
      },
      source: "source",
      style: { stroke: palette.primary.main },
      target: "target",
    })
  })
})
