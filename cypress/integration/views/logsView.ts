describe('Logs page', () => {
  before(() => {
    cy.visit('/')
  })

  it('should redirect to /logs', () => {
    cy.hash().should('eq', '#/logs')
  })

  it('should display the title "Log Stream"', () => {
    cy.dataName('title').should('have.text', 'Log Stream')
  })

  describe('log level timeline', () => {
    it('shows a graph with time axis and occurence count level', () => {
      cy.dataName('logOccurenceTitle').should('contain.text', 'Log Occurences')
      cy.dataName('logOccurencesChartLegend').should('contain.text', 'SUCCESS')
    })

    context('on changing log duration', () => {
      it('changes duration from the dropdown menu', () => {
        cy.dataName('logOccurenceDurationSelectedOption').should('contain.text', '60 Seconds')
        cy.dataName('logOccurenceDurationSelectedOption').click()
        cy.dataName('logOccurenceDurationSelect').contains('15 Minutes').click()
        cy.dataName('logOccurenceDurationSelectedOption').should('contain.text', '15 Minutes')
      })
    })
  })

  describe('click on Table view dropdown', () => {
    it('shows a dropdown menu', () => {
      cy.contains('table_rows').click()
      cy.get('.ml-auto')
      .should('contain', 'timestamp')
      
    })

})

describe('click on Group by  Pod in dropdown', () => {
  it('shows logs grouped according to source', () => {
    cy.contains('Group by Pod').click()
    cy.get('.log-success')
    .should('contain', 'check_circle')
    
  })

})

})