import { Group } from "./Group";
import React from "react";
import { scaleLinear, scaleBand } from "d3";
import { Orientation } from "@visx/axis";
import { AnimatedAxis } from "@visx/react-spring";
import { Bar } from "./Bar";

const margin = { left: 256, right: 64, top: 64, bottom: 64 };

type Props = {
  width: number;
  height: number;
  data: { key: string; value: number }[];
};

function getRange(list: number[]) {
  const min = list.reduce((acc, curr) => Math.min(acc, curr), Infinity);
  const max = list.reduce((acc, curr) => Math.max(acc, curr), -Infinity);
  return [min, max];
}

function Chart({ width: outerWidth, height: outerHeight, data }: Props) {
  const width = outerWidth - (margin.left + margin.right);
  const height = outerHeight - (margin.top + margin.bottom);
  const yScale = scaleBand<typeof data[number]["key"]>()
    .range([0, height])
    .domain(data.sort((a, b) => b.value - a.value).map((d) => d.key))
    .padding(0.4);

  const xScale = scaleLinear()
    .domain([0, getRange(data.map((d: any) => d.value))[1]])
    .range([0, width]);
  console.log(yScale.domain());

  return (
    <svg width={outerWidth} height={outerHeight}>
      <Group top={margin.top} left={margin.left}>
        {data.map((datum) => (
          <Bar
            key={datum.key}
            y={yScale(datum.key) as number}
            x={xScale(0) as number}
            height={yScale.bandwidth() as number}
            width={xScale(datum.value) as number}
          />
        ))}
        <AnimatedAxis
          orientation={Orientation.left}
          hideAxisLine
          scale={yScale}
          numTicks={100}
          tickLabelProps={() => ({ textAnchor: "end", textAlign: "justify" })}
          hideTicks
        />
      </Group>
    </svg>
  );
}

export { Chart };
