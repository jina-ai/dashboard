import React from "react";
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
    <div className="main-content-container px-0">
      <div className="px-4">
        <div className="page-header mb-4">
          <PageTitle title="Task" className="text-sm-left mb-3" />
        </div>
        <div>
          <div className="mb-4">
            <ElapsedCard elapsed={taskData.elapsed} />
          </div>
          <div className="mb-4">
            <ProgressCard progress={taskData.progress} />
          </div>
          <div className="mb-4">
            <QueriesPerSecond qps={taskData.qps} />
          </div>
          <div className="mb-4">
            <SpeedCard speed={taskData.speed} />
          </div>
        </div>
        <BarChartCard
          messages={taskData.messages}
          bytes={taskData.bytes}
          lastUpdate={taskData.lastUpdateChart}
        />
      </div>
    </div>
  );
}

export default TaskView;
