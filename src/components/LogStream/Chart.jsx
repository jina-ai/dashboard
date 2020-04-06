import React from "react";
import ChartElement from 'chart.js';

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
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
        custom: false
      },
      elements: {
        point: {
          radius: 0,
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
        yAxes:[
          {
            gridLines:{
              borderDash: [2.5,5],
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
      type: "line",
      labels: this.getLabels(data.length),
      data: {
        datasets: [{
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          borderColor: '#2196f3',
          backgroundColor:'#2195f325',
          data
        }]
      },
      options: chartOptions,
      ...this.props.chartConfig
    };

    this.chart = new ChartElement(this.canvasRef.current, chartConfig);
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
      labels: this.getLabels(data.length),
      datasets: [{
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        borderColor: '#2196f3',
          backgroundColor:'#2195f325',
        data
      }]
    }
    this.chart.data = chartData;
    this.chart.options.animation = false
    this.chart.update();
  }

  render = () => {
    if (this.canvasRef.current && this.chart) this.updateChart();
    const { width, height } = this.props;
    return (
      <div className="graph-container mb-4">
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
