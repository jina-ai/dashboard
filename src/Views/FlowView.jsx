import React from "react";
import { Container, Row, Col,Form,Button } from 'react-bootstrap';
import FlowChart from '../components/FlowChart/FlowChart';
import { Dispatcher,Constants,Store } from '../flux';


class FlowTab extends React.Component {
  state = {

  }

  render = () => {
    const { plan } = this.state;
    return (
      <Container fluid className="main-content-container py-3 pb-5 flowchart-page">
        <FlowChart/>
      </Container>
    )
  }
}

export default FlowTab;
