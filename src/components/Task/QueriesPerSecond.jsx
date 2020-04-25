import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "shards-react";

import Chart from "chart.js";

class ElapsedCard extends React.Component {
  render() {
    const { qps } = this.props;
    return (
      <Card className="p-3 h-100">
        <h6 className="stats-small__label text-uppercase text-center mb-0"><b>QPS</b></h6>
          <h2 className="my-3 mx-auto">{qps}</h2>
          <h6 className="stats-small__label text-uppercase text-center">Queries/Second</h6>
      </Card>
    );
  }
}

export default ElapsedCard;
