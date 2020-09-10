import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LogStream from "../components/LogStream/LogStream";
import LogLevelSummaryChart from "../components/LogStream/LogLevelSummaryChart";
import LogLevelPieChart from "../components/LogStream/LogLevelPieChart";
import PageTitle from "../components/Common/PageTitle";

class LogsView extends React.Component {
  render = () => {
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
          <LogStream />
        </div>
      </Container>
    );
  };
}

export default LogsView;
