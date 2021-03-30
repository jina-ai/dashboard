describe("Logs page", () => {
  before(() => {
    cy.visit("/")
  })

  it("should redirect to /logs", () => {
    cy.hash().should("eq", "#/logs")
  })

  it('should display the title "Log Stream"', () => {
    cy.dataName("title").should("have.text", "Log Stream")
  })

  describe("log level timeline", () => {
    it("shows a graph with time axis and occurence count level", () => {
      cy.dataName("logOccurenceTitle").should("contain.text", "Log Occurences")
      cy.dataName("logOccurencesChartLegend").should("contain.text", "SUCCESS")
    })

    context("on changing log duration", () => {
      it("changes duration from the dropdown menu", () => {
        cy.dataName("logOccurenceDurationSelectedOption").should(
          "contain.text",
          "60 Seconds"
        )
        cy.dataName("logOccurenceDurationSelectedOption").click()
        cy.dataName("logOccurenceDurationSelect").contains("15 Minutes").click()
        cy.dataName("logOccurenceDurationSelectedOption").should(
          "contain.text",
          "15 Minutes"
        )
      })
    })

    context("when starting a flow", () => {
      it.only(
        "should display the correct logging",
        {
          defaultCommandTimeout: 10000,
        },
        () => {
          cy.visit("#/flow")
          cy.dataName("playButton").click()
          cy.visit("#/logs")
          cy.fixture("sample-output").then((output) => {
            output.logs.forEach((log, index) => {
              cy.dataName(`logItem-${index}`).should("contain", log.message)
            })
          })
        }
      )
    })
  })
})
