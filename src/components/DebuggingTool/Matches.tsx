import React, { useEffect, useState } from "react"
import ReactFlow, { Controls } from "react-flow-renderer"
import { useTheme, Theme } from "@emotion/react"
import { ChartNode } from "./FlowChartNodes"
import { Doc, Chunk, Match, Score } from "../../views/DebuggingTool"

const nodeTypes = {
  doc: ChartNode,
  chunk: ChartNode,
  match: ChartNode,
}

const ITEM_HEIGHT = 500

const ITEM_WIDTH = 500
const HORIZONTAL_SPACE = 200

type MatchesProps = {
  doc: Doc
  height: number
  onScoreClick: (score: Score) => void
}

const calculateItemHeight = (data: any) => {
  let height = 50
  if (data.uri) height += 5 * 60
  if (data.text) height += 2 * 40
  const numValidKeys = Object.values(data).reduce((acc: number, curr) => {
    if (
      curr !== 0 &&
      curr !== "unset" &&
      curr !== null &&
      curr !== "" &&
      curr !== {}
    )
      return acc + 1
    return acc
  }, 0)
  return (height += numValidKeys * 50)
}

const calculateMaxItemHeight = (data: any) => {
  const heights = Object.values(data || {}).map((v) => calculateItemHeight(v))
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
  startingIndex: number,
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
          hasOutput: false,
        },
        position: {
          x: (ITEM_WIDTH + HORIZONTAL_SPACE) * Math.floor(index % 6) ,
          y: Math.floor(index / 6) * ITEM_HEIGHT,
        },
      },
      getEdge(match.id, parentId, false, "match", palette),
    ]
  }, [] as any)
}

export const getChunkNodes = (
  chunks: Chunk[],
  palette: Theme["palette"],
  startingIndex: number,
  onScoreClick: (score: Score) => void,
  name = "Chunk"
) => {
  const tallestChunk = calculateMaxItemHeight(chunks)

  return chunks.reduce((acc, chunk, index) => {
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
        position: {
          x: (ITEM_WIDTH + HORIZONTAL_SPACE) * startingIndex,
          y: index * tallestChunk,
        },
      },
      getEdge(chunk.id, "1", false, "chunk", palette),
      ...(chunk.matches
        ? getMatchNodes(
            chunk.matches,
            chunk.id,
            palette,
            startingIndex + index + 1,
            onScoreClick,
            "Chunk Match"
          )
        : []),
    ]
  }, [] as any)
}

export const getChartElements = (
  doc: MatchesProps["doc"],
  palette: Theme["palette"],
  onScoreClick: MatchesProps["onScoreClick"]
) => {
  let docMatchesIndex = 1

  if (doc.chunks?.length) docMatchesIndex++
  doc?.chunks?.forEach((chunk) => {
    if (chunk?.matches) docMatchesIndex++
  })

  let yOffset = 0

  if (doc?.chunks?.length) {
    const tallestChunk = calculateMaxItemHeight(doc.chunks)
    const docHeight = calculateItemHeight(doc)
    yOffset = (tallestChunk * doc.chunks.length) / 2 - docHeight / 2
  }

  const elements = [
    {
      id: "1",
      type: "doc",
      data: {
        name: "Document",
        item: doc,
        onScoreClick,
        hasInput: false,
      },
      position: { x: 0, y: yOffset },
    },
    ...(doc.chunks ? getChunkNodes(doc.chunks, palette, 1, onScoreClick) : []),
    ...(doc.matches
      ? getMatchNodes(
          doc.matches,
          "1",
          palette,
          docMatchesIndex,
          onScoreClick,
          "Document Match"
        )
      : []),
  ]
  return elements
}

const Matches = ({ doc, onScoreClick, height }: MatchesProps) => {
  const { palette } = useTheme()
  const [elements, setElements] = useState<any[]>([])

  useEffect(() => {
    const newElements = getChartElements(doc, palette, onScoreClick)
    setElements(newElements)
  }, [doc, palette, onScoreClick])

  return (
    <div style={{ height, background: "white" }}>
      <ReactFlow
        elements={elements}
        nodeTypes={nodeTypes}
        minZoom={0.2}
        defaultZoom={0.25}
        defaultPosition={[10, 10]}
      >
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Matches
