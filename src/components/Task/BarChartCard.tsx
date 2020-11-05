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

function BarChartCard(props: any) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<ChartElement | null>(null);
  const [currentTab, setCurrentTab] = useState("messages");

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
              backgroundColor: "#009999",
              borderColor: "#009999",
              pointBackgroundColor: "#FFFFFF",
              pointHoverBackgroundColor: "#009999",
              borderWidth: 1.5,
            },
            {
              label: "msg received",
              fill: "start",
              data: chartData.map((d: any) => d.received),
              backgroundColor: "#32C8CD",
              borderColor: "#32C8CD",
              pointBackgroundColor: "#FFFFFF",
              pointHoverBackgroundColor: "#32C8CD",
              borderWidth: 1.5,
            },
          ],
        },
      };
    },
    [chartData]
  );

  const getChartData = useCallback(() => {
    return {
      labels: chartData.map((d: any) => d.node),
      datasets: [
        {
          label: `${currentTab} sent`,
          fill: "start",
          data: chartData.map((d: any) => d.sent),
          backgroundColor: "#009999",
          borderColor: "#009999",
          pointBackgroundColor: "#FFFFFF",
          pointHoverBackgroundColor: "#009999",
          borderWidth: 1.5,
        },
        {
          label: `${currentTab} received`,
          fill: "start",
          data: chartData.map((d: any) => d.received),
          backgroundColor: "#32C8CD",
          borderColor: "#32C8CD",
          pointBackgroundColor: "#FFFFFF",
          pointHoverBackgroundColor: "#32C8CD",
          borderWidth: 1.5,
        },
      ],
    };
  }, [chartData, currentTab]);

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
        <canvas
          height="100"
          ref={canvasRef}
          style={{ maxWidth: "100% !important" }}
          className="sales-overview-sales-report"
        />
      </CardBody>
    </Card>
  );
}

export default BarChartCard;
