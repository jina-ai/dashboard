import React from "react";
import { Badge } from "react-bootstrap";

class ChartNode extends React.Component {
  getPropertiesString = () => {
    const properties = this.props.node.properties || {};
    let str = "";
    Object.keys(properties).map((propId) => {
      str = str.concat(`pod-${propId}-${properties[propId]} `);
    });
    return str;
  };
  getIcons = () => {
    const { properties } = this.props.node;
    let icons = [];
    Object.keys(properties).forEach((prop) => {
      if (prop == "image" && properties[prop])
        icons.push(<span className="fab fa-docker mx-1" />);
      if (prop == "num_part" && properties[prop])
        icons.push(<span className="fas fa-code-branch mx-1" />);
      if (prop == "read_only" && properties[prop])
        icons.push(<span className="fas fa-lock mx-1" />);
      if (prop == "host" && properties[prop])
        icons.push(<span className="fas fa-network-wired mx-1" />);
      if (prop == "separated_workspace" && properties[prop])
        icons.push(<span className="fas fa-columns mx-1" />);
      if (prop == "py_modules" && properties[prop])
        icons.push(<span className="fab fa-python mx-1" />);
    });
    return icons;
  };
  getPropertiesList = () => {
    const { properties } = this.props.node;
    let list = [];
    Object.keys(properties).forEach((prop) => {
      if (properties[prop] && prop !== "name")
        list.push(
          <div>
            <span className="text-bold mr-1">{prop}:</span>
            {properties[prop]}
          </div>
        );
    });
    return list;
  };
  render = () => {
    const { label, properties } = this.props.node;
    const propSTR = this.getPropertiesString();
    const icons = this.getIcons();
    const list = this.getPropertiesList();
    const isSpecial = Object.keys(properties).length > 0;
    const isGateway = label === "gateway";
    let labelText =
      typeof label === "undefined" ? properties.name : label || "";
    return (
      <div className={`chart-node ${isGateway ? "gateway" : ""}`}>
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
  };
}

export default ChartNode;
