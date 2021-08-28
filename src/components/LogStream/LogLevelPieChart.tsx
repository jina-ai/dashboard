import React from "react";
import PieChart from "./PieChartBase";
import { LogLevels } from "../../redux/logStream/logStream.types";

type Props = {
  data: LogLevels;
};

function LogLevelPieChart({ data }: Props) {
  return (
    <div className="h-100">
      <div className="text-center p-2">Log Levels</div>
      <div className="px-3 pt-0 pb-3">
        <PieChart data={data} />
      </div>
    </div>
  );
}

export { LogLevelPieChart };
