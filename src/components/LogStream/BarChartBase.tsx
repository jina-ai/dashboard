import React, { useRef, useEffect, useState, useCallback } from "react";
import ChartElement, {
  ChartConfiguration,
  ChartOptions,
  ChartData,
  ChartDataSets,
} from "chart.js";
import { LogLevelSummaryChartData } from "./types";
import { getLevels } from "./levels";
import { Theme, useTheme } from "@emotion/react";

const DEFAULT_HEIGHT = 10;
const DEFAULT_WIDTH = 100;

function getParsedDatasets(data: LogLevelSummaryChartData, theme: Theme) {
  const levels = getLevels(theme);
  const datasets = Object.keys(levels).map(
    (level): ChartDataSets => {
      const levelData = data.map((tick: any) => tick.levels[level]);
      return {
        barPercentage: 0.75,
        categoryPercentage: 1,
        label: level,
        fill: "start",
        backgroundColor: levels[level].backgroundColor,
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
  numTicks?: number;
  data: LogLevelSummaryChartData;
  onClick: (activePoints: any) => void;
  timeLabels: string[];
};

function ChartBase({
  width,
  height,
  data,
  numTicks,
  onClick,
  timeLabels,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<ChartElement | null>(null);
  // Get theme from ThemeProvider (for usecases like dark mode)
  const theme = useTheme();

  function onClickChart(e: any) {
    if (!chartInstance) return;
    const activePoints = chartInstance.getElementsAtEvent(e);
    onClick(activePoints);
  }

  const getXAxisLabel = useCallback(
    (value: any, index: number, values: any) => {
      if (index === 0) return timeLabels[0];
      else if (index === Math.floor(values.length / 2)) return timeLabels[1];
      return;
    },
    [timeLabels]
  );

  function getYAxisLabel(value: any) {
    if (Number.isInteger(value)) {
      return value;
    }
  }

  function ChartLegend() {
    return (
      <div className="chart-legend mt-1 mb-3">
        {Object.entries(getLevels(theme)).map(
          ([level, style]: [string, any]) => (
            <div className="chart-legend-item" key={level}>
              <div
                className={`chart-legend-indicator mr-1 ${level.toLowerCase()}`}
                style={{ backgroundColor: style.borderColor }}
              />
              <span className="chart-legend-caption mr-2">{level}</span>
            </div>
          )
        )}
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
              autoSkip: false,
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
        datasets: getParsedDatasets(data, theme),
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
      datasets: getParsedDatasets(data, theme),
    };
    chartInstance.data = chartData;
    chartInstance.update();
  }, [data, chartInstance, numTicks, theme]);

  useEffect(() => {
    if (
      chartInstance &&
      chartInstance.options.scales &&
      chartInstance.options.scales.xAxes &&
      chartInstance.options.scales.xAxes[0].ticks
    ) {
      chartInstance.options.scales.xAxes[0].ticks.callback = getXAxisLabel;
      chartInstance.update();
    }
  }, [getXAxisLabel, chartInstance]);

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
