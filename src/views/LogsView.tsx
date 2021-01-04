import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LogLevelSummaryChart } from "../components/LogStream/LogLevelSummaryChart";
import { LogLevelPieChart } from "../components/LogStream/LogLevelPieChart";
import { PageTitle } from "../components/Common/PageTitle";
import { LogsTable } from "../components/LogStream/LogsTable";
import { Store, Dispatcher, Constants } from "../flux";

const LOGS_UPDATE_INTERVAL = 20;
const CHART_UPDATE_INTERVAL = 1000;

let chartUpdateInterval: any;
let logsUpdateInterval: any;

const DEFAULT_TIME_SELECTION = "60second";

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

type TimePreference = "60second" | "15minute" | "1hour";

const showLogDetails = (log: any) => {
  Dispatcher.dispatch({
    actionType: Constants.SHOW_MODAL,
    payload: { modal: "logDetails", modalParams: { log } },
  });
};

function showLogInTable(index: number) {
  Dispatcher.dispatch({
    actionType: Constants.SHOW_LOG_AT_INDEX,
    payload: index,
  });
}

function LogsView() {
  const hasNewLogs = React.useRef(false);
  const [logs, setLogs] = useState(() => Store.getLogs());
  const [selectedTime, setSelectedTime] = useState(() =>
    getInitialTimeSelection()
  );
  const [logLevelOccurrences, setLogLevelOccurrences] = useState(() =>
    Store.getLogLevelOccurences()
  );
  const [logLevelCharts, setLogLevelCharts] = useState(() =>
    Store.getLogLevelCharts(numSeconds[selectedTime])
  );

  function setTimeSelection(time: TimePreference) {
    setSelectedTime(time);
    setUserTimePreference(time);
  }

  function updateLogs() {
    const newLogs = Store.getLogs();
    const newOccurrences = Store.getLogLevelOccurences();
    setLogs([...newLogs]);
    setLogLevelOccurrences({ ...newOccurrences });
  }

  const updateChart = useCallback(() => {
    const newCharts = Store.getLogLevelCharts(numSeconds[selectedTime]);
    setLogLevelCharts({ ...newCharts });
  }, [selectedTime]);

  function showLog(activePoints: any) {
    const { data } = logLevelCharts;
    let index = activePoints[0] && activePoints[0]._index;
    if (index && typeof index !== "undefined") {
      const { lastLog } = data[index];
      showLogInTable(lastLog);
    }
  }

  function checkForNewLogs() {
    if (!hasNewLogs.current) return;
    hasNewLogs.current = false;
    updateLogs();
  }

  function onNewLogs() {
    hasNewLogs.current = true;
  }

  useEffect(() => {
    Store.on("update-logs", onNewLogs);
    logsUpdateInterval = setInterval(checkForNewLogs, LOGS_UPDATE_INTERVAL);
    chartUpdateInterval = setInterval(updateChart, CHART_UPDATE_INTERVAL);
    return () => {
      Store.removeListener("update-logs", onNewLogs);
      clearInterval(logsUpdateInterval);
      clearInterval(chartUpdateInterval);
    };
  }, [updateChart]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    updateChart();
  }, [updateChart]);

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
            <LogLevelPieChart data={logLevelOccurrences} />
          </Col>
        </Row>
        <LogsTable data={logs} showLogDetails={showLogDetails} />
      </div>
    </Container>
  );
}

export { LogsView };
