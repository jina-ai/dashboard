import React, { useRef, useEffect, useState, useCallback } from "react"
import ChartElement, {
  ChartConfiguration,
  ChartOptions,
  ChartData,
} from "chart.js"
import { useTheme } from "@emotion/react"
import { getLevelPalette } from "./levels"
import { LogLevels } from "../../redux/logStream/logStream.types"

const DEFAULT_HEIGHT = 50
const DEFAULT_WIDTH = 50

type Props = {
  width?: number
  height?: number
  data: LogLevels
}

function PieChartBase({ width, height, data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [chartInstance, setChartInstance] = useState<ChartElement | null>(null)
  const theme = useTheme()

  const getColor = useCallback(
    (key: string) => {
      return getLevelPalette(theme)[key]
    },
    [theme]
  )

  useEffect(() => {
    if (!canvasRef.current) return
    const names = Object.keys(data)
    const chartOptions: ChartOptions = {
      animation: { duration: 0 },
      legend: {
        display: false,
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 20,
        },
      },
      tooltips: {
        mode: "index",
        position: "nearest",
      },
    }

    const chartConfig: ChartConfiguration = {
      type: "pie",
      data: {
        datasets: [
          {
            borderWidth: 1,
            data: Object.values(data),
            borderColor: names.map((name) => getColor(name).borderColor),
            backgroundColor: names.map(
              (name) => getColor(name).backgroundColor
            ),
          },
        ],
      },
      options: chartOptions,
    }

    const newChartInstance = new ChartElement(canvasRef.current, chartConfig)
    setChartInstance(newChartInstance)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!chartInstance) return
    const names = Object.keys(data)
    const chartData: ChartData = {
      labels: names,
      datasets: [
        {
          borderWidth: 1,
          data: Object.values(data),
          borderColor: names.map((name) => getColor(name).borderColor),
          backgroundColor: names.map((name) => getColor(name).backgroundColor),
        },
      ],
    }
    chartInstance.data = chartData
    chartInstance.update()
  }, [data, chartInstance, getColor])

  return (
    <canvas
      height={height || DEFAULT_HEIGHT}
      width={width || DEFAULT_WIDTH}
      ref={canvasRef}
    />
  )
}

export default PieChartBase
