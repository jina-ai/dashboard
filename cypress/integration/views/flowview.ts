import defaultPods from "../../../src/data/defaultPods";

describe("The Flow Page", () => {
  beforeEach(() => {
    cy.visit("/#/flow");
  });

  context("When the dev server is connected", () => {
    it("should display the connection", () => {
      cy.dataName("connection-notification-body").contains("Logserver connection established at http://localhost:5000");
    });
  });

  context("When a new flow is created", () => {

    it("successfully let you pull new pods", () => {
      defaultPods.forEach((pod, idx) => {
        const dataTransfer = new DataTransfer;
        cy.dataName(`SideBarItem-${idx}`).trigger("dragstart", { dataTransfer, force: true });
        cy.get(".chart-section-container").trigger("drop", { dataTransfer });
      });
    });
  });
});


