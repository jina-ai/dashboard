import React from "react"
import  Card from "@material-ui/core/Card"
import  CardHeader from "@material-ui/core/CardHeader"
import  CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import BarChart from "./BarChartBase"
import { MultiFilterSelect } from "../Common/MultiFilterSelect"
import { LogLevelSummaryChartData } from "./types"
import { TimePreference } from "../../views/LogsView"

const DEFAULT_HEIGHT = 10
const DEFAULT_WIDTH = 70

const DEFAULT_HEIGHT_SMALL = 20
const DEFAULT_WIDTH_SMALL = 50

type Props = {
  data: {
    data: LogLevelSummaryChartData
    lastTimestamp: number
    numSeconds: number
    numTicks: number
  }
  showLog: (activePoints: { _index: number }[]) => void
  setTimeSelection: (timeSelection: TimePreference) => void
  timeOptions: { [key: string]: { value: string; label: string } }
  selectedTime: string
  timeLabels: string[]
}

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
      <CardHeader className="p-2 px-3">
        <Grid container>
          <Grid data-name="logOccurenceTitle">Log Occurences by Level</Grid>
          <Grid className="text-right" data-name="logOccurenceDurationSelect">
            <MultiFilterSelect
              clearAfter
              options={Object.values(timeOptions)}
              onFilterChange={(option) => setTimeSelection(option[0].value)}
              className="logstream-select text-left"
              placeholder={
                <span data-name="logOccurenceDurationSelectedOption">
                  <i className="material-icons mr-2">access_time</i>
                  {timeOptions[selectedTime].label}
                </span>
              }
              isSearchable={false}
            />
          </Grid>
        </Grid>
      </CardHeader>
      <CardContent className="d-none d-md-block p-0 pb-2 px-3">
        <BarChart
          timeLabels={timeLabels}
          data={data}
          numTicks={numTicks}
          height={DEFAULT_HEIGHT}
          width={DEFAULT_WIDTH}
          onClick={showLog}
        />
      </CardContent>
      <CardContent className="d-md-none pb-2">
        <BarChart
          timeLabels={timeLabels}
          data={data}
          numTicks={numTicks}
          height={DEFAULT_HEIGHT_SMALL}
          width={DEFAULT_WIDTH_SMALL}
          onClick={showLog}
        />
      </CardContent>
    </Card>
  )
}

export { LogLevelSummaryChart }
