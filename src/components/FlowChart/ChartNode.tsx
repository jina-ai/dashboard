import React from "react";
import { Badge } from "react-bootstrap";

type Props = {
  node: {
    properties: any;
    label: string | undefined;
  };
};

export default function ChartNode({ node }: Props) {
  const { properties, label } = node;
  const list: any = [];
  Object.keys(properties).forEach((prop, idx) => {
    if (properties[prop] && prop !== "name")
      list.push(
        <div key={idx}>
          <span className="text-bold mr-1">{prop}:</span>
          {properties[prop]}
        </div>
      );
  });
  const isSpecial = Object.keys(properties).length > 0;
  const isGateway = label === "gateway";
  let labelText = typeof label === "undefined" ? properties.name : label || "";
  return (
    <div
      className={`chart-node ${isGateway ? "gateway" : ""}`}
      id={`chart-node-${label}`}
    >
      <div className="node-header">
        <div className={`p-1 ${isSpecial ? "special" : ""}`}>
          <p className="m-1">
            <span className="text-bold">
              {labelText || <span className="text-warning">Empty Pod</span>}
            </span>
            <Badge variant="primary" className="ml-2 mt-1 py-1 px-2">
              {properties.replicas}
            </Badge>
          </p>
        </div>
      </div>
      {list.length > 0 && (
        <div className="node-info border-top px-2">{list}</div>
      )}
    </div>
  );
}
