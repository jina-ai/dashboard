import React, { useRef, useState, useCallback, useEffect } from "react"
import { useTheme } from "@emotion/react"
import ChartElement, { ChartOptions } from "chart.js"
//todo type this when taskView is back
type Props = {
  speed: {
    history: any
    current: any
    unit: any
  }
}

function SpeedCard({ speed }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [chartInstance, setChartInstance] = useState<ChartElement | null>(null)
  const { history } = speed
  const { palette } = useTheme()

  let maxValue = Math.max(...history)
  let minValue = Math.min(...history)

  const getChartOptions = useCallback((): ChartOptions => {
    const difference = maxValue - minValue
    return {
      maintainAspectRatio: true,
      responsive: true,
      animation: { duration: 0 },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
      layout: {
        padding: {
          bottom: -10,
          left: -10,
        },
      },
      elements: {
        point: {
          radius: 0,
        },
        line: {
          tension: 0.33,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            scaleLabel: {
              padding: 0,
              display: false,
            },
            ticks: {
              display: false,
              // Avoid getting the graph line cut of at the top of the canvas.
              // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
              suggestedMax: maxValue + difference * 0.1,
              suggestedMin: minValue - difference * 0.1,
            },
          },
        ],
      },
    }
  }, [maxValue, minValue])

  const getChartConfig = useCallback(
    (chartOptions) => {
      return {
        type: "line",
        data: {
          labels: new Array(history.length).fill(null),
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(0, 153, 153, 0.25)",
              borderColor: palette.primary,
              data: history,
            },
          ],
        },
        options: chartOptions,
      }
    },
    [history, palette.primary]
  )

  useEffect(() => {
    if (!canvasRef.current) return
    const chartOptions = getChartOptions()
    const chartConfig = getChartConfig(chartOptions)
    const newChartInstance = new ChartElement(canvasRef.current, chartConfig)
    setChartInstance(newChartInstance)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!chartInstance) return
    let newChartData = {
      ...chartInstance.data,
      ...{
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 153, 153, 0.25)",
            borderColor: palette.primary,
            data: history,
          },
        ],
      },
    }
    chartInstance.options = getChartOptions()
    chartInstance.data = newChartData
    chartInstance.update()
  }, [history, chartInstance, getChartOptions, getChartConfig, palette.primary])

  return (
    <div className="pt-0 h-100 stats-small">
      <div className="stats-small__data mx-auto">
        <h6 className="stats-small__label text-uppercase text-center mb-0 pt-0 mt-0">
          <b>Speed</b>
        </h6>
        <h2 className="my-3 mx-auto">{speed.current}</h2>
        <h6 className="stats-small__label under text-uppercase text-center">
          {speed.unit}/Second
        </h6>
      </div>
      <canvas height="100" ref={canvasRef} className="stats-small-1" />
    </div>
  )
}

export default SpeedCard
