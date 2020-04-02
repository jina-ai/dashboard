import React from 'react';
import { cloneDeep } from 'lodash';
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
			obj[key] = (...args) => {
				let { chart } = this.state;
				let action = actions[key];
				let newChartTransformer = action(...args);
				let newChart = newChartTransformer(chart);
				this.updateChart({ ...chart, ...newChart });
				return newChart;
			};
			return obj;
		}, {});
	}

	updateNode = (node, callback) => {
		let { chart } = this.state;
		let newChart = cloneDeep(chart);
		console.log('newChart: ', newChart);
		newChart.nodes[node.id].label = node.label;

		let props = {
			...node.properties,
			...node.newProperties
		}

		Object.keys(props).map(id => {
			if (props[id] == "" || typeof props[id] == 'undefined') {
				delete props[id]
			}
		});

		newChart.nodes[node.id].properties = props;

		this.updateChart({ ...chart, ...newChart });
		return newChart.nodes[node.id];
	}

	cancelChanges = () => {
		this.stateActionCallbacks.onCanvasClick({})
	}

	deleteSelection = () => {
		this.stateActionCallbacks.onDeleteKey({});
	}

	updateChart = (chart) => {
		this.setState({ chart })
	}

	selectNode = (data) => {
		Dispatcher.dispatch({
			actionType: Constants.SELECT_NODE,
			payload: data.nodeId
		})
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
				<Sidebar chart={chart} cancelChanges={this.cancelChanges} deleteSelection={this.deleteSelection} updateNode={this.updateNode} />
			</div >
		);
	}
}

export default MainFlowChart;