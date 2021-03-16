import defaultPods from "../../../src/data/defaultPods"
import {
  defaultHost,
  defaultPort,
} from "../../../src/redux/settings/settings.constants"
import { Flow, FlowState } from "../../../src/redux/flows/flows.types"
import { isFlowEdge, isFlowNode } from "../../../src/helpers/flow-chart"

describe("The Flow Page", () => {
  beforeEach(() => {
    cy.visit("/#/flow")
  })

  it("should have a working settings button", () => {
    cy.dataName("settingsModal").should("not.exist")
    cy.dataName("settingsButton").click()
    cy.dataName("settingsModal").should("exist")
  })

  it("should create a flow and delete it", () => {
    cy.dataName("newFlowButton").click()
    cy.dataName("createEmptyFLowButton").click()
    cy.dataName("CustomFlow2").should("exist")
    cy.dataName("deleteFlowButton-1").click()
    cy.dataName("CustomFlow2").should("not.exist")
  })

  it("should render the examples correctly", () => {
    cy.window()
      .its("store")
      .then((store) => {
        const flowState = store.getState().flowState as FlowState

        const exampleFlows = Object.entries(flowState.flows)
          .filter(([id, flow]) => flow.type === "example")
          .map(([id, flow]) => flow) as Flow[]

        exampleFlows.forEach((flow, idx) => {
          cy.dataName(`exampleFlowButton-${idx}`).should("contain", flow.name)
          cy.dataName(`exampleFlowButton-${idx}`).click()
          flow.flowChart.elements.forEach((element) => {
            if (isFlowNode(element))
              cy.dataName(`chart-node-${element?.data?.label}`).should("exist")
          })
        })
      })
  })

  context("When JinaD is connected", () => {
    it("shouldn't display the offline message", () => {
      cy.dataName("connection-notification-offline").should("not.exist")
    })

    it("should display the connected message", () => {
      const host = localStorage.getItem("preferences-host") || defaultHost
      const port = localStorage.getItem("preferences-port") || defaultPort
      cy.dataName("connection-notification-online").should(
        "contain",
        `Successfully connected to Jina at ${host}:${port}`
      )
    })
  })

  context("When a new flow is created", () => {
    it("successfully let you pull new pods", () => {
      defaultPods.forEach((pod, idx) => {
        const dataTransfer = new DataTransfer()
        cy.dataName(`SideBarItem-${idx}`).trigger("dragstart", {
          dataTransfer,
          force: true,
        })
        cy.get(".chart-section-container").trigger("drop", { dataTransfer })
      })
    })
  })
})
