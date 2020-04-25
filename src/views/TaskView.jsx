import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Dispatcher, Constants, Store } from '../flux';
import PageTitle from '../components/Common/PageTitle';
import SettingsCard from '../components/Settings/Settings';
import ElapsedCard from "../components/Task/ElapsedCard";
import ProgressCard from "../components/Task/ProgressCard";
import SpeedCard from "../components/Task/SpeedCard";
import BarChartCard from "../components/Task/BarChartCard";


class TaskView extends React.Component {
  state = {
    taskData: Store.getTaskData(),
  }
  componentWillMount = () => {
    Store.on('update-task', this.getData);
  }
  componentWillUnmount = () => {
    Store.removeListener('update-task', this.getData);
  }
  getData = () => {
    const taskData = Store.getTaskData();
    this.setState({ taskData });
  }
  render = () => {
    const { taskData } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Task" subtitle="Local Network" className="text-sm-left mb-3" />
        </Row>
        <Row >
          <Col md="4" className="mb-4">
            <ElapsedCard elapsed={taskData.elapsed} />
          </Col>
          <Col md="4" className="mb-4">
            <ProgressCard progress={taskData.progress} />
          </Col>
          <Col md="4" className="mb-4">
            <SpeedCard speed={taskData.speed} />
          </Col>
        </Row>
        <BarChartCard messages={taskData.messages} bytes={taskData.bytes} labels={taskData.messages.labels}/>
      </Container>
    )
  }
}

export default TaskView;
