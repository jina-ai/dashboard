import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Store, Dispatcher, Constants } from "../../flux";
import ChartBase from "./ChartBase";

class SummaryChart extends React.Component {
  state = {
    chartData: Store.getSummaryCharts(),
  };
  componentWillMount = () => {
    Store.on("update-summary-chart", this.getData);
  };

  componentWillUnmount = () => {
    Store.removeListener("update-summary-chart", this.getData);
  };

  showLog = (activePoints) => {
    let index = activePoints[0] && activePoints[0]._index;
    if (index && typeof index !== "undefined");
    Dispatcher.dispatch({
      actionType: Constants.SHOW_LOG_AT_INDEX,
      payload: index,
    });
  };

  getData = () => {
    const chartData = Store.getSummaryCharts();
    this.setState({ chartData });
  };

  render = () => {
    const { chartData } = this.state;
    return (
      <Card className="h-100">
        <Card.Body className="d-none d-md-block pb-2">
          <ChartBase
            data={chartData}
            height={10}
            width={70}
            onClick={this.showLog}
          />
        </Card.Body>
        <Card.Body className="d-md-none pb-2">
          <ChartBase
            data={chartData}
            height={20}
            width={50}
            onClick={this.showLog}
          />
        </Card.Body>
      </Card>
    );
  };
}

export default SummaryChart;
