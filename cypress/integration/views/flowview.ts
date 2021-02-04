import defaultPods from "../../../src/data/defaultPods";

describe("The Flow Page", () => {
  beforeEach(() => {
    cy.visit("/#/flow");
  });

  context("When JinaD is connected", () => {
    it("shouldn't display the offline message", () => {
      cy.dataName("connection-notification-offline").should('not.exist');
    });

    it("should display the connected message", () => {
      cy.dataName("connection-notification-online").should("contain", "Successfully connected to Jina at http://localhost:5000");
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


