import defaultPods from "../../../src/data/defaultPods"

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
<<<<<<< HEAD
    it("successfully let you pull new pods", () => {
      moveSideBarItemToCanvas(1, 50, 100)
      moveSideBarItemToCanvas(2, 50, 175)
      connectPoints([180, 140], [180, 175])
      moveSideBarItemToCanvas(3, 50, 250)
      connectPoints([180, 215], [180, 250])
      moveSideBarItemToCanvas(4, 50, 325)
      connectPoints([180, 290], [180, 325])
      cy.percySnapshot("flow-design")
    })
=======
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
>>>>>>> 700012502fbc01830cc31b33887d03ac33bf56cd
  })
})
