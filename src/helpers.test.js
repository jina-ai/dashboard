import { formatAsYAML } from "./helpers";
import { flow1 } from "./data/flowTestData";

test("outputs flow chart as valid jina-ai config", () => {
  expect(formatAsYAML(flow1.parsed)).toBe(flow1.yaml);
});
