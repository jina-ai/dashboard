import React from "react";
import { MultiSelect, Props } from "./MultiSelect";
import { Story, Meta } from "@storybook/react/types-6-0";

const options = [
  {
    value: "gateway",
    label: "gateway",
  },
  {
    value: "connector",
    label: "connector",
  },
  {
    value: "Flow",
    label: "Flow",
  },
  {
    value: "BaseExecutor",
    label: "BaseExecutor",
  },
];

const disabledOptions = [
  {
    value: "GatewayPea",
    label: "GatewayPea",
  },
  {
    value: "chunk_seg-head",
    label: "chunk_seg-head",
  },
  {
    value: "chunk_seg-tail",
    label: "chunk_seg-tail",
    isDisabled: true,
  },
];
export default {
  title: "MultiSelect",
  component: MultiSelect,
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ width: "400px", display: "flex", flexDirection: "row" }}>
    <MultiSelect {...args} />
  </div>
);

export const LogSource = Template.bind({});
LogSource.args = { options, width: "200px" };

export const DisabledSource = Template.bind({});
DisabledSource.args = { options: disabledOptions, width: "200px" };
