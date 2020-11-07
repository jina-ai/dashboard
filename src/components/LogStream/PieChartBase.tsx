import React, { useRef, useEffect, useState } from "react";
import ChartElement, {
  ChartConfiguration,
  ChartOptions,
  ChartData,
} from "chart.js";
import { LogLevelPieChartData } from "./types";

const DEFAULT_HEIGHT = 50;
const DEFAULT_WIDTH = 50;

const _levels: { [key: string]: any } = {
  INFO: {
    borderColor: "#009999",
    backgroundColor: "rgba(0, 153, 153, 0.9)",
  },
  SUCCESS: {
    borderColor: "#32c8cd",
    backgroundColor: "rgba(50, 200, 205, 0.9)",
  },
  WARNING: {
    borderColor: "#ffcc66",
    backgroundColor: "rgba(255, 204, 102, 0.9)",
  },
  ERROR: {
    borderColor: "#ff6666",
    backgroundColor: "rgba(255, 102, 102, 0.9)",
  },
  CRITICAL: {
    borderColor: "#ff4540",
    backgroundColor: "rgba(255, 70, 64, 0.9)",
  },
  DEBUG: {
    borderColor: "#6E7278",
    backgroundColor: "rgba(110, 114, 120, 0.9)",
  },
};

type Props = {
  width?: number;
  height?: number;
  data: LogLevelPieChartData;
};

function PieChartBase({ width, height, data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<ChartElement | null>(null);

  function getColor(key:string) {
    return _levels[key]
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const names = Object.keys(data);
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
    };

    const chartConfig: ChartConfiguration = {
      type: "pie",
      data: {
        datasets: [
          {
            borderWidth: 1,
            data: Object.values(data),
            borderColor: names.map(name => getColor(name).borderColor),
            backgroundColor: names.map(name => getColor(name).backgroundColor),
          },
        ],
      },
      options: chartOptions,
    };

    const newChartInstance = new ChartElement(canvasRef.current, chartConfig);
    setChartInstance(newChartInstance);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!chartInstance) return;
    const names = Object.keys(data);
    const chartData: ChartData = {
      labels: names,
      datasets: [
        {
          borderWidth: 1,
          data: Object.values(data),
          borderColor: names.map(name => getColor(name).borderColor),
          backgroundColor: names.map(name => getColor(name).backgroundColor),
        },
      ],
    };
    chartInstance.data = chartData;
    chartInstance.update();
  }, [data, chartInstance]);

  return (
    <canvas
      height={height || DEFAULT_HEIGHT}
      width={width || DEFAULT_WIDTH}
      ref={canvasRef}
    />
  );
}

export default PieChartBase;
