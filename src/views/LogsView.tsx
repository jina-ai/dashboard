import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LogLevelSummaryChart } from "../components/LogStream/LogLevelSummaryChart";
import { LogLevelPieChart } from "../components/LogStream/LogLevelPieChart";
import { PageTitle } from "../components/Common/PageTitle";
import { LogsTable } from "../components/LogStream/LogsTable";
import { Store, Dispatcher, Constants } from "../flux";

const UPDATE_INTERVAL = 1000;
let chartInterval: any;

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
    setLogLevelOccurrences({ ...newOccurrences });
    setLogs([...newLogs]);
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

  useEffect(() => {
    Store.on("update-logs", updateLogs);
    chartInterval = setInterval(updateChart, UPDATE_INTERVAL);
    return () => {
      Store.removeListener("update-logs", updateLogs);
      clearInterval(chartInterval);
    };
  }, []);

  return (
    <Container fluid className="main-content-container px-0">
      <div className="px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Log Stream"
            subtitle="Network"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col md="10" className="mb-4">
            <LogLevelSummaryChart data={logLevelCharts} showLog={showLog} />
          </Col>
          <Col md="2" className="mb-4">
            <LogLevelPieChart data={logLevelOccurrences} />
          </Col>
        </Row>
        <LogsTable data={logs} showLogDetails={showLogDetails} />
      </div>
    </Container>
  );
}

export { LogsView };
