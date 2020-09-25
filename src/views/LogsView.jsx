import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LogLevelSummaryChart from "../components/LogStream/LogLevelSummaryChart";
import LogLevelPieChart from "../components/LogStream/LogLevelPieChart";
import PageTitle from "../components/Common/PageTitle";
import { LogsTable } from "../components/LogStream/LogsTable";
import { Store, Dispatcher, Constants } from "../flux";
const showLogDetails = (log) => {
  Dispatcher.dispatch({
    actionType: Constants.SHOW_MODAL,
    payload: { modal: "logDetails", modalParams: { log } },
  });
};

function LogsView() {
  const [logs, setLogs] = useState([]);
  function getData() {
    const newLogs = Store.getLogs();
    setLogs(newLogs);
  }
  useEffect(() => {
    Store.on("update-logs", getData);
    return () => Store.removeListener("update-logs");
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
            <LogLevelSummaryChart />
          </Col>
          <Col md="2" className="mb-4">
            <LogLevelPieChart />
          </Col>
        </Row>
        <LogsTable data={logs} showLogDetails={showLogDetails} />
      </div>
    </Container>
  );
}

export { LogsView };
