import React from 'react';
import { cloneDeep } from 'lodash';
import { FlowChart } from '@mrblenny/react-flow-chart';
import * as actions from "@mrblenny/react-flow-chart/src/container/actions";
import Sidebar from './Sidebar';
import CustomNode from './ChartNode';
import CustomPort from './NodePort';
import { ButtonGroup, Button } from 'react-bootstrap';
import {formatAsYAML, copyToClipboard} from '../../helpers';
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

	componentWillMount = () =>{
		Store.on('update-flowchart',this.getData);
	}

	componentWillUnmount = () =>{
		Store.removeListener('update-flowchart',this.getData);
	}

	getData = () =>{
		const chart = Store.getFlowchart();
		this.updateChart(chart);
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

	copyChartAsYAML = () =>{
		copyToClipboard(formatAsYAML(this.state.chart));
		alert('Chart copied to clipboard as YAML')
	}

	validateChat = ()=>{
		const {chart} = this.state;
		let isValid = true;
	}

	validateLink = ({fromNodeId,toNodeId ,fromPortId,toPortId,chart})=>{
		if(fromPortId!='outPort' || toPortId!='inPort')
			return false;
		if(fromNodeId == toNodeId)
			return false;
		return true;
	}

	showImportModal = () =>{
		Dispatcher.dispatch({
			actionType:Constants.SHOW_MODAL,
			payload:{modal: 'import'}
		})
	}

	render = () => {
		const { chart } = this.state;
		return (
			<div className="flow-container d-flex flex-column flex-md-row">
				<div className="chart-section-container">
					<div className="chart-container">
						<FlowChart 
						chart={chart} 
						Components={{ NodeInner: CustomNode, Port: CustomPort }}
						callbacks={this.stateActionCallbacks}
						config={ {
							validateLink: this.validateLink}}/>
					</div>
					<div className="chart-toolbar">
						<p className="pt-2 mb-0 d-inline-block">{Object.keys(chart.nodes || {}).length} Pods,</p>
						<p className="pt-2 mb-0 d-inline-block ml-2">{Object.keys(chart.links || {}).length} Connections</p>
						<Button variant="outline" className="float-right ml-2" onClick={this.copyChartAsYAML}><i className="material-icons">file_copy</i> Copy YAML</Button>
						<Button variant="outline" className="float-right ml-2" onClick={this.showImportModal}><i className="material-icons">publish</i> Import YAML</Button>
					</div>
				</div>
				<Sidebar chart={chart} cancelChanges={this.cancelChanges} deleteSelection={this.deleteSelection} updateNode={this.updateNode} />
			</div >
		);
	}
}

export default MainFlowChart;