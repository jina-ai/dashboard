import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Dispatcher, Constants, Store } from '../flux';
import PageTitle from '../components/Common/PageTitle';
import SettingsCard from '../components/Settings/Settings';

class LogsView extends React.Component {
  render = () => {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Settings" subtitle="Local Network" className="text-sm-left mb-3" />
        </Row>
				<SettingsCard/>
      </Container>
    )
  }
}

export default LogsView;
