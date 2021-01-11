declare namespace Cypress {
    interface Chainable<Element> {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataName('navBar')
       * @example cy.dataName('title').should('have.text', 'Log Stream')
      */
      dataName(value: string): Chainable<Element>
  }
}