import defaultPods from "../../../src/data/defaultPods";

describe("The Flow Page", () => {
  beforeEach(() => {
    cy.visit("/#/flow");
  });

  context("When JinaD isn't connected", () => {
    it("should display the offline message", () => {
      cy.dataName("connection-notification-body").contains("Could not connect to Jina instance");
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


