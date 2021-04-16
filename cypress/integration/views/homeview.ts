describe('Hub page', () => {
  before(() => {
    cy.intercept('images', { fixture: 'hubImages' })
    cy.visit('/#/home')
  });
});
