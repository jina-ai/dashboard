import React from "react";
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { PageTitle } from "../components/Common/PageTitle";
import ElapsedCard from "../components/Task/ElapsedCard";
import ProgressCard from "../components/Task/ProgressCard";
import SpeedCard from "../components/Task/SpeedCard";
import BarChartCard from "../components/Task/BarChartCard";
import QueriesPerSecond from "../components/Task/QueriesPerSecond";
import { useSelector } from "react-redux";
import { selectTaskData } from "../redux/task/task.selectors";

function TaskView() {
  const taskData = useSelector(selectTaskData);

  return (
    <Container className="main-content-container px-0">
      <div className="px-4">
        <Grid container className="page-header mb-4">
          <PageTitle title="Task" className="text-sm-left mb-3" />
        </Grid>
        <Grid container>
          <Grid item md={6} lg={6} xl={3} className="mb-4">
            <ElapsedCard elapsed={taskData.elapsed} />
          </Grid>
          <Grid item md={6} lg={6} xl={3} className="mb-4">
            <ProgressCard progress={taskData.progress} />
          </Grid>
          <Grid item md={6} lg={6} xl={3} className="mb-4">
            <QueriesPerSecond qps={taskData.qps} />
          </Grid>
          <Grid item md={6} lg={6} xl={3} className="mb-4">
            <SpeedCard speed={taskData.speed} />
          </Grid>
        </Grid>
        <BarChartCard
          messages={taskData.messages}
          bytes={taskData.bytes}
          lastUpdate={taskData.lastUpdateChart}
        />
      </div>
    </Container>
  );
}

export default TaskView;
