import React from "react";
import { Card, CardHeader, CardBody, Row, Col, ButtonGroup, Button } from "shards-react";
import Chart from "chart.js";

class ProcessReport extends React.Component {
  constructor(props) {
    super(props);
    // this.legendRef = React.createRef();
    this.canvasRef = React.createRef();
    this.state = {
      tab: 'messages',
    }
  }

  componentDidMount() {
    const chartData = this.props[this.state.tab];

    const chartOptions = {
      ...{
        // legend: false,
        // Uncomment the next line in order to disable the animations.
        animation: false,
        tooltips: {
          // enabled: false,
          mode: "index",
          position: "nearest"
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: false
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                userCallback(label) {
                  return label > 999 ? `${(label / 1000).toFixed(0)}k` : label;
                }
              }
            }
          ]
        }
      },
    };

    this.chart = new Chart(this.canvasRef.current, {
      type: "bar",
      options: chartOptions,
      data: {
        labels: chartData.map(d => d.label),
        datasets: [
          {
            label: "msg sent",
            fill: "start",
            data: chartData.map(d => d.sent),
            backgroundColor: "#009999",
            borderColor: "#009999",
            pointBackgroundColor: "#FFFFFF",
            pointHoverBackgroundColor: "#009999",
            borderWidth: 1.5
          },
          {
            label: "msg received",
            fill: "start",
            data: chartData.map(d => d.received),
            backgroundColor: "#32C8CD",
            borderColor: "#32C8CD",
            pointBackgroundColor: "#FFFFFF",
            pointHoverBackgroundColor: "#32C8CD",
            borderWidth: 1.5
          }
        ]
      }
    });
  }

  updateChart = () => {
    const { tab } = this.state;
    const chartData = this.props[tab];
    this.chart.data = {
      labels: chartData.map(d => d.label),
      datasets: [
        {
          label: `${tab} sent`,
          fill: "start",
          data: chartData.map(d => d.sent),
          backgroundColor: "#009999",
          borderColor: "#009999",
          pointBackgroundColor: "#FFFFFF",
          pointHoverBackgroundColor: "#009999",
          borderWidth: 1.5
        },
        {
          label: `${tab} received`,
          fill: "start",
          data: chartData.map(d => d.received),
          backgroundColor: "#32C8CD",
          borderColor: "#32C8CD",
          pointBackgroundColor: "#FFFFFF",
          pointHoverBackgroundColor: "#32C8CD",
          borderWidth: 1.5
        }
      ]
    }
    this.chart.update()
  }

  setTab = (tab) => {
    this.setState({ tab });
  }

  render() {
    const { tab } = this.state;
    if (this.chart)
      this.updateChart()
    return (
      <Card small className="h-100 mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Process Report</h6>
        </CardHeader>

        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="col d-flex mb-2 mb-sm-0">
              <ButtonGroup>
                <Button theme="white" active={tab === 'messages'} onClick={() => this.setTab('messages')}>Messages</Button>
                <Button theme="white" active={tab === 'bytes'} onClick={() => this.setTab('bytes')}>Bytes</Button>
              </ButtonGroup>
            </Col>
          </Row>
          {/* <div ref={this.legendRef} /> */}
          <canvas
            height="100"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
            className="sales-overview-sales-report"
          />
        </CardBody>
      </Card>
    );
  }
}

export default ProcessReport;
