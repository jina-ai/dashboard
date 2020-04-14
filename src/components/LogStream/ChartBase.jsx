import React from "react";
import ChartElement from 'chart.js';

const _colors = {
  INFO: {
    border: '#007bff',
    background: 'rgba(0, 123, 255, 0.15)'
  },
  SUCCESS: {
    border: '#4caf50',
    background: 'rgba(76, 175, 79, 0.15)'
  },
  ERROR: {
    border: '#fb8c00',
    background: 'rgba(251, 138, 0, 0.25)'
  },
  CRITICAL: {
    border: '#f44336',
    background: 'rgba(244, 67, 54, 0.25)'
  },
  DEBUG: {
    border: '#9c27b0',
    background: 'rgba(155, 39, 176, 0.25)'
  }
}

class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount = () => {
    this.renderChart();
  }

  renderChart = () => {
    const { data } = this.props;
    const chartOptions = {
      events: ['click'],
      onClick:this.onClick,
      maintainAspectRatio: true,
      responsive: true,
      legend: {
				position: "bottom",
				labels: {
					padding: 10,
					boxWidth: 20
				}
			},
      tooltips: {
        enabled: false,
        custom: false
      },
      elements: {
        point: {
          radius: 0,
          hitRadius:10,
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: false,
            color: 'red',
            ticks: {
              display: false,
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              borderDash: [2.5, 5],
              // zeroLineBorderDash: [5,5],
              zeroLineColor: '#6c757d',
              drawBorder: false,
              color: '#6c757d'
            },
            ticks: {
              padding: 5,
              suggestedMin: 0,
            }
          }
        ]
      }
    };

    const chartConfig = {
      onClick: this.onClick,
      type: "line",
      labels: this.getLabels(60),
      data: {
        datasets: Object.keys(data).map(level => {
          const chartData = data[level];
          return {
            label: level,
            fill: "start",
            borderWidth: 1.5,
            borderColor: _colors[level].border,
            backgroundColor: _colors[level].background,
            data: chartData
          }
        })
      },
      options: chartOptions,
      ...this.props.chartConfig
    };

    this.chart = new ChartElement(this.canvasRef.current, chartConfig);
  }

  onClick = (e) =>{
    const activePoints = this.chart.getElementsAtEvent(e);
    this.props.onClick(activePoints);
  }

  getLabels = (amount) => {
    const labels = [];
    for (let i = 0; i < amount; ++i) {
      labels.push(i);
    }
    return labels;
  }

  updateChart = () => {
    const { data } = this.props;
    const chartData = {
      labels: this.getLabels(60),
      datasets: Object.keys(data).map(level => {
        const chartData = data[level];
        return {
          label: level,
          fill: "start",
          borderWidth: 1.5,
          borderColor: _colors[level].border,
          backgroundColor: _colors[level].background,
          data: chartData
        }
      })
    }
    this.chart.data = chartData;
    this.chart.options.animation = false
    this.chart.update();
  }

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
    )
  }
}

export default Chart;
