import React from "react";
import { ITooltipComponentDefaultProps } from "@bastinjafari/react-flow-chart-with-tooltips-and-multi-select";

export default function Tooltip(props: ITooltipComponentDefaultProps) {
  return (
    <div className="tooltip-container">
      <img className="tooltip-icon" src="../../icon.png" alt="Tooltip Icon" />
      <span className="tooltip-text">{props.tooltip}</span>
    </div>
  );
}
