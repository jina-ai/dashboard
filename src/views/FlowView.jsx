import React from "react";
import { cloneDeep } from "lodash";
import { FlowChart } from "@mrblenny/react-flow-chart";
import * as actions from "@mrblenny/react-flow-chart/src/container/actions";
import { Container, Row, Card } from "shards-react";
import { Dispatcher, Constants, Store } from "../flux";
import PageTitle from "../components/Common/PageTitle";
import html2canvas from "html2canvas";

import CommandBar from "../components/FlowChart/CommandBar";
import Sidebar from "../components/FlowChart/Sidebar";
import CustomNode from "../components/FlowChart/ChartNode";
import CustomPort from "../components/FlowChart/NodePort";
import ExampleSelection from "../components/FlowChart/ExampleSelection";
import { formatAsYAML, copyToClipboard } from "../helpers";

class FlowView extends React.Component {
  constructor(props) {
    super(props);
    const chart = Store.getFlowchart();
    this.state = { chart, showOverlay: false };

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

    Store.on("update-flowchart", this.getData);
  }

  componentDidMount = () => {
    document
      .querySelector(".chart-container")
      .addEventListener("contextmenu", (e) => e.preventDefault());
  };

  componentWillUnmount = () => {
    Store.removeListener("update-flowchart", this.getData);
  };

  exportImage = (extension = "png") => {
    document.querySelector(".capture-overlay").classList.add("fade-out");
    this.showCaptureOverlay();
    setTimeout(() => this.showCaptureOverlay(false), 500);
    let canvasParams = {
      foreignObjectRendering: true,
      logging: true,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      scale: 5,
    };
    html2canvas(document.querySelector(".chart-container"), canvasParams).then(
      (canvas) => {
        var image = canvas.toDataURL(`image/${extension}`);
        var link = document.getElementById("download-link");
        link.setAttribute("download", `jina-flow-visual.${extension}`);
        link.setAttribute("href", image);
        link.click();
      }
    );
  };

  showCaptureOverlay = (showOverlay = true) => {
    this.setState({ showOverlay });
  };

  getData = () => {
    const chart = Store.getFlowchart();
    this.updateChart(chart);
  };

  updateNode = (node, callback) => {
    let { chart } = this.state;
    let newChart = cloneDeep(chart);
    newChart.nodes[node.id].label = node.label;

    let props = {
      ...node.properties,
      ...node.newProperties,
    };

    Object.keys(props).forEach((id) => {
      if (props[id] === "" || typeof props[id] === "undefined") {
        delete props[id];
      }
    });

    newChart.nodes[node.id].properties = props;

    this.updateChart({ ...chart, ...newChart });
    return newChart.nodes[node.id];
  };

  updateLink = (linkId, fromId, toId) => {
    if (fromId === toId) return;
    let { chart } = this.state;
    let newChart = cloneDeep(chart);

    newChart.links[linkId].from.nodeId = fromId;
    newChart.links[linkId].to.nodeId = toId;

    this.updateChart({ ...chart, ...newChart });
  };

  cancelChanges = () => {
    this.stateActionCallbacks.onCanvasClick({});
  };

  deleteSelection = () => {
    this.stateActionCallbacks.onDeleteKey({});
  };

  updateChart = (chart) => {
    this.setState({ chart });
  };

  selectNode = (data) => {
    Dispatcher.dispatch({
      actionType: Constants.SELECT_NODE,
      payload: data.nodeId,
    });
  };

  copyChartAsYAML = () => {
    copyToClipboard(formatAsYAML(this.state.chart));
    alert("Chart copied to clipboard as YAML");
  };

  validateLink = ({ fromNodeId, toNodeId, fromPortId, toPortId }) => {
    return !(fromNodeId === toNodeId || fromPortId === toPortId);
  };

  showImportModal = () => {
    Dispatcher.dispatch({
      actionType: Constants.SHOW_MODAL,
      payload: { modal: "import" },
    });
  };

  loadExample = (example) => {
    Dispatcher.dispatch({
      actionType: Constants.LOAD_EXAMPLE,
      payload: example,
    });
  };

  render = () => {
    const { chart, showOverlay } = this.state;
    return (
      <Container fluid className="main-content-container px-0">
        <div className="px-4">
          <a href="/#" id="download-link" style={{ display: "none" }}>
            download
          </a>
          <Row noGutters className="page-header py-4">
            <PageTitle
              title="Flow Design"
              subtitle="Network"
              className="text-sm-left mb-3"
            />
          </Row>
          <div className="flow-container d-flex flex-column flex-md-row">
            <Card className="chart-section-container p-1 mr-md-4 mb-4">
              <ExampleSelection loadExample={this.loadExample} />
              <CommandBar
                copyChart={this.copyChartAsYAML}
                importChart={this.showImportModal}
                exportImage={this.exportImage}
              />
              <div className="chart-container">
                <div
                  className="capture-overlay"
                  style={{ display: showOverlay ? "" : "none" }}
                >
                  <div className="capture-overlay-top"></div>
                  <div className="capture-overlay-bottom"></div>
                </div>
                <FlowChart
                  chart={chart}
                  Components={{ NodeInner: CustomNode, Port: CustomPort }}
                  callbacks={this.stateActionCallbacks}
                  config={{
                    validateLink: this.validateLink,
                  }}
                />
              </div>
            </Card>
            <Sidebar
              chart={chart}
              cancelChanges={this.cancelChanges}
              deleteSelection={this.deleteSelection}
              updateNode={this.updateNode}
              updateLink={this.updateLink}
            />
          </div>
        </div>
      </Container>
    );
  };
}
export default FlowView;
