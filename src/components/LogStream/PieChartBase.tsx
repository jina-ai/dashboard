import React, { useRef, useEffect, useState } from "react";
import ChartElement, {
  ChartConfiguration,
  ChartOptions,
  ChartData,
} from "chart.js";
import { LogLevelPieChartData } from "./types";

const DEFAULT_HEIGHT = 50;
const DEFAULT_WIDTH = 50;

const _colors = [
  {
    border: "#fff",
    background: "rgba(0, 153, 153, 0.85)",
  },
  {
    border: "#fff",
    background: "rgba(0, 153, 153, 0.75)",
  },
  {
    border: "#fff",
    background: "rgba(0, 153, 153, 0.65)",
  },
  {
    border: "#fff",
    background: "rgba(0, 153, 153, 0.55)",
  },
  {
    border: "#fff",
    background: "rgba(0, 153, 153, 0.45)",
  },
  {
    border: "#fff",
    background: "rgba(0, 153, 153, 0.35)",
  },
  {
    border: "#fff",
    background: "rgba(0, 153, 153, 0.25)",
  },
  {
    border: "#fff",
    background: "rgba(0, 153, 153, 0.15)",
  },
  {
    border: "#fff",
    background: "rgba(0, 153, 153, 0.05)",
  },
];

type Props = {
  width?: number;
  height?: number;
  data: LogLevelPieChartData;
};

function PieChartBase({ width, height, data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<ChartElement | null>(null);

  function getColor(index: number) {
    let color: any = false;
    while (!color) {
      if (_colors[index]) color = _colors[index];
      else index -= _colors.length;
    }
    return color;
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
            borderColor: names.map((name, idx) => getColor(idx).border),
            backgroundColor: names.map((name, idx) => getColor(idx).background),
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
          borderColor: names.map((name, idx) => getColor(idx).border),
          backgroundColor: names.map((name, idx) => getColor(idx).background),
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
