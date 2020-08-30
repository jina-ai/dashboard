import React from "react";
import { Card } from "shards-react";

import Chart from "chart.js";

class SpeedCard extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const { history } = this.props.speed;
    let maxValue = Math.max(...history);
    let minValue = Math.min(...history);

    let difference = maxValue - minValue;
    const chartOptions = {
      ...{
        maintainAspectRatio: true,
        responsive: true,
        animation: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
          custom: false,
        },
        elements: {
          point: {
            radius: 0,
          },
          line: {
            tension: 0.33,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: false,
              scaleLabel: false,
              ticks: {
                display: false,
                // Avoid getting the graph line cut of at the top of the canvas.
                // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
                suggestedMax: maxValue + difference * 0.1,
                suggestedMin: minValue - difference * 0.1,
              },
            },
          ],
        },
      },
      ...this.props.chartOptions,
    };

    const chartConfig = {
      ...{
        type: "line",
        data: {
          ...{
            labels: new Array(history.length).fill(null),
          },
          ...{
            datasets: [
              {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(0, 153, 153, 0.25)",
                borderColor: "#009999",
                data: history,
              },
            ],
          },
        },
        options: chartOptions,
      },
      ...this.props.chartConfig,
    };

    this.chart = new Chart(this.canvasRef.current, chartConfig);
  }

  updateChart = () => {
    const { history } = this.props.speed;
    let newChartData = {
      ...this.chart.data,
      ...{
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 153, 153, 0.25)",
            borderColor: "#009999",
            data: history,
          },
        ],
      },
    };
    let maxValue = Math.max(...history);
    let minValue = Math.min(...history);

    let difference = maxValue - minValue;

    this.chart.options.scales.yAxes[0].ticks.suggestedMax =
      maxValue + difference * 0.1;
    this.chart.options.scales.yAxes[0].ticks.suggestedMin =
      minValue - difference * 0.1;
    this.chart.data = newChartData;
    this.chart.update();
  };

  render() {
    const { speed } = this.props;
    if (this.chart) this.updateChart();
    return (
      <Card className="pt-0 h-100 stats-small">
        <div className="stats-small__data mx-auto">
          <h6 className="stats-small__label text-uppercase text-center mb-0 pt-0 mt-0">
            <b>Speed</b>
          </h6>
          <h2 className="my-3 mx-auto">{speed.current}</h2>
          <h6 className="stats-small__label under text-uppercase text-center">
            {speed.unit}/Second
          </h6>
        </div>
        <canvas height="100" ref={this.canvasRef} className={`stats-small-1`} />
      </Card>
    );
  }
}

SpeedCard.defaultProps = {
  label: "New Customers",
  value: "29",
  percentage: "2.71%",
  increase: false,
  decrease: true,
  chartLabels: [null, null, null, null, null, null, null],
  chartData: [
    {
      label: "Today",
      fill: "start",
      borderWidth: 1.5,
      backgroundColor: "rgba(0, 153, 153, 0.25)",
      borderColor: "#009999",
      data: [1, 7, 1, 3, 1, 4, 8],
    },
  ],
};

export default SpeedCard;
