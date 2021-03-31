import {
  defaultJinaDHost,
  defaultJinaDPort,
} from "../../../src/redux/settings/settings.constants"
import {
  Flow,
  FlowState,
  Workspace,
} from "../../../src/redux/flows/flows.types"
import { isFlowEdge, isFlowNode } from "../../../src/helpers/flow-chart"
import {
  selectSelectedFlow,
  selectSelectedFlowId,
} from "../../../src/redux/flows/flows.selectors"

describe("The Flow Page", () => {
  beforeEach(() => {
    cy.visit("/#/flow")
  })

  //todo test that the play button doesn't crash anything when pressed

  it("should create a workspace and delete it", () => {
    cy.dataName("newWorkspaceButton").click()
    cy.dataName("Workspace2").should("exist")
    cy.dataName("deleteWorkspaceButton-1").click()
    cy.dataName("Workspace2").should("not.exist")
  })

  it("should create a new flow, select and delete it", () => {
    cy.window()
      .its("store")
      .then((store) => {
        {
          const selectedFlowIdOld = selectSelectedFlowId(store.getState())
          const selectedFlowOld = selectSelectedFlow(store.getState())
          cy.dataName(`flowTab-${selectedFlowIdOld}`).should(
            "contain",
            selectedFlowOld.name
          )

          cy.dataName("createNewFlowButton").click()

          const selectedFlowIdNew = selectSelectedFlowId(store.getState())
          const selectedFlowNew = selectSelectedFlow(store.getState())
          cy.dataName(`flowTab-${selectedFlowIdNew}`).should(
            "contain",
            selectedFlowNew.name
          )

          cy.dataName(`delete-${selectedFlowIdNew}`).click()

          cy.dataName(`flowTab-${selectedFlowIdNew}`).should("not.exist")
        }
      })
  })

  it("should render the examples correctly", () => {
    cy.window()
      .its("store")
      .then((store) => {
        const flowState = store.getState().flowState as FlowState

        const exampleWorkspace = Object.entries(flowState.workspaces)
          .filter(([id, flow]) => flow.type === "example")
          .map(([id, flow]) => flow) as Workspace[]

        exampleWorkspace.forEach((workspace, idx) => {
          cy.dataName(`exampleWorkspaceButton-${idx}`).should(
            "contain",
            workspace.name
          )
          cy.dataName(`exampleWorkspaceButton-${idx}`).click({ force: true })
          let edgeCount = 0

          flowState.flows[workspace.selectedFlowId].flowChart.elements.forEach(
            (element) => {
              if (isFlowNode(element))
                cy.dataName(`chart-node-${element?.data?.label}`).should(
                  "exist"
                )
              if (isFlowEdge(element)) {
                edgeCount++
                cy.get(
                  `:nth-child(${edgeCount}) > .react-flow__edge-path`
                ).should("exist")
              }
            }
          )
        })
      })
  })

  context("When JinaD is connected", () => {
    it("shouldn't display the offline message", () => {
      cy.dataName("connection-notification-offline").should("not.exist")
    })

    it("should display the connected message", () => {
      const host =
        localStorage.getItem("preferences-jinad-host") || defaultJinaDHost
      const port =
        localStorage.getItem("preferences-jinad-port") || defaultJinaDPort
      cy.dataName("connection-notification-online").should(
        "contain",
        `Successfully connected to Jina at ${host}:${port}`
      )
    })
  })
})
