import defaultPods from "../../../src/data/defaultPods";
import { defaultHost, defaultPort } from "../../../src/redux/settings/settings.constants";

describe("The Flow Page", () => {
  beforeEach(() => {
    cy.visit("/#/flow");
  });

  context("When JinaD is connected", () => {
    it("shouldn't display the offline message", () => {
      cy.dataName("connection-notification-offline").should("not.exist");
    });

    it("should display the connected message", () => {
      const host = localStorage.getItem("preferences-host") || defaultHost
      const port = localStorage.getItem("preferences-port") || defaultPort
      cy.dataName("connection-notification-online").should("contain", `Successfully connected to Jina at ${host}:${port}`);
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


