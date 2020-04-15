import React from "react";
import { cloneDeep } from 'lodash';
import { FlowChart } from '@mrblenny/react-flow-chart';
import * as actions from "@mrblenny/react-flow-chart/src/container/actions";
import { Container, Row, ButtonGroup, Button, Card, Col, NavLink } from 'shards-react';
import { Dispatcher, Constants, Store } from '../flux';
import PageTitle from '../components/Common/PageTitle';

import Sidebar from '../components/FlowChart/Sidebar';
import CustomNode from '../components/FlowChart/ChartNode';
import CustomPort from '../components/FlowChart/NodePort';
import { formatAsYAML, copyToClipboard } from '../helpers';

class FlowTab extends React.Component {
  constructor(props) {
    super(props);
    const chart = Store.getFlowchart();
    const banner = Store.getBanner('flow');
    this.state = { chart,banner };

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

  componentWillMount = () => {
    Store.on('update-flowchart', this.getData);
    Store.on('update-ui',this.getBanner);
  }

  componentWillUnmount = () => {
    Store.removeListener('update-flowchart', this.getData);
    Store.removeListener('update-ui',this.getBanner);
  }

  getData = () => {
    const chart = Store.getFlowchart();
    this.updateChart(chart);
  }

  getBanner = () =>{
    const banner = Store.getBanner('flow');
    this.setState({banner});
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

  copyChartAsYAML = () => {
    copyToClipboard(formatAsYAML(this.state.chart));
    alert('Chart copied to clipboard as YAML')
  }

  validateLink = ({ fromNodeId, toNodeId, fromPortId, toPortId, chart }) => {
    if (fromPortId != 'outPort' || toPortId != 'inPort')
      return false;
    if (fromNodeId == toNodeId)
      return false;
    return true;
  }

  showImportModal = () => {
    Dispatcher.dispatch({
      actionType: Constants.SHOW_MODAL,
      payload: { modal: 'import' }
    })
  }


  render = () => {
    const { chart,banner } = this.state;
    return (
      <Container fluid className="main-content-container px-0">
        {
          banner &&
          <div className="mr-4">
            <div className={`mb-0 banner px-4 banner-${banner.theme}`}>
              {banner.message}
            </div>
          </div>

        }
        <div className="px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle title="Flow Design" subtitle="Local Network" className="text-sm-left mb-3" />
            <Col className="col d-flex align-items-right">
              <div className="d-none d-md-block flex-fill" />
              <ButtonGroup className="d-inline-flex mb-3 mb-sm-0 mx-auto py-0">
                <Button theme="white" to="/analytics" onClick={this.showImportModal}>Import YAML</Button>
                <Button theme="white" to="/ecommerce" onClick={this.copyChartAsYAML}>Copy YAML</Button>
              </ButtonGroup>
            </Col>
          </Row>
          <div className="flow-container d-flex flex-column flex-md-row">
            <Card className="chart-section-container p-1 mr-md-4 mb-4">
              <div className="chart-container">
                <FlowChart
                  chart={chart}
                  Components={{ NodeInner: CustomNode, Port: CustomPort }}
                  callbacks={this.stateActionCallbacks}
                  config={{
                    validateLink: this.validateLink
                  }} />
              </div>
            </Card>
            <Sidebar chart={chart} cancelChanges={this.cancelChanges} deleteSelection={this.deleteSelection} updateNode={this.updateNode} />
          </div >
        </div>
      </Container>
    )
  }
}

export default FlowTab;
