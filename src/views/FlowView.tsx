import React from "react";
import { cloneDeep } from "lodash";
import { FlowChart } from "@bastinjafari/react-flow-chart-with-tooltips";
import * as actions from "@bastinjafari/react-flow-chart-with-tooltips/src/container/actions";
import { Container, Row, Card } from "shards-react";
import { Dispatcher, Constants, Store } from "../flux";
import { PageTitle } from "../components/Common/PageTitle";
import html2canvas from "html2canvas";

import CommandBar from "../components/FlowChart/CommandBar";
import Sidebar from "../components/FlowChart/Sidebar";
import CustomNode from "../components/FlowChart/ChartNode";
import CustomPort from "../components/FlowChart/NodePort";
import FlowSelection from "../components/FlowChart/FlowSelection";
import { formatAsYAML, copyToClipboard } from "../helpers";

import Tooltip from "../components/FlowChart/Tooltip";
import { tooltipConfig } from "../data/tooltipConfig";

const syncEvents = [
  "onDragNodeStop",
  "onCanvasDrop",
  "onCanvasClick",
  "onNodeClick",
  "onDragCanvasStop",
  "updateNode",
  "updateLink",
];

class FlowView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const { flow: chart, type: flowType } = Store.getFlowchart();
    const chartWithTooltips = {
      ...chart,
      ...tooltipConfig,
    };
    const selectedFlowId = Store.getSelectedFlowId();
    const flows = Store.getFlows();
    const connected = Store.getConnectionStatus();
    const availableProperties = Store.getAvailableProperties();
    this.state = {
      availableProperties,
      flowType,
      connected,
      chart: { ...chartWithTooltips },
      selectedFlowId,
      flows,
      showOverlay: false,
      actionCallbacks: Object.keys(actions).reduce(
        (obj: any, key: any, idx: any) => {
          obj[key] = (...args: any) => {
            let { chart } = this.state;
            let action = (actions as any)[key];
            let newChartTransformer = action(...args);
            let newChart = newChartTransformer(chart);
            this.updateFlow({ ...chart, ...newChart }, key);
            return newChart;
          };
          return obj;
        },
        {}
      ),
    };

    Store.on("update-ui", this.getConnectionStatus);
    Store.on("update-flowchart", this.getData);
  }

  componentDidMount = () => {
    const chartContainer = document.querySelector(".chart-container");
    if (chartContainer)
      chartContainer.addEventListener("contextmenu", (e) => e.preventDefault());
  };

  componentWillUnmount = () => {
    Store.removeListener("update-flowchart", this.getData);
    Store.removeListener("update-ui", this.getConnectionStatus);
  };

  exportImage = (extension = "png") => {
    const chartContainer = document.querySelector(".chart-container");
    const captureOverlay = document.querySelector(".capture-overlay");
    if (!chartContainer) return;
    if (captureOverlay) captureOverlay.classList.add("fade-out");

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

    html2canvas(chartContainer as HTMLElement, canvasParams).then((canvas) => {
      var image = canvas.toDataURL(`image/${extension}`);
      var link = document.getElementById("download-link");
      if (!link) return;
      link.setAttribute("download", `jina-flow-visual.${extension}`);
      link.setAttribute("href", image);
      link.click();
    });
  };

  showCaptureOverlay = (showOverlay = true) => {
    this.setState({ showOverlay });
  };

  getData = () => {
    const { flow: chart, type: flowType } = Store.getFlowchart();
    const selectedFlowId = Store.getSelectedFlowId();
    const flows = Store.getFlows();
    this.setState({ chart, flowType, selectedFlowId, flows });
  };

  getConnectionStatus = () => {
    const connected = Store.getConnectionStatus();
    this.setState({ connected });
  };

  updateNode = (node: any) => {
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

    this.updateFlow({ ...chart, ...newChart }, "updateNode");
    return newChart.nodes[node.id];
  };

  updateLink = (linkId: string, fromId: string, toId: string | undefined) => {
    if (fromId === toId) return;
    let { chart } = this.state;
    let newChart = cloneDeep(chart);

    newChart.links[linkId].from.nodeId = fromId;
    newChart.links[linkId].to.nodeId = toId;

    this.updateFlow({ ...chart, ...newChart }, "updateLink");
  };

  deleteSelection = () => {
    this.state.actionCallbacks.onDeleteKey({});
  };

  updateFlow = (flow: any, event: any) => {
    if (syncEvents.includes(event)) return this.syncFlow(flow);
    this.setState({ chart: flow });
  };

  syncFlow = (flow: any) => {
    Dispatcher.dispatch({
      actionType: Constants.UPDATE_FLOW,
      payload: flow,
    });
  };

  selectNode = (data: any) => {
    Dispatcher.dispatch({
      actionType: Constants.SELECT_NODE,
      payload: data.nodeId,
    });
  };

  copyChartAsYAML = () => {
    copyToClipboard(formatAsYAML(this.state.chart));
    alert("Chart copied to clipboard as YAML");
  };

  validateLink = ({ fromNodeId, toNodeId, fromPortId, toPortId }: any) => {
    return !(fromNodeId === toNodeId || fromPortId === toPortId);
  };

  showImportModal = () => {
    Dispatcher.dispatch({
      actionType: Constants.SHOW_MODAL,
      payload: { modal: "import" },
    });
  };

  loadFlow = (flow: any) => {
    Dispatcher.dispatch({
      actionType: Constants.LOAD_FLOW,
      payload: flow,
    });
  };

  createNewFlow = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    Dispatcher.dispatch({
      actionType: Constants.CREATE_NEW_FLOW,
    });
  };

  deleteFlow = (e: any, flowId: any) => {
    e.preventDefault();
    e.stopPropagation();
    Dispatcher.dispatch({
      actionType: Constants.DELETE_FLOW,
      payload: flowId,
    });
  };

  duplicateFlow = () => {
    const yaml = formatAsYAML(this.state.chart);
    Dispatcher.dispatch({
      actionType: Constants.DUPLICATE_FLOW,
      payload: yaml,
    });
  };

  render = () => {
    const {
      chart,
      flows,
      selectedFlowId,
      showOverlay,
      connected,
      flowType,
      availableProperties,
      actionCallbacks,
    } = this.state;
    const readonly = flowType !== "user-generated";
    return (
      <Container fluid className="main-content-container px-0">
        <div className="px-4">
          <a href="/#" id="download-link" style={{ display: "none" }}>
            download
          </a>
          <Row noGutters className="page-header mb-4">
            <PageTitle
              title="Flow Design"
              className="text-sm-left mb-3"
            />
          </Row>
          <div className="flow-container d-flex flex-column flex-md-row">
            <Card className="chart-section-container mr-md-4 mb-4">
              <FlowSelection
                connected={connected}
                flows={flows}
                selectedFlowId={selectedFlowId}
                createNewFlow={this.createNewFlow}
                loadFlow={this.loadFlow}
                deleteFlow={this.deleteFlow}
              />
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
                  Components={{
                    TooltipComponent: Tooltip,
                    NodeInner: CustomNode as any,
                    Port: CustomPort,
                  }}
                  callbacks={actionCallbacks}
                  config={{
                    readonly,
                    validateLink: this.validateLink,
                  }}
                />
              </div>
            </Card>
            <Sidebar
              availableProperties={availableProperties}
              duplicateFlow={this.duplicateFlow}
              readonly={readonly}
              chart={chart}
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
