import React from "react";
import { Container, Row, Col,Form,Button } from 'react-bootstrap';
import FlowChart from '../components/FlowChart/FlowChart';
import { Dispatcher,Constants,Store } from '../flux';
import PageTitle from '../components/Common/PageTitle';

class FlowTab extends React.Component {
  state = {

  }

  render = () => {
    const { plan } = this.state;
    return (
      <Container fluid className="main-content-container px-4 flowchart-page">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Flow" subtitle="Local Network" className="text-sm-left mb-3" />
        </Row>
        <FlowChart/>
      </Container>
    )
  }
}

export default FlowTab;
