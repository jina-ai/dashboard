import React from "react";
import styled from "@emotion/styled";

export default function NodePort() {
  const NodePortOuter = styled.div`
    background-color: white;
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 153, 153, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.3rem;
  `;

  const NodePortInner = styled.div`
    background-color: #099;
    color: white;
    border-radius: 0.25rem;
    width: 0.5rem;
    height: 0.5rem; ;
  `;
  return (
    <NodePortOuter>
      <NodePortInner />
    </NodePortOuter>
  );
}
