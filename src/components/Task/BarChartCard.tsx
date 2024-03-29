import React, { useRef, useEffect, useState, useCallback } from "react"
import ChartElement, {
  ChartConfiguration,
  ChartOptions,
  ChartData,
} from "chart.js"
import { formatBytes } from "../../helpers"
import { useTheme } from "@emotion/react"

//todo type this when tasks are back
type Props = {
  messages: any
  bytes: any
}

function BarChartCard(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [chartInstance, setChartInstance] = useState<ChartElement | null>(null)
  const [currentTab, setCurrentTab] = useState<keyof Props>("messages")
  const { palette } = useTheme()

  const chartData = props[currentTab]

  const getChartOptions = useCallback((): ChartOptions => {
    return {
      animation: { duration: 0 },
      tooltips: {
        callbacks: {
          title: function (tooltipItem: any) {
            return `Pod: ${tooltipItem[0].xLabel}`
          },
          label: (tooltipItem: any, data: any) => {
            let label = `${data.datasets[tooltipItem.datasetIndex].label}: ${
              currentTab === "bytes"
                ? formatBytes(tooltipItem.value)
                : tooltipItem.value
            }`
            return label
          },
          afterLabel: (tooltipItem: any) => {
            let text = "\nProcess ID: " + chartData[tooltipItem.index].process
            return text
          },
        },
      },
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
            ticks: {
              callback: (label: number) => {
                if (currentTab === "bytes") return formatBytes(label)
                return label > 999 ? `${(label / 1000).toFixed(0)}k` : label
              },
            },
          },
        ],
      },
      maintainAspectRatio: false,
    }
  }, [chartData, currentTab])

  const getChartConfig = useCallback(
    (chartOptions: ChartOptions): ChartConfiguration => {
      return {
        type: "bar",
        options: chartOptions,
        data: {
          labels: chartData.map((d: any) => d.node),
          datasets: [
            {
              label: "msg sent",
              fill: "start",
              data: chartData.map((d: any) => d.sent),
              backgroundColor: palette.primary,
              borderColor: palette.primary,
              pointBackgroundColor: palette.background,
              pointHoverBackgroundColor: palette.primary,
              borderWidth: 1.5,
            },
            {
              label: "msg received",
              fill: "start",
              data: chartData.map((d: any) => d.received),
              backgroundColor: palette.success,
              borderColor: palette.success,
              pointBackgroundColor: palette.background,
              pointHoverBackgroundColor: palette.success,
              borderWidth: 1.5,
            },
          ],
        },
      }
    },
    [chartData, palette.success, palette.primary, palette.background]
  )

  const getChartData = useCallback(() => {
    return {
      labels: chartData.map((d: any) => d.node),
      datasets: [
        {
          label: `${currentTab} sent`,
          fill: "start",
          data: chartData.map((d: any) => d.sent),
          backgroundColor: palette.primary,
          borderColor: palette.primary,
          pointBackgroundColor: palette.background,
          pointHoverBackgroundColor: palette.primary,
          borderWidth: 1.5,
        },
        {
          label: `${currentTab} received`,
          fill: "start",
          data: chartData.map((d: any) => d.received),
          backgroundColor: palette.success,
          borderColor: palette.success,
          pointBackgroundColor: palette.background,
          pointHoverBackgroundColor: palette.success,
          borderWidth: 1.5,
        },
      ],
    }
  }, [
    chartData,
    currentTab,
    palette.success,
    palette.primary,
    palette.background,
  ])

  useEffect(() => {
    if (!canvasRef.current) return
    const chartOptions: ChartOptions = getChartOptions()
    const chartConfig: ChartConfiguration = getChartConfig(chartOptions)
    const newChartInstance = new ChartElement(canvasRef.current, chartConfig)
    setChartInstance(newChartInstance)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!chartInstance) return
    const newData: ChartData = getChartData()
    const newOptions: ChartOptions = getChartOptions()
    chartInstance.options = newOptions
    chartInstance.data = newData
    chartInstance.update()
  }, [chartData, chartInstance, currentTab, getChartData, getChartOptions])

  return (
    <div className="mb-4">
      <div>
        <h6 className="m-0">Network Load</h6>
      </div>

      <div className="pt-0">
        <div className="py-2">
          <div className="mb-2">
            <div>
              <div
                theme="white"
                active={currentTab === "messages"}
                onClick={() => setCurrentTab("messages")}
              >
                Messages
              </div>
              <div
                theme="white"
                active={currentTab === "bytes"}
                onClick={() => setCurrentTab("bytes")}
              >
                Bytes
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: "relative", height: 300 }}>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  )
}

export default BarChartCard
