
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

  describe('table view options', () => {
    
    context('on changing table view', () => {
        it('should initially display Table View option', () => {
          
           
        cy.dataName('dropDownViewSelectedOption').click()
        cy.contains('Group by Pod').scrollIntoView().click()
                
        })
        
        it('should click on All Sources', () => {
          cy.dataName('dropDown-2-ViewSelectedOption').should('contain.text', 'All Sources')
         cy.dataName('dropDown-2-ViewSelectedOption').click()
        
         })
        
         it('should click on All Levels', () => {
           cy.dataName('dropDown-3-ViewSelectedOption').should('contain.text', 'All Levels')
           cy.dataName('dropDown-3-ViewSelectedOption').click()
        
           })
          
           it('should click on Download Logs', () => {
             cy.dataName('dropDown-4-ViewSelectedOption').should('contain.text', 'Download Logs')
             cy.dataName('dropDown-4-ViewSelectedOption').click()
      
             })
  })
  
})

})