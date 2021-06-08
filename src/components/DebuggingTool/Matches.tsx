import React from "react"
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "react-flow-renderer"
import { useTheme } from "@emotion/react"
import { InputNode, ChunkNode, MatchNode } from "./FlowChartNodes"
import { Score } from "./Scores"

const nodeTypes = {
  inputDocument: InputNode,
  chunk: ChunkNode,
  match: MatchNode,
}
export type Match = {
  id: string
  mime_type: string
  text: string
  granularity: number
  score: Score
  op_name?: string
  description?: string
  ref_id?: string
  adjacency: number
  uri?: string
}
export type Chunk = {
  id: string
  matches: Match[]
  mime_type: string
  text: string
  granularity: number
  parent_id: string
  content_hash: string
  uri?: string
}
export type Doc = {
  id: string
  text: string
  tags: any
  chunks: Chunk[]
  matches: Match[]
  mime_type?: string
  uri?: string
}
type MatchesProps = {
  doc: Doc
  onMatchSelection: (score: Score) => void
}

export const getEdge = (
  source: string,
  target: string,
  animated: boolean,
  label: string,
  palette: any
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
  palette: any,
  yOffset = 0
) => {
  return matches.reduce((acc, match, index) => {
    return [
      ...acc,
      {
        id: match.id,
        type: "match",
        data: {
          id: match.id,
          mimeType: match.mime_type,
          text: match.text,
          adjacency: match.adjacency,
          score: match.score,
        },
        position: { x: 450 * index, y: 200 * (1 + yOffset) + 200 },
      },
      getEdge(match.id, parentId, true, "match", palette),
    ]
  }, [] as any)
}

export const getChunkNodes = (chunks: Chunk[], palette: any) => {
  const chunkNodesAndEdges = chunks.reduce((acc, chunk, index) => {
    return [
      ...acc,
      {
        id: chunk.id,
        type: "chunk",
        data: {
          id: chunk.id,
          mimeType: chunk.mime_type,
          text: chunk.text,
          granularity: chunk.granularity,
          parentId: chunk.parent_id,
        },
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
      data: {
        id: doc.id,
        text: doc.text,
        mime_type: doc.mime_type,
        uri: doc.uri,
      },
      position: { x: 50, y: 25 },
    },
    ...getChunkNodes(doc.chunks, palette),
    ...getMatchNodes(doc.matches, "1", palette),
  ]

  return (
    <div style={{ height: 800 }}>
      <ReactFlow
        elements={elements}
        nodeTypes={nodeTypes}
        onElementClick={onElementClick}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={0.8} />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Matches
