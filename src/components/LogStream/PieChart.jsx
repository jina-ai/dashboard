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

const _logLevels = ['INFO', 'ERROR', 'CRITICAL', 'DEBUG','SUCCESS',];

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
			legend: {
				display: false,
				position: "bottom",
				labels: {
					padding: 25,
					boxWidth: 20
				}
			},
			tooltips: {
				custom: false,
				mode: "index",
				position: "nearest"
			},
		};

		const chartConfig = {
			type: "pie",
			labels: _logLevels,
			data: {
				datasets: [{
					borderWidth: 1.5,
					data: _logLevels.map(level => data[level]),
					borderColor: _logLevels.map(level => _colors[level].border),
					backgroundColor: _logLevels.map(level => _colors[level].background),
				}]
			},
			options: chartOptions,
			...this.props.chartConfig
		};

		this.chart = new ChartElement(this.canvasRef.current, chartConfig);
	}

	updateChart = () => {
		const { data } = this.props;
		const chartData = {
			labels: _logLevels,
			datasets: [{
				borderWidth: 1.5,
				data: _logLevels.map(level => data[level]),
				borderColor: _logLevels.map(level => _colors[level].border),
				backgroundColor: _logLevels.map(level => _colors[level].background),
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
			<div className="graph-container">
				<canvas
					height={height || 50}
					width={width || 50}
					ref={this.canvasRef}
				/>
			</div>
		)
	}
}

export default Chart;
