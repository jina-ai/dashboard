import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Dispatcher, Constants, Store } from '../flux';
import PageTitle from '../components/Common/PageTitle';
import SettingsCard from '../components/Settings/Settings';
import ElapsedCard from "../components/Task/ElapsedCard";
import ProgressCard from "../components/Task/ProgressCard";
import SpeedCard from "../components/Task/SpeedCard";
import BarChartCard from "../components/Task/BarChartCard";
import QueriesPerSecond from '../components/Task/QueriesPerSecond';


class TaskView extends React.Component {
  state = {
    taskData: Store.getTaskData(),
    banner: Store.getBanner('task'),
  }
  componentWillMount = () => {
    Store.on('update-task', this.getData);
    Store.on('update-ui', this.getBanner);
  }
  componentWillUnmount = () => {
    Store.removeListener('update-task', this.getData);
    Store.removeListener('update-ui', this.getBanner);
  }
  getData = () => {
    const taskData = Store.getTaskData();
    this.setState({ taskData });
  }
  getBanner = () => {
    const banner = Store.getBanner('task');
    this.setState({ banner });
  }
  render = () => {
    const { taskData,banner} = this.state;
    return (
      <Container fluid className="main-content-container px-0">
        {
          banner &&
          <div className="mr-4">
            <div className={`mb-0 banner px-4 banner-${banner.theme}`}>
              {banner.message}
            </div>
          </div>

        }
        <div className="px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle title="Task" subtitle="Local Network" className="text-sm-left mb-3" />
          </Row>
          <Row >
            <Col md="3" className="mb-4">
              <ElapsedCard elapsed={taskData.elapsed} />
            </Col>
            <Col md="3" className="mb-4">
              <QueriesPerSecond qps={taskData.qps} />
            </Col>
            <Col md="3" className="mb-4">
              <ProgressCard progress={taskData.progress} />
            </Col>
            <Col md="3" className="mb-4">
              <SpeedCard speed={taskData.speed} />
            </Col>
          </Row>
          <BarChartCard messages={taskData.messages} bytes={taskData.bytes} lastUpdate={taskData.lastUpdateChart} />
        </div>
      </Container>
    )
  }
}

export default TaskView;
