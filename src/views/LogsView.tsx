import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LogLevelSummaryChart } from "../components/LogStream/LogLevelSummaryChart";
import { LogLevelPieChart } from "../components/LogStream/LogLevelPieChart";
import { PageTitle } from "../components/Common/PageTitle";
import { LogsTable } from "../components/LogStream/LogsTable";
import { Store, Dispatcher, Constants } from "../flux";
import Tour from "../components/tour/Tour";

const LOGS_UPDATE_INTERVAL = 20;
const CHART_UPDATE_INTERVAL = 1000;
const HAS_VIEWED_TOUR = "viewed_tour";
const ACCEPTED_COOKIES = "accepted-cookies";

let chartUpdateInterval: any;
let logsUpdateInterval: any;

const showLogDetails = (log: any) => {
  Dispatcher.dispatch({
    actionType: Constants.SHOW_MODAL,
    payload: { modal: "logDetails", modalParams: { log } },
  });
};

function showLogInTable(index: number) {
  Dispatcher.dispatch({
    actionType: Constants.SHOW_LOG_AT_INDEX,
    payload: index,
  });
}

function LogsView() {
  const hasNewLogs = React.useRef(false);
  const logLevelPieChartRef = useRef() as React.MutableRefObject<
    HTMLInputElement
  >;
  const [documentIsReady, setDocumentIsReady] = useState(false);
  const [isOpened, setIsOpened] = useState(true);
  const [logs, setLogs] = useState(() => Store.getLogs());
  const [logLevelOccurrences, setLogLevelOccurrences] = useState(() =>
    Store.getLogLevelOccurences()
  );
  const [logLevelCharts, setLogLevelCharts] = useState(() =>
    Store.getLogLevelCharts()
  );

  function updateLogs() {
    const newLogs = Store.getLogs();
    const newOccurrences = Store.getLogLevelOccurences();
    setLogs([...newLogs]);
    setLogLevelOccurrences({ ...newOccurrences });
  }

  function updateChart() {
    const newCharts = Store.getLogLevelCharts();
    setLogLevelCharts({ ...newCharts });
  }

  function showLog(activePoints: any) {
    const { data } = logLevelCharts;
    let index = activePoints[0] && activePoints[0]._index;
    if (index && typeof index !== "undefined") {
      const { lastLog } = data[index];
      showLogInTable(lastLog);
    }
  }

  function checkForNewLogs() {
    if (!hasNewLogs.current) return;
    hasNewLogs.current = false;
    updateLogs();
  }

  function onNewLogs() {
    hasNewLogs.current = true;
  }

  function toggleModal() {
    setIsOpened(!isOpened);
  }

  const hasViewedTour = Boolean(localStorage.getItem(HAS_VIEWED_TOUR));
  const hasAcceptedCookie = Boolean(localStorage.getItem(ACCEPTED_COOKIES));
  const [shouldViewTour, setShouldVewTour] = useState(
    !hasViewedTour && hasAcceptedCookie
  );

  // only show tour to users who have not seen it previously and who has accepted cookies
  useEffect(() => {
    if (!hasViewedTour && hasAcceptedCookie) {
      setShouldVewTour(true);
    }
    console.log(hasViewedTour, hasAcceptedCookie);
  }, [hasViewedTour, hasAcceptedCookie]);

  useEffect(() => {
    logLevelPieChartRef.current &&
      logLevelPieChartRef.current.setAttribute("id", "logLevelPieChart-tour");
    if (logLevelPieChartRef.current) {
      setDocumentIsReady(true);
    }
  }, [logLevelPieChartRef]);

  useEffect(() => {
    Store.on("update-logs", onNewLogs);
    logsUpdateInterval = setInterval(checkForNewLogs, LOGS_UPDATE_INTERVAL);
    chartUpdateInterval = setInterval(updateChart, CHART_UPDATE_INTERVAL);
    return () => {
      Store.removeListener("update-logs", onNewLogs);
      clearInterval(logsUpdateInterval);
      clearInterval(chartUpdateInterval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container fluid className="main-content-container px-0">
      {documentIsReady && shouldViewTour && (
        <Tour toggleModal={toggleModal} open={isOpened}>
          <button id="dismiss" onClick={toggleModal} className="tour-dismiss">
            {" "}
            Close{" "}
          </button>
          <div />
        </Tour>
      )}
      <div className="px-4">
        <Row noGutters className="page-header mb-4">
          <PageTitle title="Log Stream" className="text-sm-left mb-3" />
        </Row>
        <Row>
          <Col md="10" className="mb-4">
            <LogLevelSummaryChart data={logLevelCharts} showLog={showLog} />
          </Col>
          <Col md="2" ref={logLevelPieChartRef} className="mb-4">
            <LogLevelPieChart data={logLevelOccurrences} />
          </Col>
        </Row>
        <LogsTable data={logs} showLogDetails={showLogDetails} />
      </div>
    </Container>
  );
}

export { LogsView };
