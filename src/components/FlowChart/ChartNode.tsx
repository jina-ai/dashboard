import React from "react";

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

  let labelText = typeof label === "undefined" ? properties.name : label || "";
  return (
    <div className={`chart-node`} id={`chart-node-${label}`}>
      <div className="node-header">
        <div className={`p-1 ${isSpecial ? "special" : ""}`}>
          <p className="m-1">
            <span className="text-bold">
              {labelText || <span className="text-warning">Empty Pod</span>}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
