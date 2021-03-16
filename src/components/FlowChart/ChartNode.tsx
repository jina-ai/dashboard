import React from "react"
import { Handle, Position } from "react-flow-renderer"
import { showModal } from "../../redux/global/global.actions"
import { useDispatch, useSelector } from "react-redux"
import { selectSelectedFlow } from "../../redux/flows/flows.selectors"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import { FlowNode } from "../../redux/flows/flows.types"

type NodePortProps = {
  type: "source" | "target"
}

function NodePort({ type }: NodePortProps) {
  const theme = useTheme()
  const NodePortTop = styled(Handle)`
    margin-top: -0.2rem;
    background-color: white;
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    border: 1px solid ${theme.palette.primary};
    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
      display: block;

      content: "";
      background-color: #099;
      color: white;
      border-radius: 0.25rem;
      width: 0.5rem;
      height: 0.5rem;
    }
  `

  const NodePortBottom = styled(NodePortTop)`
    bottom: -0.45rem;
  `
  switch (type) {
    case "source":
      return <NodePortBottom type={type} position={Position.Bottom} />
    case "target":
      return <NodePortTop type={type} position={Position.Top} />
  }
}

type SidebarProps = {
  label: string | undefined
}
type ChartNodeProps = FlowNode | SidebarProps

export default function ChartNode(props: ChartNodeProps) {
  const flowType = useSelector(selectSelectedFlow).type
  const dispatch = useDispatch()
  const theme = useTheme()

  const ChartNodeElement = styled.div`
    min-width: 16rem;
    cursor: move;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0.25em;
    transition: 0.2s;
    border: 1px solid ${theme.palette.primary};
  `

  function _isFlowNode(prop: ChartNodeProps): prop is FlowNode {
    return (prop as FlowNode).id !== undefined
  }

  if (_isFlowNode(props)) {
    const node = props
    return (
      <ChartNodeElement
        data-name={`chart-node-${node?.data?.label}`}
        onDoubleClick={() => {
          flowType === "user-generated" &&
            dispatch(showModal("podEdit", { nodeId: node?.id }))
        }}
      >
        {node.id !== "gateway" && <NodePort type="target" />}
        <div id={`chart-node-${node?.data?.label}`}>
          <div className="node-header">
            <div className={`p-1`}>
              <p className="m-1">
                <span className="text-bold">
                  {node?.data?.label || (
                    <span className="text-warning">Empty Pod</span>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>{" "}
        <NodePort type="source" />
      </ChartNodeElement>
    )
  } else
    return (
      <ChartNodeElement id={`chart-node-${props.label}`}>
        <div className="node-header">
          <div className={`p-1`}>
            <p className="m-1">
              <span className="text-bold">
                {props.label || <span className="text-warning">Empty Pod</span>}
              </span>
            </p>
          </div>
        </div>
      </ChartNodeElement>
    )
}
