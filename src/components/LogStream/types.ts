import { Levels } from "../../redux/logStream/logStream.types"

export type LogLevelPieChartData = {
  [key: string]: number
}

export type LogLevelSummaryChartData = {
  lastLog: number
  levels: Levels
}[]
