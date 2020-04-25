import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "shards-react";

import Chart from "chart.js";

class SingleGoal extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.chart = new Chart(this.canvasRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            hoverBorderColor: "#fff",
            data: [0, 100],
            backgroundColor: [
              '#32c8cd',
              '#E9ECEF'
            ]
          }
        ],
        labels: ["Label 1", "Label 2"]
      },
      options: {
        legend: false,
        responsive: false,
        cutoutPercentage: 70,
        animation: false,
        tooltips: false
      }
    });
  }

  updateChart = () =>{
    const {progress} = this.props;
    const percent = (progress.num_bars/progress.bar_len||1)*100;
    let newData = {
      datasets: [
        {
          hoverBorderColor: "#fff",
          data: [percent, 100-percent],
          backgroundColor: [
            '#32c8cd',
            '#E9ECEF'
          ]
        }
      ],
      labels: ["Label 1", "Label 2"]
    }
    this.chart.data = newData;
    this.chart.update();
  }

  render() {
    const { progress } = this.props;
    if(this.chart)
      this.updateChart();
    return (
      <Card className="p-3 h-100">
        <h6 className="stats-small__label text-uppercase text-center"><b>Progress</b></h6>
        <div className="go-stats__chart mx-auto d-flex flex-row">
          <div className="mr-4 mt-3">
            <h6 className="stats-small__label text-uppercase text-center">Request</h6>
            <h4 className="mb-0">#{progress.currentRequest}</h4>

          </div>

          <canvas
            ref={this.canvasRef}
            style={{ width: "100px", height: "100px" }}
            className="my-auto"
          />
        </div>
      </Card>
    );
  }
}

export default SingleGoal;
