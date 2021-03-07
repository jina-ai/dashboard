import React, { useRef, useEffect, useState, useCallback } from "react";
import ChartElement, {
  ChartConfiguration,
  ChartOptions,
  ChartData,
} from "chart.js";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  ButtonGroup,
  Button,
} from "shards-react";
import { formatBytes } from "../../helpers";
import { useTheme } from "@emotion/react";

function BarChartCard(props: any) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<ChartElement | null>(null);
  const [currentTab, setCurrentTab] = useState("messages");
  const { palette } = useTheme();

  const chartData = props[currentTab];

  const getChartOptions = useCallback((): ChartOptions => {
    return {
      animation: { duration: 0 },
      tooltips: {
        callbacks: {
          title: function (tooltipItem: any) {
            return `Pod: ${tooltipItem[0].xLabel}`;
          },
          label: (tooltipItem: any, data: any) => {
            let label = `${data.datasets[tooltipItem.datasetIndex].label}: ${
              currentTab === "bytes"
                ? formatBytes(tooltipItem.value)
                : tooltipItem.value
            }`;
            return label;
          },
          afterLabel: (tooltipItem: any) => {
            let text = "\nProcess ID: " + chartData[tooltipItem.index].process;
            return text;
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
                if (currentTab === "bytes") return formatBytes(label);
                return label > 999 ? `${(label / 1000).toFixed(0)}k` : label;
              },
            },
          },
        ],
      },
      maintainAspectRatio: false,
    };
  }, [chartData, currentTab]);

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
      };
    },
    [chartData, palette.success, palette.primary, palette.background]
  );

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
    };
  }, [
    chartData,
    currentTab,
    palette.success,
    palette.primary,
    palette.background,
  ]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chartOptions: ChartOptions = getChartOptions();
    const chartConfig: ChartConfiguration = getChartConfig(chartOptions);
    const newChartInstance = new ChartElement(canvasRef.current, chartConfig);
    setChartInstance(newChartInstance);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!chartInstance) return;
    const newData: ChartData = getChartData();
    const newOptions: ChartOptions = getChartOptions();
    chartInstance.options = newOptions;
    chartInstance.data = newData;
    chartInstance.update();
  }, [chartData, chartInstance, currentTab, getChartData, getChartOptions]);

  return (
    <Card small className="h-100 mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Network Load</h6>
      </CardHeader>

      <CardBody className="pt-0">
        <Row className="border-bottom py-2 bg-light">
          <Col sm="6" className="col d-flex mb-2 mb-sm-0">
            <ButtonGroup>
              <Button
                theme="white"
                active={currentTab === "messages"}
                onClick={() => setCurrentTab("messages")}
              >
                Messages
              </Button>
              <Button
                theme="white"
                active={currentTab === "bytes"}
                onClick={() => setCurrentTab("bytes")}
              >
                Bytes
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div style={{ position: "relative", height: 300 }}>
          <canvas ref={canvasRef} />
        </div>
      </CardBody>
    </Card>
  );
}

export default BarChartCard;
