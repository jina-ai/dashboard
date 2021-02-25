import React from "react"
import { Handle, Node } from "react-flow-renderer"
import Pod from "./Pod"
import { showModal } from "../../redux/global/global.actions"
import { useDispatch, useSelector } from "react-redux"
import { selectSelectedFlow } from "../../redux/flows/flows.selectors"
import { NodePortBottom, NodePortTop } from "./NodePort"
import styled from "@emotion/styled"

export const ChartNodeElement = styled.div`
  min-width: 16rem;
  cursor: move;
  text-align: center;
  font-size: 14px;
  background: #fff;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0.25em;
  transition: 0.2s;
  border: 1px solid rgba(0, 153, 153, 0.3);
`

type NodeType = "Pod" | "Gateway"
export default function ChartNode(type: NodeType) {
  switch (type) {
    case "Pod":
      return function ChartNode({ id, data }: Node) {
        const type = useSelector(selectSelectedFlow).type
        const dispatch = useDispatch()
        return (
          <ChartNodeElement
            onDoubleClick={() => {
              type === "user-generated" &&
                dispatch(showModal("podEdit", { nodeId: id }))
            }}
          >
            <Handle type="target" position="top">
              <NodePortTop />
            </Handle>
            <Pod label={data.label} />
            <Handle type="source" position="bottom" id="b">
              <NodePortBottom />
            </Handle>
          </ChartNodeElement>
        )
      }
    case "Gateway":
      return function ChartNode({ id, data }: Node) {
        const type = useSelector(selectSelectedFlow).type
        const dispatch = useDispatch()
        return (
          <ChartNodeElement
            onDoubleClick={() => {
              type === "user-generated" &&
                dispatch(showModal("podEdit", { nodeId: id }))
            }}
          >
            <Pod label={data.label} />
            <Handle type="source" position="bottom" id="b">
              <NodePortBottom />
            </Handle>
          </ChartNodeElement>
        )
      }
  }
}
