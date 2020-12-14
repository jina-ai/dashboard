import React from "react";
import { Card } from "react-bootstrap";
import BarChart from "./BarChartBase";
import { LogLevelSummaryChartData } from "./types";

const DEFAULT_HEIGHT = 10;
const DEFAULT_WIDTH = 70;

const DEFAULT_HEIGHT_SMALL = 20;
const DEFAULT_WIDTH_SMALL = 50;

type Props = {
  data: {
    data: LogLevelSummaryChartData;
    lastTimestamp: number;
    numSeconds: number;
    numTicks: number;
  };
  showLog: (activePoints: any) => void;
};

function areEqual(prevProps: Props, nextProps: Props) {
  return prevProps.data.lastTimestamp === nextProps.data.lastTimestamp;
}

const LogLevelSummaryChart = React.memo(function LogLevelSummaryChart({
  data: { data, numSeconds, numTicks },
  showLog,
}: Props) {
  return (
    <Card className="h-100">
      <Card.Header id="logChartHeader" className="p-2 px-3">
        Log Occurences by Level
      </Card.Header>
      <Card.Body id="barChart1" className="d-none d-md-block p-0 pb-2 px-3">
        <BarChart
          data={data}
          numTicks={numTicks}
          numSeconds={numSeconds}
          height={DEFAULT_HEIGHT}
          width={DEFAULT_WIDTH}
          onClick={showLog}
        />
      </Card.Body>
      <Card.Body className="d-md-none pb-2">
        <BarChart
          data={data}
          numTicks={numTicks}
          numSeconds={numSeconds}
          height={DEFAULT_HEIGHT_SMALL}
          width={DEFAULT_WIDTH_SMALL}
          onClick={showLog}
        />
      </Card.Body>
    </Card>
  );
},
areEqual);

export { LogLevelSummaryChart };
