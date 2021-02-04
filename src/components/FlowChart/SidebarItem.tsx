import * as React from "react";
import { REACT_FLOW_CHART } from "@bastinjafari/react-flow-chart-with-tooltips-and-multi-select";
import ChartNode from "./ChartNode";

type Props = {
  label?: string;
  ports: {
    [key: string]: any;
  };
  properties: {
    [key: string]: any;
  };
  idx: number;
};

export default function SidebarItem({ label, ports, properties, idx }: Props) {
  const ref: React.RefObject<HTMLInputElement> = React.createRef();
  return (
    <div
      data-name={`SideBarItem-${idx}`}
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
