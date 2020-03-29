import React from "react";

class ChartNode extends React.Component {
  render = () => {
    const {id} = this.props.node;
    return (
      <div className="chart-node">
        {id}
      </div>
    )
  }
}

export default ChartNode;
