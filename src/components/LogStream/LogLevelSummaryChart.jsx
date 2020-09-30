import React from "react";
import { Card } from "react-bootstrap";
import { Store, Dispatcher, Constants } from "../../flux";
import ChartBase from "./ChartBase";

class LogLevelSummaryChart extends React.Component {
  constructor() {
    super();
    this.state = {
      chartData: Store.getLogLevelCharts(),
    };
    Store.on("update-summary-chart", this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-summary-chart", this.getData);
  };

  showLog = (activePoints) => {
    const { chartData } = this.state;
    let index = activePoints[0] && activePoints[0]._index;
    console.log("index:", index);

    if (index && typeof index !== "undefined")
      Dispatcher.dispatch({
        actionType: Constants.SHOW_LOG_AT_INDEX,
        payload: chartData[index].lastLog,
      });
  };

  getData = () => {
    const chartData = Store.getLogLevelCharts();
    this.setState({ chartData });
  };

  render = () => {
    const { chartData } = this.state;
    return (
      <Card className="h-100">
        <Card.Header>Log Occurences by Level</Card.Header>
        <Card.Body className="d-none d-md-block pb-2 pt-0">
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

export default LogLevelSummaryChart;
