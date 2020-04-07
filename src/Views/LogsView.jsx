import React from "react";
import { Container, Row, Col,Form,Button } from 'react-bootstrap';
import { Dispatcher,Constants,Store } from '../flux';
import LogsContainer from '../components/LogStream/LogsContainer';
import SummaryChart from '../components/LogStream/SummaryChart';


class LogsView extends React.Component {
  render = () => {
    return (
      <Container className="main-content-container py-4 pb-5">
        <SummaryChart/>
        <LogsContainer/>
      </Container>
    )
  }
}

export default LogsView;
