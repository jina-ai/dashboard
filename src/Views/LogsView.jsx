import React from "react";
import { Container, Row, Col,Form,Button } from 'react-bootstrap';
import { Dispatcher,Constants,Store } from '../flux';


class LogsView extends React.Component {
  state = {

  }

  render = () => {
    const { plan } = this.state;
    return (
      <Container className="main-content-container py-4 pb-5">
        <h1>Logs Tab</h1>
      </Container>
    )
  }
}

export default LogsView;
