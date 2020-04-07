import React from "react";
import { Row, Col } from "react-bootstrap";
import {Store} from "../../flux";
import ChartBase from './ChartBase';

class SummaryChart extends React.Component {
	state = {
		chartData: Store.getSummaryCharts(),
	}
	componentWillMount = () => {
		Store.on('update-summary-chart', this.getData);
	}

	componentWillUnmount = () => {
		Store.removeListener('update-summary-chart', this.getData);
	}

	getData = () => {
		const chartData = Store.getSummaryCharts();
		this.setState({ chartData });
	}
	
	render = () => {
		const { chartData } = this.state;
		return (
			<div>
				<ChartBase data={chartData}/>
			</div>
		)
	}
}

export default SummaryChart;
