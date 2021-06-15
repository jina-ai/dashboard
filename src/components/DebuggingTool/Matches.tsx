import React from "react"
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
} from "react-flow-renderer"
import { useTheme, Theme } from "@emotion/react"
import styled from "@emotion/styled"
import { InputNode, ChunkNode, MatchNode } from "./FlowChartNodes"
import { Doc, Chunk, Match, Score } from "../../views/DebuggingTool"

const nodeTypes = {
  inputDocument: InputNode,
  chunk: ChunkNode,
  match: MatchNode,
}

type MatchesProps = {
  doc: Doc
  onMatchSelection: (score: Score) => void
}

const FlowContainer = styled.div`
  height: 800px;
  background: white;
`

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
  yOffset = 0
) => {
  return matches.reduce((acc, match, index) => {
    return [
      ...acc,
      {
        id: match.id,
        type: "match",
        data: match,
        position: { x: 450 * index, y: 200 * (1 + yOffset) + 200 },
      },
      getEdge(match.id, parentId, true, "match", palette),
    ]
  }, [] as any)
}

export const getChunkNodes = (chunks: Chunk[], palette: Theme["palette"]) => {
  const chunkNodesAndEdges = chunks.reduce((acc, chunk, index) => {
    return [
      ...acc,
      {
        id: chunk.id,
        type: "chunk",
        data: chunk,
        position: { x: 450 * index + 50, y: 200 },
      },
      getEdge(chunk.id, "1", false, "chunk", palette),
      ...getMatchNodes(chunk.matches, chunk.id, palette, index + 1),
    ]
  }, [] as any)
  return chunkNodesAndEdges
}

const Matches = ({ doc, onMatchSelection }: MatchesProps) => {
  const onElementClick = (event: any, element: any) => {
    if (element.data.score) {
      onMatchSelection(element.data.score)
    }
  }
  const { palette } = useTheme()
  const elements = [
    {
      id: "1",
      type: "inputDocument",
      data: doc,
      position: { x: 50, y: 25 },
    },
    ...getChunkNodes(doc?.chunks || [], palette),
    ...getMatchNodes(doc?.matches || [], "1", palette),
  ]

  return (
    <FlowContainer>
      <ReactFlow
        elements={elements}
        nodeTypes={nodeTypes}
        onElementClick={onElementClick}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={0.8} />
        {/* <MiniMap /> */}
        <Controls />
      </ReactFlow>
    </FlowContainer>
  )
}

export default Matches
