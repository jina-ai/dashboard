import React from "react";
import {Badge} from "react-bootstrap";

class ChartNode extends React.Component {
  render = () => {
    const {label,properties} = this.props.node;
    return (
      <div className="chart-node">
        <p><b>{label}</b><Badge variant="primary" className="float-right mt-1">{properties.replicas}</Badge></p>
      </div>
    )
  }
}

export default ChartNode;
