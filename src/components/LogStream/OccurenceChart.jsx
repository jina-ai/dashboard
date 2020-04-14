import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Store, Dispatcher, Constants } from "../../flux";
import ChartBase from './PieChart';

class OccurenceChart extends React.Component {
	state = {
		chartData: Store.getTotalOccurences(),
	}
	componentWillMount = () => {
		Store.on('update-summary-chart', this.getData);
	}

	componentWillUnmount = () => {
		Store.removeListener('update-summary-chart', this.getData);
	}

	getData = () => {
		const chartData = Store.getTotalOccurences();
		this.setState({ chartData });
	}

	render = () => {
		const { chartData } = this.state;
		console.log('chartData:',chartData)
		return (
			<Card className="h-100">
				<Card.Body>
					<ChartBase data={chartData} />
				</Card.Body>
			</Card>
		)
	}
}

export default OccurenceChart;
