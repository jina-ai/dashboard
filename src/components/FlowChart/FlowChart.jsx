import React from 'react';
import { FlowChart } from '@mrblenny/react-flow-chart';
import * as actions from "@mrblenny/react-flow-chart/src/container/actions";
import Sidebar from './Sidebar';
import CustomNode from './ChartNode';
import CustomPort from './NodePort';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Store, Dispatcher, Constants } from '../../flux';

class MainFlowChart extends React.Component {
	constructor(props) {
		super(props);
		const chart = Store.getFlowchart()
		this.state = { chart }
		
		this.stateActionCallbacks = Object.keys(actions).reduce((obj, key, idx) => {
			let { chart } = this.state;
			obj[key] = (...args) => {
				console.log('key: '+key);
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

	selectNode = (nodeId)=>{
	}

	render = () => {
		const { chart } = this.state;
		return (
			<div className="flow-container">
				<div className="chart-section-container">
					<div className="chart-container">
						<FlowChart chart={chart} Components={{ NodeInner: CustomNode, Port: CustomPort }} callbacks={this.stateActionCallbacks} />
					</div>
					<div className="chart-toolbar">
						<ButtonGroup >
							<Button variant="outline"><i className="fa fa-minus"></i></Button>
							<Button variant="outline">100%</Button>
							<Button variant="outline"><i className="fa fa-plus"></i></Button>
						</ButtonGroup>
						<ButtonGroup className="ml-2">
							<Button variant="outline"><i className="fa fa-sort-amount-asc"></i></Button>
							<Button variant="outline"><i className="fa fa-sort-amount-asc fa-rotate-270"></i></Button>
						</ButtonGroup>
						<Button variant="outline" className="float-right ml-2"><i className="fa fa-copy"></i> Copy YAML</Button>
					</div>
				</div>
				<Sidebar />
			</div >
		);
	}
}

export default MainFlowChart;