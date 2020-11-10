import * as React from "react";
import { REACT_FLOW_CHART } from "@bastinjafari/react-flow-chart";
import ChartNode from "./ChartNode";

type Props = {
  label?: string;
  ports: {
    [key: string]: any;
  };
  properties: {
    [key: string]: any;
  };
};

export default function SidebarItem({ label, ports, properties }: Props) {
  const ref: React.RefObject<HTMLInputElement> = React.createRef();
  return (
    <div
      ref={ref}
      className="mb-3 draggable-container"
      draggable={true}
      onDragStart={(event) => {
        event.dataTransfer.setData(
          REACT_FLOW_CHART,
          JSON.stringify({ label, ports, properties })
        );
      }}
    >
      <ChartNode node={{ properties, label }} />
    </div>
  );
}
