import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFlowChart,
  selectFlows,
  selectSelectedFlowId,
} from "../redux/flows/flows.selectors";
import * as actions from "@bastinjafari/react-flow-chart-with-tooltips-and-multi-select/src/container/actions";
import { tooltipConfig } from "../data/tooltipConfig";
import {
  createNewFlow,
  deleteFlow,
  duplicateFlow,
  loadFlow,
  updateFlow,
} from "../redux/flows/flows.actions";
import html2canvas from "html2canvas";
import { cloneDeep } from "lodash";
import { copyToClipboard, formatAsYAML } from "../helpers";
import { Card, Container, Row } from "shards-react";
import { PageTitle } from "../components/Common/PageTitle";
import FlowSelection from "../components/FlowChart/FlowSelection";
import CommandBar from "../components/FlowChart/CommandBar";
import {
  FlowChart,
  IChart,
  IOnLinkCompleteInput,
} from "@bastinjafari/react-flow-chart-with-tooltips-and-multi-select";
import Tooltip from "../components/FlowChart/Tooltip";
import CustomNode from "../components/FlowChart/ChartNode";
import CustomPort from "../components/FlowChart/NodePort";
import Sidebar from "../components/FlowChart/Sidebar";
import { showModal } from "../redux/global/global.actions";
import { selectConnectionStatus } from "../redux/global/global.selectors";
import { PROPERTY_LIST } from "../redux/logStream/logStream.constants";

import styled from "@emotion/styled";

const FlowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function FlowView() {
  const dispatch = useDispatch();
  const connected = useSelector(selectConnectionStatus);
  const selectedFlowId = useSelector(selectSelectedFlowId);
  const flows = useSelector(selectFlows);
  const flowChart = useSelector(selectFlowChart);
  const { flow: chart, type: flowType } = flowChart;
  const chartWithTooltips = {
    ...chart,
    ...tooltipConfig,
  };

  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const actionCallbacks = Object.keys(actions).reduce((obj: any, key: any) => {
    obj[key] = (...args: any) => {
      let action = (actions as any)[key];
      let newChartTransformer = action(...args);
      let newChart = newChartTransformer(chart);
      dispatch(updateFlow({ ...chartWithTooltips, ...newChart }));
      return newChart;
    };
    return obj;
  }, {});

  useEffect(() => {
    const chartContainer = document.querySelector(".chart-container");
    if (chartContainer)
      chartContainer.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  const showCaptureOverlay = (showOverlay = true) => {
    setShowOverlay(showOverlay);
  };

  const exportImage = (extension = "png") => {
    const chartContainer = document.querySelector(".chart-container");
    const captureOverlay = document.querySelector(".capture-overlay");
    if (!chartContainer) return;
    if (captureOverlay) captureOverlay.classList.add("fade-out");

    showCaptureOverlay();
    setTimeout(() => showCaptureOverlay(false), 500);

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

  const updateNode = (node: any) => {
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
    dispatch(updateFlow({ ...chart, ...newChart }));

    return newChart.nodes[node.id];
  };

  const updateLink = (
    linkId: string,
    fromId: string,
    toId: string | undefined
  ) => {
    if (fromId === toId) return;
    let newChart = cloneDeep(chart);

    newChart.links[linkId].from.nodeId = fromId;
    newChart.links[linkId].to.nodeId = toId;

    dispatch(updateFlow({ ...chart, ...newChart }));
  };

  const deleteSelection = () => {
    actionCallbacks.onDeleteKey({});
  };

  const copyChartAsYAML = () => {
    copyToClipboard(formatAsYAML(chart));
    alert("Chart copied to clipboard as YAML");
  };
  const validateLink = ({
    fromNodeId,
    toNodeId,
    fromPortId,
    toPortId,
  }: IOnLinkCompleteInput) => {
    return !(fromNodeId === toNodeId || fromPortId === toPortId);
  };

  const showImportModal = () => {
    dispatch(showModal("import"));
  };

  const showNewFlowModal = () => {
    dispatch(showModal("newFlow"));
  };

  const handleCreateNewFlow = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(createNewFlow());
  };

  const handleDeleteFlow = (e: any, flowId: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteFlow(flowId));
  };

  const handleDuplicateFlow = () => {
    const yaml = formatAsYAML(chart);
    dispatch(duplicateFlow(yaml));
  };

  const readonly = flowType !== "user-generated";

  return (
    <Container fluid className="main-content-container px-0">
      <div className="px-4">
        <a href="/#" id="download-link" style={{ display: "none" }}>
          download
        </a>
        <Row noGutters className="page-header mb-4">
          <PageTitle title="Flow Design" className="text-sm-left mb-3" />
        </Row>

        <FlowContainer>
          <FlowSelection
            connected={connected}
            flows={flows}
            selectedFlowId={selectedFlowId}
            showNewFlowModal={showNewFlowModal}
            createNewFlow={handleCreateNewFlow}
            loadFlow={(flowId) => dispatch(loadFlow(flowId))}
            deleteFlow={handleDeleteFlow}
          />

          <div className="flow-container d-flex flex-column flex-md-row">
            <Card className="chart-section-container mr-md-4 mb-4">
              <CommandBar
                copyChart={copyChartAsYAML}
                importChart={showImportModal}
                exportImage={exportImage}
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
                  chart={(chart as unknown) as IChart}
                  Components={{
                    TooltipComponent: Tooltip,
                    NodeInner: CustomNode as any,
                    Port: CustomPort,
                  }}
                  callbacks={actionCallbacks}
                  config={{
                    readonly,
                    validateLink: validateLink,
                    smartRouting: true,
                  }}
                />
              </div>
            </Card>
          </div>

          <Sidebar
            availableProperties={PROPERTY_LIST}
            duplicateFlow={handleDuplicateFlow}
            readonly={readonly}
            flow={chart}
            deleteSelection={deleteSelection}
            updateNode={updateNode}
            updateLink={updateLink}
          />
        </FlowContainer>
      </div>
    </Container>
  );
}
