import { formatForFlowchart } from "../flow-chart";
import { parseYAML } from "../format";
import { legacyYAML, v1YAML, formattedFlow } from "./flow-chart.testData";

describe("formatForFlowchart", () => {
  it("should parse and format v1 yaml syntax into a flow object", () => {
    const parsedYaml = parseYAML(v1YAML);
    const parsedFlow = formatForFlowchart(parsedYaml.data);
    expect(parsedFlow).toEqual(formattedFlow);
  });

  it("should parse and format legacy yaml syntax into a flow object", () => {
    const parsedYaml = parseYAML(legacyYAML);
    const parsedFlow = formatForFlowchart(parsedYaml.data);
    expect(parsedFlow).toEqual(formattedFlow);
  });

  it("should generate the same valid flow object for v1 and legacy yaml", () => {
    const parsedYamlLegacy = parseYAML(legacyYAML);
    const parsedFlowLegacy = formatForFlowchart(parsedYamlLegacy.data);

    const parsedYamlV1 = parseYAML(v1YAML);
    const parsedFlowV1 = formatForFlowchart(parsedYamlV1.data);

    expect(parsedFlowLegacy).toEqual(parsedFlowV1);
    expect(parsedFlowV1).toEqual(formattedFlow);
  });
});
