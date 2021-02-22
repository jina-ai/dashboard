import reducer, { saveFlowsToStorage } from "./flows.reducer"
import {
  createNewFlow,
  deleteFlow,
  deleteNode,
  duplicateFlow,
  loadFlow,
  updateNode,
  importFlow,
  setFlowArguments,
  updateSelectedFlow,
} from "./flows.actions"
import { initialFlowChart } from "./flows.constants"
import { testFlowArguments, testFlowState } from "./flows.testData"
import { isEdge } from "react-flow-renderer"
import { Flow } from "./flows.types"

function getFlowFromStorage(id: string): Flow | undefined {
  const userFlowsString = localStorage.getItem("userFlows")
  if (userFlowsString) {
    const parsed = JSON.parse(userFlowsString)
    return parsed[id]
  } else return undefined
}

describe("flows reducer", () => {
  beforeAll(() => {
    saveFlowsToStorage(testFlowState)
  })

  it("should delete a flow from redux and storage", () => {
    expect(getFlowFromStorage("testFlow2")).toBeDefined()
    const oldNumberOfFlows = Object.keys(testFlowState.flows).length

    const flowStateWithoutFlow2 = reducer(
      testFlowState,
      deleteFlow("testFlow2")
    )
    const newNumberOfFlows = Object.keys(flowStateWithoutFlow2.flows).length
    expect(oldNumberOfFlows - newNumberOfFlows).toEqual(1)
    expect(
      Object.keys(testFlowState.flows).find((flowId) => flowId === "testFlow2")
    ).toEqual("testFlow2")
    expect(
      Object.keys(flowStateWithoutFlow2.flows).find(
        (flowId) => flowId === "testFlow2"
      )
    ).toBeUndefined()
    expect(getFlowFromStorage("testFlow2")).toBeUndefined()
  })

  it("should duplicate the flower flow and save it to storage", () => {
    const flowerYaml = testFlowState.flows.flower.yaml
    if (flowerYaml) {
      const oldNumberOfFlows = Object.keys(testFlowState.flows).length
      const flowStateWithDuplicatedFlowerFlow = reducer(
        testFlowState,
        duplicateFlow(flowerYaml)
      )
      const newNumberOfFlows = Object.keys(
        flowStateWithDuplicatedFlowerFlow.flows
      ).length
      const duplicatedIdAndFlow = Object.entries(
        flowStateWithDuplicatedFlowerFlow.flows
      ).find(([flowId, flowProperty]) => flowProperty.name === "Custom Flow 3")

      expect(newNumberOfFlows - oldNumberOfFlows).toBe(1)
      expect(duplicatedIdAndFlow).toBeDefined()
      if (duplicatedIdAndFlow) {
        const [dupId, dupFlow] = duplicatedIdAndFlow
        expect(dupFlow.flowChart).toEqual(testFlowState.flows.flower.flowChart)

        expect(getFlowFromStorage(dupId)?.flowChart).toEqual(
          testFlowState.flows.flower.flowChart
        )
      }
    }
  })

  it("should import a new flow from YAML and save it to storage", () => {
    const flowerYaml = testFlowState.flows.flower.yaml
    if (flowerYaml) {
      const oldNumberOfFlows = Object.keys(testFlowState.flows).length
      const flowStateWithImportedFlowerFlow = reducer(
        testFlowState,
        importFlow(flowerYaml)
      )
      const newNumberOfFlows = Object.keys(
        flowStateWithImportedFlowerFlow.flows
      ).length
      const importedFlowerFlowIdAndProperty = Object.entries(
        flowStateWithImportedFlowerFlow.flows
      ).find(([flowId, flowProperty]) => flowProperty.name === "Custom Flow 3")

      expect(newNumberOfFlows - oldNumberOfFlows).toBe(1)
      expect(importedFlowerFlowIdAndProperty).toBeDefined()
      if (importedFlowerFlowIdAndProperty) {
        const [id, property] = importedFlowerFlowIdAndProperty
        expect(property.flowChart).toEqual(testFlowState.flows.flower.flowChart)
        expect(getFlowFromStorage(id)?.flowChart).toEqual(property.flowChart)
      }
    }
  })

  it("should create a new flow and save it to storage", () => {
    const oldNumberOfFlows = Object.keys(testFlowState.flows).length
    const flowStateWithNewFlow = reducer(testFlowState, createNewFlow())
    const newNumberOfFlows = Object.keys(flowStateWithNewFlow.flows).length
    const newFlowIdAndProperty = Object.entries(
      flowStateWithNewFlow.flows
    ).find(([flowId, flowProperty]) => flowProperty.name === "Custom Flow 3")

    expect(newNumberOfFlows - oldNumberOfFlows).toBe(1)
    expect(newFlowIdAndProperty).toBeDefined()
    if (newFlowIdAndProperty) {
      const [id, property] = newFlowIdAndProperty
      expect(property.flowChart).toEqual(initialFlowChart)
      expect(getFlowFromStorage(id).flowChart).toEqual(property.flowChart)
    }
  })

  it("should load a flows", () => {
    const flowStateWithLoadedFlow = reducer(
      testFlowState,
      loadFlow("testFlow2")
    )
    expect(flowStateWithLoadedFlow.selectedFlowId).toEqual("testFlow2")
  })

  it("should update nodes and save it to storage", () => {
    const oldNode = testFlowState.flows.testFlow1.flowChart.elements.find(
      (element) => element.id === "gateway"
    )
    const nodeUpdate = {
      data: {
        label: "newLabel",
        properties: {
          newProp: 234,
        },
      },
    }
    const flowStateWithUpdatedNode = reducer(
      testFlowState,
      updateNode("gateway", nodeUpdate)
    )
    expect(
      flowStateWithUpdatedNode.flows.testFlow1.flowChart.elements.find(
        (element) => element.id === "gateway"
      )
    ).toEqual({ ...oldNode, ...nodeUpdate })

    expect(getFlowFromStorage("testFlow1")).toEqual(
      flowStateWithUpdatedNode.flows.testFlow1
    )
  })

  it("should delete nodes", () => {
    expect(
      testFlowState.flows.testFlow1.flowChart.elements.find(
        (element) => element.id === "gateway"
      )
    ).toBeDefined()
    const flowStateWithDeletedNode = reducer(
      testFlowState,
      deleteNode("gateway")
    )
    expect(
      flowStateWithDeletedNode.flows.testFlow1.flowChart.elements.find(
        (element) => element.id === "gateway"
      )
    ).toBeUndefined()

    expect(getFlowFromStorage("testFlow1")).toEqual(
      flowStateWithDeletedNode.flows.testFlow1
    )
  })

  it("should delete links, when deleting nodes", () => {
    expect(
      testFlowState.flows.testFlow1.flowChart.elements.find(
        (element) => element.id === "node0"
      )
    ).toBeDefined()
    expect(
      testFlowState.flows.testFlow1.flowChart.elements.filter((element) =>
        isEdge(element)
      )
    ).not.toEqual([])

    const flowStateWithDeletedNode = reducer(testFlowState, deleteNode("node0"))

    expect(
      flowStateWithDeletedNode.flows.testFlow1.flowChart.elements.find(
        (element) => element.id === "node0"
      )
    ).toBeUndefined()

    expect(
      flowStateWithDeletedNode.flows.testFlow1.flowChart.elements.filter(
        (element) => isEdge(element)
      )
    ).toEqual([])

    expect(getFlowFromStorage("testFlow1")).toEqual(
      flowStateWithDeletedNode.flows.testFlow1
    )
  })

  it("should set flow arguments", () => {
    const flowStateWithSetArguments = reducer(
      testFlowState,
      setFlowArguments(testFlowArguments)
    )
    expect(flowStateWithSetArguments.flowArguments).toEqual(testFlowArguments)
  })

  it("should set selected flow properties", () => {
    const { flowChart } = testFlowState.flows.testFlow1
    const flowStateWithUpdatedProperties = reducer(
      testFlowState,
      updateSelectedFlow({
        name: "Modified Name",
        type: "modified-type",
        isConnected: true,
        flowChart,
      })
    )
    expect(flowStateWithUpdatedProperties.flows.testFlow1.name).toEqual(
      "Modified Name"
    )
    expect(flowStateWithUpdatedProperties.flows.testFlow1.type).toEqual(
      "modified-type"
    )
    expect(flowStateWithUpdatedProperties.flows.testFlow1.isConnected).toEqual(
      true
    )
    expect(flowStateWithUpdatedProperties.flows.testFlow1.flowChart).toEqual(
      flowChart
    )
  })
})
