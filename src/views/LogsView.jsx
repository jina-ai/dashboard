import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Dispatcher, Constants, Store } from '../flux';
import LogStream from '../components/LogStream/LogStream';
import SummaryChart from '../components/LogStream/SummaryChart';
import PageTitle from '../components/Common/PageTitle';
import OccurenceChart from "../components/LogStream/OccurenceChart";

class LogsView extends React.Component {
  render = () => {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Log Stream" subtitle="Local Network" className="text-sm-left mb-3" />
        </Row>
        <Row>
          <Col md="10" className="mb-4"><SummaryChart /></Col>
          <Col md="2" className="mb-4"><OccurenceChart /></Col>
        </Row>
        <LogStream />
      </Container>
    )
  }
}

export default LogsView;
