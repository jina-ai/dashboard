import React from "react";
import { Card, CardHeader, CardBody, Row, Col, ButtonGroup, Button } from "shards-react";
import { formatBytes } from '../../helpers';
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

  componentDidUpdate = (prevProps) => {
    if (this.props.lastUpdate != prevProps.lastUpdate)
      this.updateChart();
  }

  componentDidMount = () => {
    const { tab } = this.state;
    const chartData = this.props[tab];

    const chartOptions = {
      ...{
        // legend: false,
        // Uncomment the next line in order to disable the animations.
        animation: false,
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              return `Pod: ${tooltipItem[0].xLabel}`;
            },
            label: function (tooltipItem, data) {
              let label = `${data.datasets[tooltipItem.datasetIndex].label}: ${tab === 'bytes' ? tooltipItem.value : formatBytes(tooltipItem.value)}`
              return label;
            },
            afterLabel: (tooltipItem, data) => {
              const chartData = this.props[tab]
              let text = '\nProcess Id: ' + chartData[tooltipItem.index].process
              return text;
            }
          },
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
                userCallback:this.formatYAxisLabel
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
        labels: chartData.map(d => d.node),
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
      labels: chartData.map(d => d.node),
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

  formatYAxisLabel = (label) => {
    const {tab} = this.state;
    return tab === 'bytes' ?
      formatBytes(label)
      :
      label > 999 ? `${(label / 1000).toFixed(0)}k` : label;
  }

  setTab = (tab) => {
    this.setState({ tab }, this.updateChart);
  }

  render() {
    const { tab } = this.state;
    return (
      <Card small className="h-100 mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Network Load</h6>
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
