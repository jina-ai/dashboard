describe("Logs page", () => {
  before(() => {
    cy.visit("/")
    cy.viewport(2000, 2000)
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

    context.skip("when starting a flow", () => {
      it(
        "should display the correct logging",
        {
          defaultCommandTimeout: 20000,
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

context("on changing table view", () => {
  it("should click on All Sources", () => {
    cy.dataName("logStreamSourceSelectedOption").should(
      "contain.text",
      "All Sources"
    )
    cy.dataName("logStreamSourceSelectedOption").click()
  })

  it.skip("should initially display Table View option", () => {
    cy.dataName("logStreamViewSelectedOption").click()
    cy.dataName("logStreamFilters").contains("Group by Pod").click()
    cy.dataName("groupedLogsContainer").should("contain.text", "encode1")
    cy.dataName("groupedLogsContainer").should("contain.text", "encode2")
    cy.dataName("logStreamViewSelectedOption").click()
    cy.dataName("logStreamFilters").contains("Group by Level").click()
    cy.dataName("groupedLogsContainer").should("contain.text", "INFO")
  })

  it("should click on All Levels", () => {
    cy.dataName("logStreamLevelSelectedOption").should(
      "contain.text",
      "All Levels"
    )
    cy.dataName("logStreamLevelSelectedOption").click()
  })

  it("should click on Download Logs", () => {
    cy.dataName("logStreamActionsSelect").should(
      "contain.text",
      "Download Logs"
    )
    cy.dataName("logStreamActionsSelect").click()
  })
})
