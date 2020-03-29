import React from 'react';
import data from '../../data/testChart';
import { FlowChart } from '@mrblenny/react-flow-chart';
import * as actions from "@mrblenny/react-flow-chart/src/container/actions";
import Sidebar from './Sidebar';
import CustomNode from './ChartNode';

class MainFlowChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chart: data
		}
		this.stateActionCallbacks = Object.keys(actions).reduce((obj, key, idx) => {
			let { chart } = this.state;
			console.log('action: ', key);
			obj[key] = (...args) => {
				let action = actions[key];
				let newChartTransformer = action(...args);
				let newChart = newChartTransformer(chart);
				this.updateChart({ ...chart, ...newChart });
				return newChart;
			};
			return obj;
		}, {});
	}
	updateChart = (chart) => {
		this.setState({ chart })
	}
	render = () => {
		const { chart } = this.state;
		return (
			<div className="flow-container">
				<div className="chart-section-container">
					<div className="chart-container">
						<FlowChart chart={chart} Components={{ NodeInner: CustomNode }} callbacks={this.stateActionCallbacks} />
					</div>
					<div className="chart-toolbar">Toolbar</div>
				</div>
				<Sidebar/>
			</div >
		);
	}
}

export default MainFlowChart;