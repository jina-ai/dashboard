import React from "react";
import { Card } from "react-bootstrap";
import PieChart from "./PieChartBase";
import { LogLevelPieChartData } from "./types";

type Props = {
  data: LogLevelPieChartData;
};

function LogLevelPieChart({ data }: Props) {
  return (
    <Card className="h-100">
      <Card.Header className="text-center p-2">Log Levels</Card.Header>
      <Card.Body className="px-3 pt-0 pb-3">
        <PieChart data={data} />
      </Card.Body>
    </Card>
  );
}

export { LogLevelPieChart };
