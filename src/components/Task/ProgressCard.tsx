import React, { useEffect, useState, useRef } from "react"
import { Card } from "shards-react"

import ChartElement from "chart.js"

type Props = {
  progress: any //todo remove this when tasks are back
}

function ProgressCard({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [chartInstance, setChartInstance] = useState<ChartElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const newChartInstance = new ChartElement(canvasRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            hoverBorderColor: "#fff",
            data: [0, 100],
            backgroundColor: ["#32c8cd", "#E9ECEF"],
          },
        ],
        labels: ["Label 1", "Label 2"],
      },
      options: {
        legend: { display: false },
        responsive: false,
        cutoutPercentage: 70,
        animation: { duration: 0 },
        tooltips: {
          enabled: false,
        },
      },
    })
    setChartInstance(newChartInstance)
  }, [])

  useEffect(() => {
    if (!chartInstance) return
    const percent = (progress.num_bars / progress.bar_len || 1) * 100
    let newData = {
      datasets: [
        {
          hoverBorderColor: "#fff",
          data: [percent, 100 - percent],
          backgroundColor: ["#32c8cd", "#E9ECEF"],
        },
      ],
      labels: ["Label 1", "Label 2"],
    }
    chartInstance.data = newData
    chartInstance.update()
  }, [JSON.stringify(progress), chartInstance]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card className="p-3 h-100">
      <h6 className="stats-small__label text-uppercase text-center">
        <b>Progress</b>
      </h6>
      <div className="go-stats__chart mx-auto d-flex flex-row">
        <div className="mr-4 mt-3">
          <h6 className="stats-small__label text-uppercase text-center">
            Request
          </h6>
          <h4 className="mb-0">{progress.currentRequest}</h4>
        </div>

        <canvas
          ref={canvasRef}
          style={{ width: "100px", height: "100px" }}
          className="my-auto"
        />
      </div>
    </Card>
  )
}

export default ProgressCard
