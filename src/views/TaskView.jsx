import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Store } from "../flux";
import PageTitle from "../components/Common/PageTitle";
import ElapsedCard from "../components/Task/ElapsedCard";
import ProgressCard from "../components/Task/ProgressCard";
import SpeedCard from "../components/Task/SpeedCard";
import BarChartCard from "../components/Task/BarChartCard";
import QueriesPerSecond from "../components/Task/QueriesPerSecond";

class TaskView extends React.Component {
  constructor() {
    super();
    this.state = {
      taskData: Store.getTaskData(),
    };
    Store.on("update-task", this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener("update-task", this.getData);
  };
  getData = () => {
    const taskData = Store.getTaskData();
    this.setState({ taskData });
  };
  render = () => {
    const { taskData } = this.state;
    return (
      <Container fluid className="main-content-container px-0">
        <div className="px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              title="Task"
              subtitle="Network"
              className="text-sm-left mb-3"
            />
          </Row>
          <Row>
            <Col md="3" className="mb-4">
              <ElapsedCard elapsed={taskData.elapsed} />
            </Col>
            <Col md="3" className="mb-4">
              <ProgressCard progress={taskData.progress} />
            </Col>
            <Col md="3" className="mb-4">
              <QueriesPerSecond qps={taskData.qps} />
            </Col>
            <Col md="3" className="mb-4">
              <SpeedCard speed={taskData.speed} />
            </Col>
          </Row>
          <BarChartCard
            messages={taskData.messages}
            bytes={taskData.bytes}
            lastUpdate={taskData.lastUpdateChart}
          />
        </div>
      </Container>
    );
  };
}

export default TaskView;
