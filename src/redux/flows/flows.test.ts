import reducer from "./flows.reducer";
import {
  createNewFlow,
  deleteFlow,
  deleteNode,
  duplicateFlow,
  loadFlow,
  updateFlow,
  updateNode,
  importFlow,
  updateFlowArguments,
  updateFlowProperties,
} from "./flows.actions";
import { initialFlow } from "./flows.constants";
import { testFlowArguments, testFlowState } from "./flows.testData";

describe("flows reducer", () => {
  it("should delete a flows", () => {
    const oldNumberOfFlows = Object.keys(testFlowState.flows).length;
    const flowStateWithoutFlow2 = reducer(
      testFlowState,
      deleteFlow("testFlow2")
    );
    const newNumberOfFlows = Object.keys(flowStateWithoutFlow2.flows).length;

    expect(oldNumberOfFlows - newNumberOfFlows).toEqual(1);
    expect(
      Object.keys(testFlowState.flows).find((flowId) => flowId === "testFlow2")
    ).toEqual("testFlow2");
    expect(
      Object.keys(flowStateWithoutFlow2.flows).find(
        (flowId) => flowId === "testFlow2"
      )
    ).toBeUndefined();
  });

  it("should duplicate the flower flow", () => {
    const flowerYaml = testFlowState.flows.flower.yaml;
    if (flowerYaml) {
      const oldNumberOfFlows = Object.keys(testFlowState.flows).length;
      const flowStateWithDuplicatedFlowerFlow = reducer(
        testFlowState,
        duplicateFlow(flowerYaml)
      );
      const newNumberOfFlows = Object.keys(
        flowStateWithDuplicatedFlowerFlow.flows
      ).length;
      const duplicatedFlowerFlowIdAndProperty = Object.entries(
        flowStateWithDuplicatedFlowerFlow.flows
      ).find(([flowId, flowProperty]) => flowProperty.name === "Custom Flow 3");

      expect(newNumberOfFlows - oldNumberOfFlows).toBe(1);
      expect(duplicatedFlowerFlowIdAndProperty).toBeDefined();
      if (duplicatedFlowerFlowIdAndProperty) {
        expect(duplicatedFlowerFlowIdAndProperty[1].flow).toEqual(
          testFlowState.flows.flower.flow
        );
      }
    }
  });

  it("should import a new flow from YAML", () => {
    const flowerYaml = testFlowState.flows.flower.yaml;
    if (flowerYaml) {
      const oldNumberOfFlows = Object.keys(testFlowState.flows).length;
      const flowStateWithImportedFlowerFlow = reducer(
        testFlowState,
        importFlow(flowerYaml)
      );
      const newNumberOfFlows = Object.keys(
        flowStateWithImportedFlowerFlow.flows
      ).length;
      const importedFlowerFlowIdAndProperty = Object.entries(
        flowStateWithImportedFlowerFlow.flows
      ).find(([flowId, flowProperty]) => flowProperty.name === "Custom Flow 3");

      expect(newNumberOfFlows - oldNumberOfFlows).toBe(1);
      expect(importedFlowerFlowIdAndProperty).toBeDefined();
      if (importedFlowerFlowIdAndProperty) {
        expect(importedFlowerFlowIdAndProperty[1].flow).toEqual(
          testFlowState.flows.flower.flow
        );
      }
    }
  });

  it("should update a flows", () => {
    const testFlow2Flow = testFlowState.flows.testFlow2.flow;
    const selectedFlow = testFlowState.selectedFlow;
    const updatedState = reducer(testFlowState, updateFlow(testFlow2Flow));
    expect(selectedFlow).toBeDefined();
    if (selectedFlow) {
      expect(updatedState.flows[selectedFlow].flow).toEqual(testFlow2Flow);
    }
  });

  it("should create a new flows", () => {
    const oldNumberOfFlows = Object.keys(testFlowState.flows).length;
    const flowStateWithNewFlow = reducer(testFlowState, createNewFlow());
    const newNumberOfFlows = Object.keys(flowStateWithNewFlow.flows).length;
    const newFlowIdAndProperty = Object.entries(
      flowStateWithNewFlow.flows
    ).find(([flowId, flowProperty]) => flowProperty.name === "Custom Flow 3");

    expect(newNumberOfFlows - oldNumberOfFlows).toBe(1);
    expect(newFlowIdAndProperty).toBeDefined();
    if (newFlowIdAndProperty) {
      expect(newFlowIdAndProperty[1].flow).toEqual(initialFlow);
    }
  });

  it("should load a flows", () => {
    const flowStateWithLoadedFlow = reducer(
      testFlowState,
      loadFlow("testFlow2")
    );
    expect(flowStateWithLoadedFlow.selectedFlow).toEqual("testFlow2");
  });

  it("should update nodes", () => {
    const oldNode = testFlowState.flows.testFlow1.flow.nodes.gateway;
    const nodeUpdate = {
      label: "newLabel",
      properties: {
        newProp: 234,
      },
    };
    const flowStateWithUpdatedNode = reducer(
      testFlowState,
      updateNode("gateway", nodeUpdate)
    );
    expect(
      flowStateWithUpdatedNode.flows.testFlow1.flow.nodes.gateway
    ).toEqual({ ...oldNode, ...nodeUpdate });
  });

  it("should delete nodes", () => {
    expect(testFlowState.flows.testFlow1.flow.nodes.gateway).toBeDefined();
    const flowStateWithDeletedNode = reducer(
      testFlowState,
      deleteNode("gateway")
    );
    expect(
      flowStateWithDeletedNode.flows.testFlow1.flow.nodes.gateway
    ).toBeUndefined();
  });

  it("should update flow arguments", () => {
    const flowStateWithUpdatedArguments = reducer(
      testFlowState,
      updateFlowArguments(testFlowArguments)
    );
    expect(flowStateWithUpdatedArguments.flowArguments).toEqual(
      testFlowArguments
    );
  });

  it("should update selected flow properties", () => {
    const { flow } = testFlowState.flows.testFlow1;
    const flowStateWithUpdatedProperties = reducer(
      testFlowState,
      updateFlowProperties({
        name: "Modified Name",
        type: "modified-type",
        isConnected: true,
        flow,
      })
    );
    expect(flowStateWithUpdatedProperties.flows.testFlow1.name).toEqual(
      "Modified Name"
    );
    expect(flowStateWithUpdatedProperties.flows.testFlow1.type).toEqual(
      "modified-type"
    );
    expect(flowStateWithUpdatedProperties.flows.testFlow1.isConnected).toEqual(
      true
    );
    expect(flowStateWithUpdatedProperties.flows.testFlow1.flow).toEqual(flow);
  });
});
