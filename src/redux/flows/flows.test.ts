import reducer, { saveFlowsToStorage } from "./flows.reducer"
import {
  createNewFlow,
  deleteFlow,
  deleteNode,
  duplicateFlow,
  loadFlow,
  importFlow,
  setFlowArguments,
  updateSelectedFlow,
  addNode,
  addLink,
  deleteLink,
  updateNodeData,
  createNewWorkspace,
  deleteWorkspace,
  updateSelectedWorkspace,
} from "./flows.actions"
import { initialFlowChart } from "./flows.constants"
import { testFlowArguments, testFlowState } from "./flows.testData"
import {
  Flow,
  FlowNode,
  FlowEdge,
  NodeDataUpdate,
  Workspace,
  WorkspaceUpdate,
} from "./flows.types"
import { isFlowNode, isFlowEdge } from "../../helpers/flow-chart"

function getFlowFromStorage(id: string): Flow | undefined {
  const userFlowsString = localStorage.getItem("userFlows")
  if (userFlowsString) {
    const parsed = JSON.parse(userFlowsString)
    return parsed[id]
  } else return undefined
}

function getWorkspaceFromStorage(id: string): Workspace | undefined {
  const userWorkspacesString = localStorage.getItem("userWorkspaces")
  if (userWorkspacesString) {
    const parsed = JSON.parse(userWorkspacesString)
    return parsed[id]
  } else return undefined
}

describe("flows reducer", () => {
  beforeEach(() => {
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
      ).find(([flowId, flow]) => flow.name === "Custom Flow 5")

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
      const importedFlowerFlowIdAndFlow = Object.entries(
        flowStateWithImportedFlowerFlow.flows
      ).find(([flowId, flow]) => flow.name === "Custom Flow 5")

      expect(newNumberOfFlows - oldNumberOfFlows).toBe(1)
      expect(importedFlowerFlowIdAndFlow).toBeDefined()
      if (importedFlowerFlowIdAndFlow) {
        const [id, flow] = importedFlowerFlowIdAndFlow
        expect(flow.flowChart).toEqual(testFlowState.flows.flower.flowChart)
        expect(getFlowFromStorage(id)?.flowChart).toEqual(flow.flowChart)
      }
    }
  })

  it("should create a new flow and save it to storage", () => {
    const oldNumberOfFlows = Object.keys(testFlowState.flows).length
    const flowStateWithNewFlow = reducer(testFlowState, createNewFlow())
    const newNumberOfFlows = Object.keys(flowStateWithNewFlow.flows).length
    const newFlowIdAndFlow = Object.entries(flowStateWithNewFlow.flows).find(
      ([flowId, flow]) => flow.name === "Custom Flow 5"
    )

    expect(newNumberOfFlows - oldNumberOfFlows).toBe(1)
    expect(newFlowIdAndFlow).toBeDefined()
    if (newFlowIdAndFlow) {
      const [id, flow] = newFlowIdAndFlow
      expect(flow.flowChart).toEqual(initialFlowChart)
      expect(getFlowFromStorage(id)?.flowChart).toEqual(flow.flowChart)
    }
  })

  it("should load a flow", () => {
    const flowStateWithLoadedFlow = reducer(
      testFlowState,
      loadFlow("testFlow2")
    )
    expect(
      flowStateWithLoadedFlow.workspaces[
        flowStateWithLoadedFlow.selectedWorkspaceId
      ].selectedFlowId
    ).toEqual("testFlow2")
  })

  it("should create a node and save it to storage", () => {
    const newNodeId = "newNodeId"
    const newPosition = { x: 1000, y: 1000 }
    const newData = {
      label: "newLabel",
      name: "newName",
      uses: "usesSomething",
    }

    const newState = reducer(
      testFlowState,
      addNode(newNodeId, newPosition, newData)
    )
    const selectedFlowIdOldState =
      testFlowState.workspaces[testFlowState.selectedWorkspaceId].selectedFlowId
    const selectedFlowIdNewState =
      newState.workspaces[newState.selectedWorkspaceId].selectedFlowId
    const oldFlowChart = testFlowState.flows[selectedFlowIdOldState].flowChart
    const newFlowChart = newState.flows[selectedFlowIdNewState].flowChart
    const oldNodeCount = oldFlowChart.elements.filter((element) =>
      isFlowNode(element)
    ).length
    const newNodeCount = newFlowChart.elements.filter((element) =>
      isFlowNode(element)
    ).length
    const newNode = newFlowChart.elements.find(
      (element) => element.id === newNodeId
    ) as FlowNode

    expect(newNodeCount - oldNodeCount).toBe(1)
    expect(newNode.position).toEqual(newPosition)
    expect(newNode.data).toEqual(newData)

    const flowChartFromStorage = getFlowFromStorage(selectedFlowIdOldState)
      ?.flowChart
    const newNodeFromStorage = flowChartFromStorage?.elements.find(
      (element) => element.id === newNodeId
    ) as FlowNode

    expect(newNodeFromStorage.position).toEqual(newPosition)
    expect(newNodeFromStorage.data).toEqual(newData)
  })

  it("should update nodes data and save it to storage", () => {
    const oldNode = testFlowState.flows.testFlow1.flowChart.elements.find(
      (element) => element.id === "gateway"
    )
    const nodeDataUpdate: NodeDataUpdate = {
      label: "newLabel",
    }
    const flowStateWithUpdatedNode = reducer(
      testFlowState,
      updateNodeData("gateway", nodeDataUpdate)
    )
    expect(
      flowStateWithUpdatedNode.flows.testFlow1.flowChart.elements.find(
        (element) => element.id === "gateway"
      )?.data
    ).toEqual({ ...oldNode?.data, ...nodeDataUpdate })

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
        isFlowEdge(element)
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
        (element) => isFlowEdge(element)
      )
    ).toEqual([])

    expect(getFlowFromStorage("testFlow1")).toEqual(
      flowStateWithDeletedNode.flows.testFlow1
    )
  })

  it("should add a link and save it to storage", () => {
    const source = "gateway"
    const target = "node1"

    const newState = reducer(testFlowState, addLink(source, target))
    const selectedFlowIdOldState =
      testFlowState.workspaces[testFlowState.selectedWorkspaceId].selectedFlowId
    const selectedFlowIdNewState =
      newState.workspaces[newState.selectedWorkspaceId].selectedFlowId

    const oldFlowChart = testFlowState.flows[selectedFlowIdOldState].flowChart
    const newFlowChart = newState.flows[selectedFlowIdNewState].flowChart
    const oldLinkCount = oldFlowChart.elements.filter((element) =>
      isFlowEdge(element)
    ).length
    const newLinkCount = newFlowChart.elements.filter((element) =>
      isFlowEdge(element)
    ).length
    const newLink = newFlowChart.elements.find(
      (element) => element.id === `e-${source}-to-${target}`
    ) as FlowEdge

    expect(newLinkCount - oldLinkCount).toBe(1)
    expect(newLink.source).toBe(source)
    expect(newLink.target).toBe(target)

    const linkFromStorage = getFlowFromStorage(
      selectedFlowIdOldState
    )?.flowChart.elements.find(
      (element) => element.id === `e-${source}-to-${target}`
    ) as FlowEdge

    expect(linkFromStorage.source).toBe(source)
    expect(linkFromStorage.target).toBe(target)
  })

  it("should delete a link from id and save that to storage", () => {
    const deletedLinkId = "e-gateway-to-node0"

    const selectedFlowIdOldstate =
      testFlowState.workspaces[testFlowState.selectedWorkspaceId].selectedFlowId

    const oldLinkFromStorage = getFlowFromStorage(
      selectedFlowIdOldstate
    )?.flowChart.elements.find(
      (element) => element.id === deletedLinkId
    ) as FlowEdge

    const newState = reducer(testFlowState, deleteLink(deletedLinkId))

    const selectedFlowIdNewstate =
      newState.workspaces[newState.selectedWorkspaceId].selectedFlowId

    const oldFlowChart = testFlowState.flows[selectedFlowIdOldstate].flowChart
    const newFlowChart = newState.flows[selectedFlowIdNewstate].flowChart
    const oldLinkCount = oldFlowChart.elements.filter((element) =>
      isFlowEdge(element)
    ).length
    const newLinkCount = newFlowChart.elements.filter((element) =>
      isFlowEdge(element)
    ).length
    const newLinkFromStorage = getFlowFromStorage(
      selectedFlowIdOldstate
    )?.flowChart.elements.find(
      (element) => element.id === deletedLinkId
    ) as FlowEdge

    expect(oldLinkCount - newLinkCount).toBe(1)
    expect(
      oldFlowChart.elements.find((element) => element.id === deletedLinkId)
    ).toBeDefined()
    expect(
      newFlowChart.elements.find((element) => element.id === deletedLinkId)
    ).not.toBeDefined()
    expect(oldLinkFromStorage).toBeDefined()
    expect(newLinkFromStorage).not.toBeDefined()
  })

  it("should delete a link from nodeConnection and save that to storage", () => {
    const source = "gateway"
    const target = "node0"

    const selectedFlowIdOldState =
      testFlowState.workspaces[testFlowState.selectedWorkspaceId].selectedFlowId

    const deletedLinkId = `e-${source}-to-${target}`
    const oldLinkFromStorage = getFlowFromStorage(
      selectedFlowIdOldState
    )?.flowChart.elements.find(
      (element) => element.id === deletedLinkId
    ) as FlowEdge

    const newState = reducer(testFlowState, deleteLink({ source, target }))

    const selectedFlowIdNewState =
      newState.workspaces[newState.selectedWorkspaceId].selectedFlowId

    const oldFlowChart = testFlowState.flows[selectedFlowIdOldState].flowChart
    const newFlowChart = newState.flows[selectedFlowIdNewState].flowChart
    const oldLinkCount = oldFlowChart.elements.filter((element) =>
      isFlowEdge(element)
    ).length
    const newLinkCount = newFlowChart.elements.filter((element) =>
      isFlowEdge(element)
    ).length
    const newLinkFromStorage = getFlowFromStorage(
      selectedFlowIdOldState
    )?.flowChart.elements.find(
      (element) => element.id === deletedLinkId
    ) as FlowEdge
    expect(oldLinkCount - newLinkCount).toBe(1)
    expect(
      oldFlowChart.elements.find((element) => element.id === deletedLinkId)
    ).toBeDefined()
    expect(
      newFlowChart.elements.find((element) => element.id === deletedLinkId)
    ).not.toBeDefined()
    expect(oldLinkFromStorage).toBeDefined()
    expect(newLinkFromStorage).not.toBeDefined()
  })

  it("should set flow arguments", () => {
    const flowStateWithSetArguments = reducer(
      testFlowState,
      setFlowArguments(testFlowArguments)
    )
    expect(
      flowStateWithSetArguments.workspaces[testFlowState.selectedWorkspaceId]
        .flowArguments
    ).toEqual(testFlowArguments)
  })

  it("should update selected flow", () => {
    const { flowChart } = testFlowState.flows.testFlow1
    const updatedFlow = reducer(
      testFlowState,
      updateSelectedFlow({
        name: "Modified Name",
        type: "user-generated",
        isConnected: true,
        flowChart,
      })
    )
    expect(updatedFlow.flows.testFlow1.name).toEqual("Modified Name")
    expect(updatedFlow.flows.testFlow1.type).toEqual("user-generated")
    expect(updatedFlow.flows.testFlow1.isConnected).toEqual(true)
    expect(updatedFlow.flows.testFlow1.flowChart).toEqual(flowChart)
  })

  it("should create a new workspace and save it to storage", () => {
    const oldNumberOfWorkspaces = Object.keys(testFlowState.workspaces).length
    const flowStateWithNewWorkspace = reducer(
      testFlowState,
      createNewWorkspace()
    )
    const newNumberOfWorkspace = Object.keys(
      flowStateWithNewWorkspace.workspaces
    ).length
    const newWorkspaceIdAndWorkspace = Object.entries(
      flowStateWithNewWorkspace.workspaces
    ).find(([workspaceId, workspace]) => workspace.name === "Workspace 3")

    expect(newNumberOfWorkspace - oldNumberOfWorkspaces).toBe(1)
    expect(newWorkspaceIdAndWorkspace).toBeDefined()
  })

  it("should delete a workspace", () => {
    const oldNumberOfWorkspaces = Object.keys(testFlowState.workspaces).length
    const flowStateWithNewWorkspace = reducer(
      testFlowState,
      createNewWorkspace()
    )
    const newNumberOfWorkspaces = Object.keys(
      flowStateWithNewWorkspace.workspaces
    ).length

    expect(newNumberOfWorkspaces - oldNumberOfWorkspaces).toBe(1)

    const newWorkSpaceId = Object.keys(flowStateWithNewWorkspace.workspaces)[
      newNumberOfWorkspaces - 1
    ]
    const flowStateWithoutNewWorkspace = reducer(
      testFlowState,
      deleteWorkspace(newWorkSpaceId)
    )

    const newerNumberOfWorkspaces = Object.keys(
      flowStateWithoutNewWorkspace.workspaces
    ).length

    expect(newNumberOfWorkspaces - newerNumberOfWorkspaces).toBe(1)
    expect(flowStateWithNewWorkspace.workspaces[newWorkSpaceId]).toBeDefined()
    expect(
      flowStateWithoutNewWorkspace.workspaces[newWorkSpaceId]
    ).toBeUndefined()
  })

  it("should delete a workspace from redux and storage", () => {
    expect(getWorkspaceFromStorage("testWorkspace2")).toBeDefined()
    const oldNumberOfWorkspaces = Object.keys(testFlowState.workspaces).length

    const flowStateWithoutWorkspace2 = reducer(
      testFlowState,
      deleteWorkspace("testWorkspace2")
    )
    const newNumberOfWorkspaces = Object.keys(
      flowStateWithoutWorkspace2.workspaces
    ).length
    expect(oldNumberOfWorkspaces - newNumberOfWorkspaces).toEqual(1)
    expect(
      Object.keys(testFlowState.workspaces).find(
        (workspaceId) => workspaceId === "testWorkspace2"
      )
    ).toEqual("testWorkspace2")
    expect(
      Object.keys(flowStateWithoutWorkspace2.workspaces).find(
        (workspaceId) => workspaceId === "testWorkspace2"
      )
    ).toBeUndefined()
    expect(getWorkspaceFromStorage("testWorkspace2")).toBeUndefined()
  })

  it("should delete all flows in a workspace when deleting the workspace", () => {
    const flowCountWorkspace2 = Object.entries(testFlowState.flows).filter(
      ([flowId, flow]) => flow.workspaceId === "testWorkspace2"
    ).length
    expect(flowCountWorkspace2).toBeGreaterThan(0)

    const flowStateWithoutWorkspace2 = reducer(
      testFlowState,
      deleteWorkspace("testWorkspace2")
    )

    Object.entries(flowStateWithoutWorkspace2.flows).forEach(
      ([flowId, flow]) => {
        expect(flow.workspaceId).not.toBe("testWorkspace2")
      }
    )
  })

  it("should update selected workspace", () => {
    const update: WorkspaceUpdate = {
      name: "newName",
      type: "user-generated",
      daemon_endpoint: "newDaemonEndpoint",
      isConnected: true,
      files: ["newFile1", "newFile2"],
    }

    const updatedFlowState = reducer(
      testFlowState,
      updateSelectedWorkspace(update)
    )

    const selectedWorkspaceOldState =
      testFlowState.workspaces[testFlowState.selectedWorkspaceId]
    const selectedWorkspaceNewState =
      updatedFlowState.workspaces[updatedFlowState.selectedWorkspaceId]

    expect(selectedWorkspaceOldState).not.toEqual(selectedWorkspaceNewState)

    Object.entries(update).forEach((entry) => {
      const key = entry[0] as keyof Workspace
      const value = entry[1]
      expect(selectedWorkspaceNewState[key]).toEqual(value)
    })
  })
})
