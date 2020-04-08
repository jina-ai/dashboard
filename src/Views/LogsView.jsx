import React from "react";
import { Container, Row, Col,Form,Button } from 'react-bootstrap';
import { Dispatcher,Constants,Store } from '../flux';
import LogStream from '../components/LogStream/LogStream';
import SummaryChart from '../components/LogStream/SummaryChart';


class LogsView extends React.Component {
  render = () => {
    return (
      <Container className="main-content-container py-4 pb-5">
        <SummaryChart/>
        <LogStream/>
      </Container>
    )
  }
}

export default LogsView;
