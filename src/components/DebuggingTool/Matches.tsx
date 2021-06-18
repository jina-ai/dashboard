import React from "react"
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
} from "react-flow-renderer"
import { useTheme, Theme } from "@emotion/react"
import styled from "@emotion/styled"
import { ChartNode } from "./FlowChartNodes"
import { Doc, Chunk, Match, Score } from "../../views/DebuggingTool"

const nodeTypes = {
  doc: ChartNode,
  chunk: ChartNode,
  match: ChartNode,
}

const VERTICAL_SPACE = 100

type MatchesProps = {
  doc: Doc
  onScoreClick: (score: Score) => void
}

const FlowContainer = styled.div`
  height: 800px;
  background: white;
`

const calculateItemHeight = (data: any) => {
  let height = 50
  if (data.uri) height += 3 * 60
  if (data.text) height += 2 * 40
  return (height += Object.keys(data).length * 50)
}

const calculateMaxItemHeight = (data: any) => {
  const heights = Object.values(data).map((v) => calculateItemHeight(v))
  return Math.max(...heights)
}

export const getEdge = (
  source: string,
  target: string,
  animated: boolean,
  label: string,
  palette: Theme["palette"]
) => {
  return {
    id: `edge-${source}-${target}`,
    source,
    target,
    animated,
    label,
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: palette.info.light,
      color: palette.text.primary,
      fillOpacity: 0.7,
    },
    style: { stroke: palette.primary.main },
  }
}

export const getMatchNodes = (
  matches: Match[],
  parentId: string,
  palette: Theme["palette"],
  startingHeight: number,
  onScoreClick: (score: Score) => void,
  name = "Match"
) => {
  return matches.reduce((acc, match, index) => {
    return [
      ...acc,
      {
        id: match.id,
        type: "match",
        data: {
          name,
          item: match,
          onScoreClick,
          hasBottom: false,
        },
        position: { x: 600 * index, y: startingHeight + VERTICAL_SPACE },
      },
      getEdge(match.id, parentId, true, "match", palette),
    ]
  }, [] as any)
}

export const getChunkNodes = (
  chunks: Chunk[],
  palette: Theme["palette"],
  startingHeight: number,
  onScoreClick: (score: Score) => void,
  name = "Chunk"
) => {
  const tallestChunk = calculateMaxItemHeight(chunks)
  const initialOffset = startingHeight + VERTICAL_SPACE

  const offsets = [tallestChunk]
  chunks.forEach((chunk, index) =>
    offsets.push(
      offsets[index] + VERTICAL_SPACE + calculateMaxItemHeight(chunk.matches)
    )
  )

  console.log("offsets:", offsets)

  const chunkNodesAndEdges = chunks.reduce((acc, chunk, index) => {
    return [
      ...acc,
      {
        id: chunk.id,
        type: "chunk",
        data: {
          name,
          item: chunk,
          onScoreClick,
        },
        position: { x: 600 * index + 50, y: initialOffset },
      },
      getEdge(chunk.id, "1", false, "chunk", palette),
      ...getMatchNodes(
        chunk.matches,
        chunk.id,
        palette,
        initialOffset + offsets[index],
        onScoreClick,
        "Chunk Match"
      ),
    ]
  }, [] as any)
  return chunkNodesAndEdges
}

const Matches = ({ doc, onScoreClick }: MatchesProps) => {
  const { palette } = useTheme()

  const docHeight = calculateItemHeight(doc)
  const chunkOffset = doc?.chunks?.length
    ? calculateMaxItemHeight(doc?.chunks || []) + VERTICAL_SPACE
    : 0
  let matchesOffset = docHeight + chunkOffset

  doc?.chunks?.forEach((chunk) => {
    if (chunk?.matches)
      matchesOffset += calculateMaxItemHeight(chunk.matches) + VERTICAL_SPACE
  })

  const elements = [
    {
      id: "1",
      type: "doc",
      hasTop: false,
      data: {
        name: "Document",
        item: doc,
        onScoreClick,
        hasTop: false,
      },
      position: { x: 100, y: 25 },
    },
    ...getChunkNodes(doc?.chunks || [], palette, docHeight, onScoreClick),
    ...getMatchNodes(
      doc?.matches || [],
      "1",
      palette,
      matchesOffset,
      onScoreClick,
      "Document Match"
    ),
  ]

  return (
    <FlowContainer>
      <ReactFlow elements={elements} nodeTypes={nodeTypes}>
        <Background variant={BackgroundVariant.Dots} gap={20} size={0.8} />
        {/* <MiniMap /> */}
        <Controls />
      </ReactFlow>
    </FlowContainer>
  )
}

export default Matches
