import React, { useCallback, useState } from "react"
import { Card, Container, Row } from "shards-react"
import { PageTitle } from "../components/Common/PageTitle"
import WorkspaceSelection from "../components/FlowChart/WorkspaceSelection"
import {
  duplicateFlow,
  startFlow,
  stopFlow,
} from "../redux/flows/flows.actions"
import CommandBar from "../components/FlowChart/CommandBar"

import Sidebar from "../components/FlowChart/Sidebar"
import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux"
import {
  selectFlowArguments,
  selectSelectedFlow,
  selectSelectedWorkspace,
} from "../redux/flows/flows.selectors"
import { showBanner, showModal } from "../redux/global/global.actions"
import logger from "../logger"
import { copyToClipboard, formatAsYAML } from "../helpers"
import html2canvas from "html2canvas"
import FlowChart from "../components/FlowChart/FlowChart"
import FlowSelection from "../components/FlowChart/FlowSelection"

const FlowViewContainer = styled.div`
  display: flex;
  min-height: 58rem;
`

export default function FlowView() {
  const dispatch = useDispatch()
  const flowArguments = useSelector(selectFlowArguments)
  const workspace = useSelector(selectSelectedWorkspace)
  const flow = useSelector(selectSelectedFlow)
  let flowChart = flow?.flowChart
  let flowType = flow?.type

  const copyChartAsYAML = useCallback(() => {
    logger.log("copyChartAsYAML | chart:", flowChart)
    copyToClipboard(formatAsYAML(flowChart, flowArguments))
    alert("Chart copied to clipboard as YAML")
  }, [flowChart, flowArguments])

  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  //todo fix overlay
  logger.log("showOverlay", showOverlay)
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

  const handleStartFlow = () => {
    const flowYAML = formatAsYAML(flowChart, flowArguments)
    const { daemon_id, name } = workspace
    if (!daemon_id)
      return dispatch(showBanner(`Workspace ${name} is not deployed`, "error"))
    dispatch(startFlow(flowYAML, daemon_id))
  }

  const handleStopFlow = () => {
    const { daemon_id, name } = flow
    if (!daemon_id)
      return dispatch(showBanner(`Flow ${name} is not deployed`, "error"))
    dispatch(stopFlow(daemon_id))
  }

  const handleDuplicateFlow = () => {
    const flowYAML = formatAsYAML(flowChart, flowArguments)
    dispatch(duplicateFlow(flowYAML))
  }

  if (!flowChart) return <>no flow</>

  return (
    <Container fluid className="main-content-container px-0">
      <div className="px-4">
        <a href="/#" id="download-link" style={{ display: "none" }}>
          download
        </a>
        <Row noGutters className="page-header mb-4">
          <PageTitle title="Flow Design" className="text-sm-left mb-3" />
        </Row>

        <FlowViewContainer>
          <WorkspaceSelection />
          <Card className="chart-section-container mr-md-4 mb-4">
            <FlowSelection />
            <CommandBar
              startFlow={handleStartFlow}
              stopFlow={handleStopFlow}
              copyChart={copyChartAsYAML}
              importChart={() => dispatch(showModal("import"))}
              exportImage={exportImage}
            />
            <FlowChart elements={flowChart.elements} />
          </Card>

          <Sidebar
            arguments={flowArguments.pod}
            duplicateFlow={handleDuplicateFlow}
            readonly={flowType !== "user-generated"}
            elements={flowChart.elements}
            deleteSelection={() => {}}
          />
        </FlowViewContainer>
      </div>
    </Container>
  )
}
