import React from "react";
import ChartElement from 'chart.js';

const _colors = [
	{
		border: '#fff',
		background: 'rgba(0, 153, 153, 0.85)'
	},
	{
		border: '#fff',
		background: 'rgba(0, 153, 153, 0.75)'
	},
	{
		border: '#fff',
		background: 'rgba(0, 153, 153, 0.65)'
	},
	{
		border: '#fff',
		background: 'rgba(0, 153, 153, 0.55)'
	},
	{
		border: '#fff',
		background: 'rgba(0, 153, 153, 0.45)'
	},
	{
		border: '#fff',
		background: 'rgba(0, 153, 153, 0.35)'
	},
	{
		border: '#fff',
		background: 'rgba(0, 153, 153, 0.25)'
	},
	{
		border: '#fff',
		background: 'rgba(0, 153, 153, 0.15)'
	},
	{
		border: '#fff',
		background: 'rgba(0, 153, 153, 0.05)'
	},
]

class Chart extends React.Component {

	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount = () => {
		this.renderChart();
	}

	getColor = (index) => {
		let color = false;
		while (!color) {
			if (_colors[index])
				color = _colors[index];
			else
				index -= (_colors.length);
		}
		return color;
	}

	renderChart = () => {
		const { data } = this.props;
		const names = Object.keys(data);
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
			labels: names,
			data: {
				datasets: [{
					borderWidth: 1,
					data: names.map(name => data[name]),
					borderColor: names.map((name,idx)=>this.getColor(idx).border),
					backgroundColor: names.map((name,idx)=>this.getColor(idx).background),
				}]
			},
			options: chartOptions,
			...this.props.chartConfig
		};

		this.chart = new ChartElement(this.canvasRef.current, chartConfig);
	}

	updateChart = () => {
		const { data } = this.props;
		const names = Object.keys(data);
		const chartData = {
			labels: names,
			datasets: [{
				borderWidth: 1,
				data: names.map(name => data[name]),
				borderColor: names.map((name,idx)=>this.getColor(idx).border),
				backgroundColor: names.map((name,idx)=>this.getColor(idx).background),
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
