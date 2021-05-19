import { flowArguments } from "../../../src/helpers/tests/flow-chart.testData"

describe("The Pod View", () => {
  beforeEach(() => {
    cy.visit("/#/flow")
  })

  it("should have a default 'gateway' pod exist", () => {
    cy.dataName("chart-node-gateway").should("exist")
  })

  it("should show 'podEditContainer' when clicking 'gateway' pod label, and hide it when pressing {esc}", () => {
    cy.dataName("podEditContainer").should("not.exist")
    cy.dataName("chart-node-gateway").dblclick()
    cy.dataName("podEditContainer")
      .should("exist")
      .type("{esc}")
      .should("not.exist")
  })

  it("should set default pod's property input as checkbox whichever its type is boolean, and make it checkable", () => {
    const booleanProperties = flowArguments.pod.filter(
      (arg) => arg.type === "boolean"
    )
    cy.dataName("chart-node-gateway").dblclick()
    booleanProperties.forEach((prop) => {
      cy.get(`input[data-name=pod_${prop.name}_property][type=checkbox]`)
        .as(prop.name)
        .should("not.be.checked")
      cy.get(`@${prop.name}`).check({ force: true }).should("be.checked")
      cy.get(`@${prop.name}`).uncheck({ force: true }).should("not.be.checked")
    })
  })
})
