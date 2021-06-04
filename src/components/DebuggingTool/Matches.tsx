import React from 'react';
import ReactFlow, {Background, BackgroundVariant} from 'react-flow-renderer';
import {useTheme} from '@emotion/react'
import {InputNode, ChunkNode, MatchNode} from './FlowChartNodes'

const nodeTypes = {
    inputDocument: InputNode,
    chunk: ChunkNode,
    match: MatchNode,
}

type MatchesProps = {
    matches: any
}

const Matches = ({ matches }: MatchesProps) => {
    const {palette} = useTheme()
    const elements = [
        {
            id: '1',
            type: 'inputDocument',
            data: { id: matches.id, text: matches.text },
            position: { x: 50, y: 25 },
        },
        ...(
            matches.chunks.map((chunk: any, index: number) => ({
                id: chunk.id,
                type: 'chunk',
                data: { id: chunk.id, mimeType: chunk.mime_type, text: chunk.text, granularity: chunk.granularity, parentId: chunk.parent_id },
                position: { x: (450 * index + 50), y: 250 }
            }))
        ),
        ...(
            matches.matches.map((match: any, index: number) => ({
                id: match.id,
                type: 'match',
                data: {
                    id: match.id,
                    mimeType: match.mime_type,
                    text: match.text,
                    adjacency: match.adjacency,
                },
                position: { x: (450 * index ), y: 550 }
            }))
        ),
        ...(
            matches.chunks.map((chunk: any, index: number) => ({
                id: `e1-${chunk.id}`,
                source: '1',
                target: chunk.id,
                label: 'chunk',
                labelBgPadding: [8, 4],
                labelBgBorderRadius: 4,
                labelBgStyle: { fill: palette.info.light, color: palette.text.primary, fillOpacity: 0.7 },
                style: { stroke: palette.primary.main },
            }))),
        ...(
            matches.matches.map((chunk: any, index: number) => ({
                id: `e1-${chunk.id}`,
                source: '1',
                target: chunk.id ,
                animated: true,
                label: 'match',
                labelBgPadding: [8, 4],
                labelBgBorderRadius: 4,
                labelBgStyle: { fill: palette.info.light, color: palette.text.primary, fillOpacity: 0.7 },
                style: { stroke: palette.success.main },
            }))),
    ];


    return (
        <div style={{ height: 800 }}>
            <ReactFlow elements={elements} nodeTypes={nodeTypes} >
                <Background variant={BackgroundVariant.Dots} gap={20} size={0.8} />
                </ReactFlow>
        </div>
    )
}

export default Matches