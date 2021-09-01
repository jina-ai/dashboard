import React, { useRef, useState, useCallback, useEffect } from "react"

import ChartElement, { ChartOptions } from "chart.js"

type Props = {
  qps: {
    history: number[]
    current: number
  }
}

function QueriesPerSecondCard({ qps }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [chartInstance, setChartInstance] = useState<ChartElement | null>(null)
  const { history } = qps

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
      elements: {
        point: {
          radius: 0,
        },
        line: {
          tension: 0.33,
        },
      },
      layout: {
        padding: {
          bottom: -10,
          left: -10,
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
              backgroundColor: "rgba(50, 200, 205, 0.25)",
              borderColor: "#32c8cd",
              data: history,
            },
          ],
        },
        options: chartOptions,
      }
    },
    [history]
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
            backgroundColor: "rgba(50, 200, 205, 0.25)",
            borderColor: "#32c8cd",
            data: history,
          },
        ],
      },
    }
    chartInstance.options = getChartOptions()
    chartInstance.data = newChartData
    chartInstance.update()
  }, [history, chartInstance, getChartOptions, getChartConfig])

  return (
    <div className="pt-0 h-100 stats-small">
      <div className="stats-small__data mx-auto">
        <h6 className="stats-small__label text-uppercase text-center mb-0 pt-0 mt-0">
          <b>QPS</b>
        </h6>
        <h2 className="my-3 mx-auto">{qps.current}</h2>
        <h6 className="stats-small__label under text-uppercase text-center">
          Queries/Second
        </h6>
      </div>
      <canvas height="100" ref={canvasRef} className="stats-small-1" />
    </div>
  )
}

export default QueriesPerSecondCard
