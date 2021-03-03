export type LogLevelPieChartData = {
  [key: string]: number
}

export type LogLevelSummaryChartData = {
  lastLog: number
  levels: {
    [key: string]: any
  }
}[]
