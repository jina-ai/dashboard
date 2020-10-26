import React, { useRef, useEffect, useState } from "react";
import ChartElement, {
  ChartConfiguration,
  ChartOptions,
  ChartData,
} from "chart.js";
import { LogLevelSummaryChartData } from "./types";

const DEFAULT_HEIGHT = 10;
const DEFAULT_WIDTH = 100;

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

function getParsedDatasets(data: LogLevelSummaryChartData): any {
  const datasets = Object.keys(_levels).map((level) => {
    const levelData = data.map((tick: any) => tick.levels[level]);
    return {
      label: level,
      fill: "start",
      borderWidth: 1.5,
      borderColor: _levels[level].borderColor,
      backgroundColor: _levels[level].backgroundColor,
      data: levelData,
    };
  });
  return datasets;
}

function getLabels(amount?: number): number[] {
  const labels = [];
  for (let i = 0; i < (amount || 0); ++i) {
    labels.push(i);
  }
  return labels;
}

type Props = {
  width?: number;
  height?: number;
  numSeconds?: number;
  numTicks?: number;
  data: LogLevelSummaryChartData;
  onClick: (activePoints: any) => void;
};

function ChartBase({
  width,
  height,
  numSeconds,
  data,
  numTicks,
  onClick,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<ChartElement | null>(null);

  function onClickChart(e: any) {
    if (!chartInstance) return;
    const activePoints = chartInstance.getElementsAtEvent(e);
    onClick(activePoints);
  }

  function getXAxisLabel(value: any, index: number, values: any) {
    if (index === 0) return numSeconds + "s ago";
    else if (index === Math.floor(values.length / 2))
      return numSeconds ? numSeconds / 2 : 0 + "s ago";
    return;
  }

  function getYAxisLabel(value: any) {
    if (Number.isInteger(value)) {
      return value;
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const chartOptions: ChartOptions = {
      animation: { duration: 0 },
      events: ["click"],
      onClick: onClickChart,
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        position: "top",
        labels: {
          padding: 10,
          boxWidth: 15,
        },
      },
      tooltips: {
        enabled: false,
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 20,
        },
      },
      scales: {
        xAxes: [
          {
            stacked: true,
            ticks: {
              padding: 5,
              maxRotation: 0,
              callback: getXAxisLabel,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: "Occurences",
            },
            gridLines: {
              borderDash: [2.5, 5],
              zeroLineColor: "#6c757d",
              drawBorder: false,
              color: "#6c757d",
            },
            ticks: {
              padding: 5,
              suggestedMin: 0,
              autoSkip: true,
              maxTicksLimit: 4,
              callback: getYAxisLabel,
            },
          },
        ],
      },
    };

    const chartConfig: ChartConfiguration = {
      type: "bar",
      data: {
        datasets: getParsedDatasets(data),
      },
      options: chartOptions,
    };

    const newChartInstance = new ChartElement(canvasRef.current, chartConfig);
    setChartInstance(newChartInstance);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!chartInstance) return;
    const chartData: ChartData = {
      labels: getLabels(numTicks),
      datasets: getParsedDatasets(data),
    };
    chartInstance.data = chartData;
    chartInstance.update();
  }, [data, chartInstance, numTicks]);

  return (
    <canvas
      height={height || DEFAULT_HEIGHT}
      width={width || DEFAULT_WIDTH}
      ref={canvasRef}
    />
  );
}

export default ChartBase;
