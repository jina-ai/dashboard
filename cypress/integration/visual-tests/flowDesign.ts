import defaultPods from "../../../src/data/defaultPods"

import { SHOW_BANNER } from "../../../src/redux/global/global.constants"

describe("Flow design workflow", () => {
  beforeEach(() => {
    cy.visit("/#/flow")
  })

  const moveSideBarItemToCanvas = (
    sideBarItemId: number,
    x: number,
    y: number
  ) => {
    const dataTransfer = new DataTransfer()
    cy.dataName(`SideBarItem-${sideBarItemId}`).trigger("dragstart", {
      dataTransfer,
      force: true,
    })
    cy.get(".chart-section-container").trigger("drop", x, y, { dataTransfer })
  }

  type CartesianCoordinate = [number, number]

  const connectPoints = (
    startPoint: CartesianCoordinate,
    endPoint: CartesianCoordinate
  ) => {
    cy.get(".chart-section-container").trigger("mousedown", ...startPoint, {
      which: 1,
    })
    cy.get(".chart-section-container").trigger("mousemove", ...endPoint)
    cy.get(".chart-section-container").trigger("mouseup", ...endPoint)
  }

  context("When a new flow is created", () => {
      it("successfully let you pull new pods and connect them", () => {
          let firstPortLabel = "gateway"
          let secondPortLabel = defaultPods[1].name
          defaultPods.forEach((pod, idx) => {
              if (idx !== 0 && idx < defaultPods.length - 1) {
                  moveSideBarItemToCanvas(idx, 315, 100 + 50 * idx)
                  cy.dataName(`NodePortBottom-${firstPortLabel}`).trigger("mousedown", {
                      force: true,
                  })
                  cy.dataName(`NodePortTop-${secondPortLabel}`).trigger("mouseup", {
                      force: true,
                  })
                  firstPortLabel = secondPortLabel
                  secondPortLabel = defaultPods[idx + 1].name
              }
          })

          cy.percySnapshot("flow-design")
      })
  })
})

describe("Banners on the Flow design page", () => {
  beforeEach(() => {
    cy.visit("/#/flow")
  })

  it("successfully shows single banner", () => {
    cy.get('.notifications-container').should('not.exist')

    cy.window().its('store').invoke("dispatch", {
      type: SHOW_BANNER,
      payload: { message: "message", theme: "success" }
    })

    cy.get('.notifications-container').should('have.length', 1)
  })

  it("successfully shows multiple banners", () => {
    cy.get('.notifications-container').should('not.exist')

    cy.window().its('store').invoke("dispatch", {
      type: SHOW_BANNER,
      payload: { message: "message1", theme: "success" }
    })
    cy.window().its('store').invoke("dispatch", {
      type: SHOW_BANNER,
      payload: { message: "message2", theme: "error" }
    })
    cy.window().its('store').invoke("dispatch", {
      type: SHOW_BANNER,
      payload: { message: "message3", theme: "success" }
    })

    cy.get('.notifications-container').should('have.length', 3)
  })
})
