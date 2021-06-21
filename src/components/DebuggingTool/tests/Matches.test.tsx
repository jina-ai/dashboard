import { getChunkNodes, getEdge } from "../Matches"
import { theme } from "../../../theme"
import { inputChunks, expectedNodesAndEdges } from "./Matches.testData"

describe("getChunkNodes", () => {
  const { palette } = theme
  it("gets node and edge data for chunks", () => {
    expect(getChunkNodes(inputChunks, palette, 0, undefined)).toEqual(
      expectedNodesAndEdges
    )
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
