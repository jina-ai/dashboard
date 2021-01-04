
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should redirect to /home', () => {
    cy.hash().should('eq', '#/home')
  })
})
