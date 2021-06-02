import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import Grid from "@material-ui/core/Grid"
import { LogLevelSummaryChart } from "../components/LogStream/LogLevelSummaryChart"
import { LogLevelPieChart } from "../components/LogStream/LogLevelPieChart"
import { PageTitle } from "../components/Common/PageTitle"
import { LogsTable } from "../components/LogStream/LogsTable"
import { useDispatch, useSelector } from "react-redux"
import { showLogAtIndex } from "../redux/logStream/logStream.actions"
import {
  selectLogLevelOccurrences,
  selectLogLevels,
  selectLogs,
} from "../redux/logStream/logStream.selectors"

import { getLogLevelCharts } from "../helpers/format"
import { showModal } from "../redux/global/global.actions"
import { RawLog } from "../redux/logStream/logStream.types"

export type TimePreference = "60second" | "15minute" | "1hour"

const DEFAULT_TIME_SELECTION: TimePreference = "60second"

const MAX_CHART_TICKS = 60

const TIME_PREFERENCE_NAME = "logs-time-preference"

export const ViewContainer = styled.div`
  padding: 1rem;
`
const timeOptions: {
  [key: string]: { value: string; label: string; chartLabels: string[] }
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
}

const numSeconds: { [key: string]: number } = {
  "60second": 60,
  "15minute": 900,
  "1hour": 3600,
}

function getUserTimePreference() {
  const preference = localStorage.getItem(TIME_PREFERENCE_NAME)
  if (preference && timeOptions[preference]) return preference
  return false
}

function setUserTimePreference(preference: string) {
  localStorage.setItem(TIME_PREFERENCE_NAME, preference)
}

function getInitialTimeSelection() {
  return getUserTimePreference() || DEFAULT_TIME_SELECTION
}

function LogsView() {
  const dispatch = useDispatch()

  const logLevelOccurrences = useSelector(selectLogLevelOccurrences)
  const logs = useSelector(selectLogs)
  const logLevels = useSelector(selectLogLevels)
  const [selectedTime, setSelectedTime] = useState(() =>
    getInitialTimeSelection()
  )

  const [logLevelCharts, setLogLevelCharts] = useState(() =>
    getLogLevelCharts(
      numSeconds[selectedTime],
      MAX_CHART_TICKS,
      logLevelOccurrences,
      new Date()
    )
  )

  function showLogDetails(log: RawLog) {
    dispatch(showModal("logDetails", { log }))
  }

  function setTimeSelection(time: TimePreference) {
    setSelectedTime(time)
    setUserTimePreference(time)
  }

  useEffect(() => {
    const currentDate = new Date()
    const newCharts = getLogLevelCharts(
      numSeconds[selectedTime],
      MAX_CHART_TICKS,
      logLevelOccurrences,
      currentDate
    )
    setLogLevelCharts({ ...newCharts })
  }, [selectedTime, logLevelOccurrences])

  function showLog(activePoints: { _index: number }[]) {
    const { data } = logLevelCharts
    let index = activePoints[0] && activePoints[0]._index
    if (index && typeof index !== "undefined") {
      const { lastLog } = data[index]
      dispatch(showLogAtIndex(lastLog))
    }
  }

  const timeSelection = timeOptions[selectedTime]

  return (
    <ViewContainer>
      <PageTitle title="Log Stream" className="text-sm-left mb-3" />
      <Grid container spacing={2}>
        <Grid item md={10}>
          <LogLevelSummaryChart
            data={logLevelCharts}
            showLog={showLog}
            setTimeSelection={setTimeSelection}
            timeOptions={timeOptions}
            selectedTime={selectedTime}
            timeLabels={timeSelection.chartLabels}
          />
        </Grid>
        <Grid item md={2}>
          <LogLevelPieChart data={logLevels} />
        </Grid>
        <Grid item md={12}>
          <LogsTable data={logs} showLogDetails={showLogDetails} />
        </Grid>
      </Grid>
    </ViewContainer>
  )
}

export { LogsView }
