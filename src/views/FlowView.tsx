import React, { useCallback, useState } from "react"
import { Card, Container, Row } from "shards-react"
import { PageTitle } from "../components/Common/PageTitle"
import FlowSelection from "../components/FlowChart/FlowSelection"
import {
  createNewFlow,
  deleteFlow,
  duplicateFlow,
  loadFlow,
  startFlow,
  stopFlow,
} from "../redux/flows/flows.actions"
import CommandBar from "../components/FlowChart/CommandBar"

import Sidebar from "../components/FlowChart/Sidebar"
import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux"
import {
  selectFlowArguments,
  selectFlow,
  selectRerender,
  selectSelectedFlowId,
} from "../redux/flows/flows.selectors"
import { selectConnectionStatus } from "../redux/global/global.selectors"
import { showModal } from "../redux/global/global.actions"
import logger from "../logger"
import { copyToClipboard, formatAsYAML } from "../helpers"
import html2canvas from "html2canvas"
import ReactFlow from "react-flow-renderer"

const FlowViewContainer = styled.div`
  display: flex;
`

const FlowContainer = styled.div`
  overflow: hidden;
`
export default function FlowView() {
  const dispatch = useDispatch()
  useState(useSelector(selectRerender))
  const connected = useSelector(selectConnectionStatus)
  const selectedFlowId = useSelector(selectSelectedFlowId)
  const flowArguments = useSelector(selectFlowArguments)
  const flow = useSelector(selectFlow)
  const {
    flowChart: { elements },
    type: flowType,
  } = flow

  const copyChartAsYAML = useCallback(() => {
    logger.log("copyChartAsYAML | chart:", elements)
    copyToClipboard(formatAsYAML(elements, flowArguments))
    alert("Chart copied to clipboard as YAML")
  }, [elements, flowArguments])

  const [showOverlay, setShowOverlay] = useState<boolean>(false)

  const showCaptureOverlay = (showOverlay = true) => {
    setShowOverlay(showOverlay)
  }

  const exportImage = (extension = "png") => {
    const chartContainer = document.querySelector(".chart-container")
    const captureOverlay = document.querySelector(".capture-overlay")
    if (!chartContainer) return
    if (captureOverlay) captureOverlay.classList.add("fade-out")

    showCaptureOverlay()
    setTimeout(() => showCaptureOverlay(false), 500)

    let canvasParams = {
      foreignObjectRendering: true,
      logging: true,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      scale: 5,
    }

    html2canvas(chartContainer as HTMLElement, canvasParams).then((canvas) => {
      var image = canvas.toDataURL(`image/${extension}`)
      var link = document.getElementById("download-link")
      if (!link) return
      link.setAttribute("download", `jina-flow-visual.${extension}`)
      link.setAttribute("href", image)
      link.click()
    })
  }

  const handleDuplicateFlow = () => {
    const flowYAML = formatAsYAML(elements, flowArguments)
    dispatch(duplicateFlow(flowYAML))
  }

  //todo remove any
  const updateNode = (node: any) => {
    // let newChart = cloneDeep(chart)
    // newChart.elements[node.id].label = node.label
    //
    // let props = {
    //   ...node.properties,
    //   ...node.newProperties,
    // }
    //
    // Object.keys(props).forEach((id) => {
    //   if (props[id] === "" || typeof props[id] === "undefined") {
    //     delete props[id]
    //   }
    // })
    //
    // newChart.nodes[node.id].properties = props
    // dispatch(updateFlow({ ...chart, ...newChart }))
    //
    // return newChart.nodes[node.id]
  }

  const updateLink = (
    linkId: string,
    fromId: string,
    toId: string | undefined
  ) => {
    // if (fromId === toId) return
    // let newChart = cloneDeep(chart)
    //
    // newChart.links[linkId].from.nodeId = fromId
    // newChart.links[linkId].to.nodeId = toId
    //
    // dispatch(updateFlow({ ...chart, ...newChart }))
  }

  return (
    <Container fluid className="main-content-container px-0">
      <div className="px-4">
        <a href="/#" id="download-link" style={{ display: "none" }}>
          download
        </a>
        <Row noGutters className="page-header mb-4">
          <PageTitle title="FlowChart Design" className="text-sm-left mb-3" />
        </Row>

        <FlowViewContainer>
          <FlowSelection
            connected={connected}
            selectedFlowId={selectedFlowId}
            showNewFlowModal={() => dispatch(showModal("newFlow"))}
            createNewFlow={() => dispatch(createNewFlow())}
            loadFlow={(flowId) => dispatch(loadFlow(flowId))}
            deleteFlow={(e, flowId) => dispatch(deleteFlow(flowId))}
          />

          <FlowContainer>
            <Card className="chart-section-container mr-md-4 mb-4">
              <CommandBar
                startFlow={() => dispatch(startFlow(selectedFlowId))}
                stopFlow={() => dispatch(stopFlow(selectedFlowId))}
                copyChart={copyChartAsYAML}
                importChart={() => dispatch(showModal("import"))}
                exportImage={exportImage}
              />
              <div className="chart-container">
                <div
                  className="capture-overlay"
                  style={{ display: showOverlay ? "" : "none" }}
                >
                  <div className="capture-overlay-top" />
                  <div className="capture-overlay-bottom" />
                </div>
              </div>

              <div style={{ height: 1000, width: 1000 }}>
                <ReactFlow elements={elements} />
              </div>
            </Card>
          </FlowContainer>

          <Sidebar
            arguments={flowArguments.pod}
            duplicateFlow={handleDuplicateFlow}
            readonly={flowType !== "user-generated"}
            elements={elements}
            deleteSelection={() => {}}
            updateNode={updateNode}
            updateLink={updateLink}
          />
        </FlowViewContainer>
      </div>
    </Container>
  )
}
