import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Dispatcher, Constants, Store } from '../flux';
import LogStream from '../components/LogStream/LogStream';
import SummaryChart from '../components/LogStream/SummaryChart';
import PageTitle from '../components/Common/PageTitle';

class LogsView extends React.Component {
  render = () => {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Log Stream" subtitle="Local Network" className="text-sm-left mb-3" />
        </Row>
        <SummaryChart />
        <LogStream />
      </Container>
    )
  }
}

export default LogsView;
