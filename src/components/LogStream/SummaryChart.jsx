import React from "react";
import { Row, Col } from "react-bootstrap";
import { Store, Dispatcher, Constants } from "../../flux";
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

	showLog = (activePoints) => {
		let index = activePoints[0] && activePoints[0]._index;
		if(index && typeof index !== 'undefined');
		Dispatcher.dispatch({
			actionType: Constants.SHOW_LOG_AT_INDEX,
			payload: index
		})
	}

	getData = () => {
		const chartData = Store.getSummaryCharts();
		this.setState({ chartData });
	}

	render = () => {
		const { chartData } = this.state;
		return (
			<div>
				<ChartBase data={chartData} onClick={this.showLog} />
			</div>
		)
	}
}

export default SummaryChart;
