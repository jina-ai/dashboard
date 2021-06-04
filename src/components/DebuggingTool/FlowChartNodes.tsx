import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Card from '@material-ui/core/Card'
import styled from "@emotion/styled"
import {useTheme} from "@emotion/react"

const NodeContainer = styled(Card)`
    padding: 1rem;
`
const NodeTitle = styled.p`
    font-size: 1rem;
    font-weight: 500;
    margin: 0.25rem;
    text-align: center;
`
const NodeTextContainer = styled.div`
    display: flex;
    justify-content: space-around;
`
const NodeText = styled.span`

`

export const InputNode = ({ data }: { id: string, data: any }) => {
    const {palette} = useTheme()
    const InputNodeContainer = styled(NodeContainer)`
        background-color: ${palette.filters[1].main};
        color: ${palette.filters[1].contrastText};
    `
    return (
        <>
            <InputNodeContainer>
            <NodeTitle>Id: {data?.id}</NodeTitle>
            <NodeTextContainer>
            <NodeText>{data?.text}</NodeText>
            </NodeTextContainer>
            </InputNodeContainer>
            <Handle type="target" position={Position.Bottom}></Handle>
        </>
    )
}

export const ChunkNode = ({ data }: { id: string, data: any }) => {
    const {palette} = useTheme()
    const MatchNodeContainer = styled(NodeContainer)`
        background-color: ${palette.background.default};
        color: ${palette.text.primary};
    `
    return (
        <>
            <Handle type="source" position={Position.Top}></Handle>
            <NodeContainer>
                <NodeTitle>Id: {data?.id}</NodeTitle>
                <NodeTextContainer>
                <NodeText>{data?.text}</NodeText>
                <NodeText>{data.mimeType} </NodeText>
                <NodeText>Granularity: {data.granularity} </NodeText>
                </NodeTextContainer>
                <NodeTitle>ParentId: {data.parentId} </NodeTitle>
            </NodeContainer>
            <Handle type="target" position={Position.Bottom}></Handle>
        </>
    )
}

export const MatchNode = ({ data }: { id: string, data: any }) => {
    const {palette} = useTheme()
    const MatchNodeContainer = styled(NodeContainer)`
        background-color: ${palette.filters[2].main};
        color: ${palette.filters[2].contrastText};
    `
    return (
        <>
            <Handle type="source" position={Position.Top}></Handle>
            <MatchNodeContainer>
                <NodeTitle>Id: {data?.id}</NodeTitle>
                <NodeTextContainer>
                <NodeText>{data?.text}</NodeText>
                <NodeText>{data.mimeType} </NodeText>
                <NodeText>Adjacency: {data.adjacency} </NodeText>
                </NodeTextContainer>
            </MatchNodeContainer>
            <Handle type="target" position={Position.Bottom}></Handle>
        </>
    )
}
