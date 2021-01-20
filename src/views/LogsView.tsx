import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LogLevelSummaryChart } from "../components/LogStream/LogLevelSummaryChart";
import { LogLevelPieChart } from "../components/LogStream/LogLevelPieChart";
import { PageTitle } from "../components/Common/PageTitle";
import { LogsTable } from "../components/LogStream/LogsTable";
import { Dispatcher, Constants } from "../flux";
import { useDispatch, useSelector } from "react-redux";
import { showLogAtIndex } from "../redux/logStream/logStream.actions";
import {
  selectLogLevelOccurrences,
  selectLogLevels,
  selectLogs,
} from "../redux/logStream/logStream.selectors";

import { getLogLevelCharts } from "../helpers/format";
import { Store } from "../flux/store";

type TimePreference = "60second" | "15minute" | "1hour";

const DEFAULT_TIME_SELECTION: TimePreference = "60second";

const MAX_CHART_TICKS = 60;

const TIME_PREFERENCE_NAME = "logs-time-preference";

const timeOptions: {
  [key: string]: { value: string; label: string; chartLabels: string[] };
} = {
  "60second": {
    value: "60second",
    label: "60 Seconds",
    chartLabels: ["60s ago", "30s ago", ""],
  },
  "15minute": {
    value: "15minute",
    label: "15 Minutes",
    chartLabels: ["15m ago", "7m 30s ago", ""],
  },
  "1hour": {
    value: "1hour",
    label: "1 Hour",
    chartLabels: ["1h ago", "30m ago", ""],
  },
};

const numSeconds: { [key: string]: number } = {
  "60second": 60,
  "15minute": 900,
  "1hour": 3600,
};

function getUserTimePreference() {
  const preference = localStorage.getItem(TIME_PREFERENCE_NAME);
  if (preference && timeOptions[preference]) return preference;
  return false;
}

function setUserTimePreference(preference: string) {
  localStorage.setItem(TIME_PREFERENCE_NAME, preference);
}

function getInitialTimeSelection() {
  return getUserTimePreference() || DEFAULT_TIME_SELECTION;
}

const showLogDetails = (log: any) => {
  Dispatcher.dispatch({
    actionType: Constants.SHOW_MODAL,
    payload: { modal: "logDetails", modalParams: { log } },
  });
};

function LogsView() {
  console.log(Store.getStoreCopy());
  const dispatch = useDispatch();

  const logLevelOccurrences = useSelector(selectLogLevelOccurrences);
  const logs = useSelector(selectLogs);
  const logLevels = useSelector(selectLogLevels);
  const [selectedTime, setSelectedTime] = useState(() =>
    getInitialTimeSelection()
  );

  const [logLevelCharts, setLogLevelCharts] = useState(() =>
    getLogLevelCharts(
      numSeconds[selectedTime],
      MAX_CHART_TICKS,
      logLevelOccurrences,
      new Date()
    )
  );

  function setTimeSelection(time: TimePreference) {
    setSelectedTime(time);
    setUserTimePreference(time);
  }

  useEffect(() => {
    const currentDate = new Date();
    const newCharts = getLogLevelCharts(
      numSeconds[selectedTime],
      MAX_CHART_TICKS,
      logLevelOccurrences,
      currentDate
    );
    setLogLevelCharts({ ...newCharts });
  }, [selectedTime, logLevelOccurrences]);

  function showLog(activePoints: any) {
    const { data } = logLevelCharts;
    let index = activePoints[0] && activePoints[0]._index;
    if (index && typeof index !== "undefined") {
      const { lastLog } = data[index];
      dispatch(showLogAtIndex(lastLog));
    }
  }

  const timeSelection = timeOptions[selectedTime];

  return (
    <Container fluid className="main-content-container px-0">
      <div className="px-4">
        <Row noGutters className="page-header mb-4">
          <PageTitle title="Log Stream" className="text-sm-left mb-3" />
        </Row>
        <Row>
          <Col md="10" className="mb-4">
            <LogLevelSummaryChart
              data={logLevelCharts}
              showLog={showLog}
              setTimeSelection={setTimeSelection}
              timeOptions={timeOptions}
              selectedTime={selectedTime}
              timeLabels={timeSelection.chartLabels}
            />
          </Col>
          <Col md="2" className="mb-4">
            <LogLevelPieChart data={logLevels} />
          </Col>
        </Row>
        <LogsTable data={logs} showLogDetails={showLogDetails} />
      </div>
    </Container>
  );
}

export { LogsView };
