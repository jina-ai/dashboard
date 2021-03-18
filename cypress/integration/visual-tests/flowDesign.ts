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
  })
})
