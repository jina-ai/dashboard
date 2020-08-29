import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Store } from "../flux";
import LogStream from "../components/LogStream/LogStream";
import SummaryChart from "../components/LogStream/SummaryChart";
import PageTitle from "../components/Common/PageTitle";
import OccurenceChart from "../components/LogStream/OccurenceChart";

class LogsView extends React.Component {
  constructor() {
    super();
    this.state = {
      banner: Store.getBanner("logs"),
    };
    Store.on("update-ui", this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-ui", this.getData);
  };
  getData = () => {
    const banner = Store.getBanner("logs");
    this.setState({ banner });
  };
  render = () => {
    const { banner } = this.state;
    return (
      <Container fluid className="main-content-container px-0">
        {banner && (
          <div className="mr-4">
            <div className={`mb-0 banner px-4 banner-${banner.theme}`}>
              {banner.message}
            </div>
          </div>
        )}
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
          <LogStream />
        </div>
      </Container>
    );
  };
}

export default LogsView;
