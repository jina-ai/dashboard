describe("Flow design workflow", () => {
    beforeEach(() => {
        cy.visit("/#/flow");
    });


    context("When a new flow is created", () => {
        it("successfully let you pull new pods", () => {
            const dataTransfer = new DataTransfer;
            cy.dataName("SideBarItem-1").trigger("dragstart", { dataTransfer, force: true });
            cy.get(".chart-section-container").trigger("drop", 50, 100, { dataTransfer });
            cy.dataName("SideBarItem-2").trigger("dragstart", { dataTransfer, force: true });
            cy.get(".chart-section-container").trigger("drop", 50, 200, { dataTransfer });
            cy.get('[data-port-id="outPort"]').first().trigger("dragstart", { dataTransfer, force: true })
            cy.get('[data-port-id="inPort"]').eq(1).trigger("drop", 52, 202, { dataTransfer, force: true });
            cy.percySnapshot("flow-design")
        });
    });
});