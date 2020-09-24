import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LogLevelSummaryChart from "../components/LogStream/LogLevelSummaryChart";
import LogLevelPieChart from "../components/LogStream/LogLevelPieChart";
import PageTitle from "../components/Common/PageTitle";
import { LogsTable } from "../components/LogStream/LogsTable";
import { Store } from "../flux";

function LogsView() {
  const [logs, setLogs] = useState([]);
  const [flowPods, setFlowPods] = useState();
  function getData() {
    const newLogs = Store.getLogs();
    const { nodes } = Store.getFlowchart();
    setLogs(newLogs);
    setFlowPods(Object.keys(nodes));
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
        <LogsTable pods={flowPods} data={logs} />
      </div>
    </Container>
  );
}

export { LogsView };
