import React from "react";
import { Card } from "react-bootstrap";
import { Store } from "../../flux";
import PieChart from "./PieChart";

class LogLevelPieChart extends React.Component {
  constructor() {
    super();
    this.state = {
      chartData: Store.getLogLevelOccurences(),
    };
    Store.on("update-summary-chart", this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-summary-chart", this.getData);
  };

  getData = () => {
    const chartData = Store.getLogLevelOccurences();
    this.setState({ chartData });
  };

  render = () => {
    const { chartData } = this.state;
    return (
      <Card className="h-100">
        <Card.Body>
          <PieChart data={chartData} />
        </Card.Body>
      </Card>
    );
  };
}

export default LogLevelPieChart;
