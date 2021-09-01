import React from "react";
import PieChart from "./PieChartBase";
import { LogLevels } from "../../redux/logStream/logStream.types";
import Card from "../Common/Card";

type Props = {
  data: LogLevels;
};

function LogLevelPieChart({ data }: Props) {
  return (
    <Card className="h-full flex flex-col">
      <div className="text-center p-2">Log Levels</div>
      <div className="px-3 pt-0 pb-3 flex-grow">
        <PieChart data={data} />
      </div>
    </Card>
  );
}

export { LogLevelPieChart };
