import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LogStream from "../components/LogStream/LogStream";
import SummaryChart from "../components/LogStream/SummaryChart";
import PageTitle from "../components/Common/PageTitle";
import OccurenceChart from "../components/LogStream/OccurenceChart";
import { LogsTable } from "../components/LogStream/LogsTable";
import { Store } from "../flux";

class LogsView extends React.Component {
  constructor() {
    super();
    this.state = {
      banner: Store.getBanner("logs"),
      logs: Store.getLogs(),
    };
    Store.on("update-ui", this.getData);
    Store.on("update-logs", this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-ui", this.getData);
    Store.on("update-logs", this.getData);
  };
  getData = () => {
    const banner = Store.getBanner("logs");
    const logs = Store.getLogs();
    this.setState({ banner, logs });
  };
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
              <SummaryChart />
            </Col>
            <Col md="2" className="mb-4">
              <OccurenceChart />
            </Col>
          </Row>
          <LogsTable data={this.state.logs} />
        </div>
      </Container>
    );
  };
}

export default LogsView;
