import React, { useRef, useEffect, useState } from "react";
import ChartElement, {
  ChartConfiguration,
  ChartOptions,
  ChartData,
  ChartDataSets,
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

function getParsedDatasets(data: LogLevelSummaryChartData) {
  const datasets = Object.keys(_levels).map(
    (level): ChartDataSets => {
      const levelData = data.map((tick: any) => tick.levels[level]);
      return {
        barPercentage: 0.75,
        categoryPercentage: 1,
        label: level,
        fill: "start",
        backgroundColor: _levels[level].backgroundColor,
        data: levelData,
      };
    }
  );
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
      return (numSeconds ? numSeconds / 2 : 0) + "s ago";
    return;
  }

  function getYAxisLabel(value: any) {
    if (Number.isInteger(value)) {
      return value;
    }
  }

  function ChartLegend() {
    return (
      <div className="chart-legend mt-1 mb-3">
        {Object.entries(_levels).map(([level, style]: [string, any]) => (
          <div className="chart-legend-item">
            <div className={`chart-legend-indicator mr-1 ${level.toLowerCase()}`} style={{backgroundColor:style.borderColor}}/>
            <span className="chart-legend-caption mr-2">{level}</span>
          </div>
        ))}
      </div>
    );
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
        display: false,
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
            gridLines: {
              zeroLineColor: "#cfd8dc",
              color: "#cfd8dc",
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: false,
            },
            gridLines: {
              borderDash: [5, 5],
              zeroLineColor: "#cfd8dc",
              drawBorder: false,
              color: "#cfd8dc",
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
    <>
      <ChartLegend />
      <canvas
        height={height || DEFAULT_HEIGHT}
        width={width || DEFAULT_WIDTH}
        ref={canvasRef}
      />
    </>
  );
}

export default ChartBase;
