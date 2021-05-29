import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import PieChart from "./PieChartBase";
import { LogLevels } from "../../redux/logStream/logStream.types";

type Props = {
  data: LogLevels;
};

function LogLevelPieChart({ data }: Props) {
  return (
    <Card className="h-100">
      <CardHeader className="text-center p-2">Log Levels</CardHeader>
      <CardContent className="px-3 pt-0 pb-3">
        <PieChart data={data} />
      </CardContent>
    </Card>
  );
}

export { LogLevelPieChart };
