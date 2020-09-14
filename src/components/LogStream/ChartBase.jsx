import React from "react";
import ChartElement from "chart.js";

const _levels = {
  INFO: {
    borderColor: "#009999",
    backgroundColor: "rgba(0, 153, 153, 0.9)",
  },
  SUCCESS: {
    borderColor: "#32c8cd",
    backgroundColor: "rgba(50, 200, 205, 0.9)",
  },
  WARNING: {
    borderColor: "#ffcc66",
    backgroundColor: "rgba(255, 204, 102, 0.9)",
  },
  ERROR: {
    borderColor: "#ff6666",
    backgroundColor: "rgba(255, 102, 102, 0.9)",
  },
  CRITICAL: {
    borderColor: "#ff4540",
    backgroundColor: "rgba(255, 70, 64, 0.9)",
  },
  DEBUG: {
    borderColor: "#6E7278",
    backgroundColor: "rgba(110, 114, 120, 0.9)",
  },
};

class ChartBase extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount = () => {
    this.renderChart();
  };

  renderChart = () => {
    const chartOptions = {
      events: ["click"],
      onClick: this.onClick,
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        position: "bottom",
        labels: {
          padding: 10,
          boxWidth: 20,
        },
      },
      tooltips: {
        enabled: false,
        custom: false,
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: false,
            color: "red",
            ticks: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              borderDash: [2.5, 5],
              zeroLineColor: "#6c757d",
              drawBorder: false,
              color: "#6c757d",
            },
            ticks: {
              padding: 5,
              suggestedMin: 0,
            },
          },
        ],
      },
    };

    const chartConfig = {
      onClick: this.onClick,
      type: "line",
      labels: this.getLabels(60),
      data: {
        datasets: this.getParsedDatasets(),
      },
      options: chartOptions,
      ...this.props.chartConfig,
    };

    this.chart = new ChartElement(this.canvasRef.current, chartConfig);
  };

  updateChart = () => {
    const chartData = {
      labels: this.getLabels(60),
      datasets: this.getParsedDatasets(),
    };
    this.chart.data = chartData;
    this.chart.options.animation = false;
    this.chart.update();
  };

  onClick = (e) => {
    const activePoints = this.chart.getElementsAtEvent(e);
    this.props.onClick(activePoints);
  };

  getLabels = (amount) => {
    const labels = [];
    for (let i = 0; i < amount; ++i) {
      labels.push(i);
    }
    return labels;
  };

  getParsedDatasets = () => {
    const { data } = this.props;
    const datasets = Object.keys(_levels).map((level) => {
      const levelData = data.map((tick) => tick.levels[level]);
      return {
        label: level,
        fill: "start",
        borderWidth: 1.5,
        borderColor: _levels[level].borderColor,
        backgroundColor: _levels[level].backgroundColor,
        data: levelData,
      };
    });
    return datasets;
  };

  render = () => {
    if (this.canvasRef.current && this.chart) this.updateChart();
    const { width, height } = this.props;
    return (
      <div className="graph-container">
        <canvas
          height={height || 10}
          width={width || 100}
          ref={this.canvasRef}
        />
      </div>
    );
  };
}

export default ChartBase;
