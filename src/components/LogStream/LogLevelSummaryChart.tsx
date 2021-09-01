import React from "react"
import BarChart from "./BarChartBase"
import { MultiFilterSelect } from "../Common/MultiFilterSelect"
import { LogLevelSummaryChartData } from "./types"
import { TimePreference } from "../../views/LogsView"
import Card from "../Common/Card"

const DEFAULT_HEIGHT = 10
const DEFAULT_WIDTH = 70

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
    <Card className="h-full flex-col mr-4">
      <>
        <div className="p-2 px-3">
          <div>
            <div data-name="logOccurenceTitle">Log Occurences by Level</div>
            <div className="text-right" data-name="logOccurenceDurationSelect">
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
            </div>
          </div>
        </div>
        <div className="d-none d-md-block p-0 pb-2 px-3">
          <BarChart
            timeLabels={timeLabels}
            data={data}
            numTicks={numTicks}
            height={DEFAULT_HEIGHT}
            width={DEFAULT_WIDTH}
            onClick={showLog}
          />
        </div>
      </>
    </Card>
  )
}

export { LogLevelSummaryChart }
