import * as React from "react";
import { REACT_FLOW_CHART } from "@mrblenny/react-flow-chart";
import ChartNode from "./ChartNode";

export default function SidebarItem(props) {
  const { label, ports, properties } = props;
  const ref = React.createRef();
  return (
    <div
      ref={ref}
      className="mb-3 draggable-container"
      draggable={true}
      onDragStart={(event) => {
        event.dataTransfer.setData(
          REACT_FLOW_CHART,
          JSON.stringify({ label, ports, properties, type: "hello world" })
        );
      }}
    >
      <ChartNode node={{ properties }} />
    </div>
  );
}
