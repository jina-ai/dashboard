import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import LogLevelSummaryChart from "../components/LogStream/LogLevelSummaryChart";
import LogLevelPieChart from "../components/LogStream/LogLevelPieChart";
import { PageTitle } from "../components/Common/PageTitle";
import { LogsTable } from "../components/LogStream/LogsTable";
import { Store, Dispatcher, Constants } from "../flux";
import useDimensions from "react-cool-dimensions";
import { ResizeObserver } from "@juggle/resize-observer";
import { LogFold } from "../components/Common/LogFold";

const showLogDetails = (log) => {
  Dispatcher.dispatch({
    actionType: Constants.SHOW_MODAL,
    payload: { modal: "logDetails", modalParams: { log } },
  });
};

function LogsView() {
  const { ref } = useDimensions({
    useBorderBoxSize: true, // Tell the hook to measure based on the border-box size, default is false
    polyfill: ResizeObserver, // Use polyfill to make this feature works on more browsers
  });
  const [logs, setLogs] = useState([]);
  function getData() {
    const newLogs = Store.getLogs();
    setLogs([...newLogs]);
  }
  useEffect(() => {
    Store.on("update-logs", getData);
    return () => Store.removeListener("update-logs", getData);
  }, []);
  return (
    <Container fluid className="main-content-container px-4">
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
      <Row>
        <Col className="mb-4">
          <LogsTable data={logs} showLogDetails={showLogDetails} />
        </Col>
      </Row>
      <Row>
        <Col className="mb-4">
          <Card ref={ref} style={{ width: "100%", height: "100%" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <LogFold />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export { LogsView };
