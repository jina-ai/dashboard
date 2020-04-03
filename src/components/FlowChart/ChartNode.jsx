import React from "react";
import {Badge} from "react-bootstrap";

class ChartNode extends React.Component {
  render = () => {
    const {label,type,properties} = this.props.node;
    return (
      <div className="chart-node">
        <p className="m-1"><b>{label||<span className="text-warning">Unnamed Pod</span>}</b><Badge variant="primary" className="ml-2 mt-1">{properties.replicas}</Badge></p>
      </div>
    )
  }
}

export default ChartNode;
