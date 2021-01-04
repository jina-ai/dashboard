import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import BarChart from "./BarChartBase";
import { MultiFilterSelect } from "../Common/MultiFilterSelect";
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
  setTimeSelection: (timeSelection: any) => void;
  timeOptions: { [key: string]: { value: string; label: string } };
  selectedTime: any;
  timeLabels: any;
};

function LogLevelSummaryChart({
  data: { data, numSeconds, numTicks },
  showLog,
  setTimeSelection,
  timeOptions,
  selectedTime,
  timeLabels,
}: Props) {
  return (
    <Card className="h-100">
      <Card.Header className="p-2 px-3">
        <Row>
          <Col>Log Occurences by Level</Col>
          <Col className="text-right">
            <MultiFilterSelect
              clearAfter
              options={Object.values(timeOptions)}
              onFilterChange={(option: any[]) =>
                setTimeSelection(option[0].value)
              }
              className="logstream-select text-left"
              placeholder={
                <span>
                  <i className="material-icons mr-2">access_time</i>
                  {timeOptions[selectedTime].label}
                </span>
              }
              isSearchable={false}
            />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className="d-none d-md-block p-0 pb-2 px-3">
        <BarChart
          timeLabels={timeLabels}
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
          timeLabels={timeLabels}
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
}

export { LogLevelSummaryChart };
