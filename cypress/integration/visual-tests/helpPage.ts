const viewPortSizesToTest = [[1024, 768], 'macbook-11', 'macbook-13', 'macbook-15', 'macbook-16']

describe('Help page', () => {
  viewPortSizesToTest.forEach((size) => {
    it(`checks snapshot of help page for size ${size}`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }

      cy.visit('/#/help')
      cy.percySnapshot(`helpPage${size}`)
    })
  })
})