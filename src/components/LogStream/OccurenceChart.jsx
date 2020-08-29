import React from "react";
import { Card } from "react-bootstrap";
import { Store } from "../../flux";
import ChartBase from "./PieChart";

class OccurenceChart extends React.Component {
  constructor() {
    super();
    this.state = {
      chartData: Store.getOccurencesByName(),
    };
    Store.on("update-summary-chart", this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-summary-chart", this.getData);
  };

  getData = () => {
    const chartData = Store.getOccurencesByName();
    this.setState({ chartData });
  };

  render = () => {
    const { chartData } = this.state;
    return (
      <Card className="h-100">
        <Card.Body>
          <ChartBase data={chartData} />
        </Card.Body>
      </Card>
    );
  };
}

export default OccurenceChart;
