
import { Store } from "../../../src/flux";

describe('The Flow Page', () => {
  beforeEach(() => {
    cy.visit('/#/flow')
  })

  context('When the dev server is connected', () => {

    // it('should display the connection', () => {
    //   cy.dataName("connection-notification-body").contains('Logserver connection established at http://localhost:5000')
    // })

  })

  context('When a new flow is created', () => {

  it('successfully let you pull new pods', () => {
      cy.get('.dropdown-toggle').click()
      cy.get('.dropdown-menu > :nth-child(1)').click().then(() => {
        cy.get('.p-3').children().each(($el) => {
          const dataTransfer = new DataTransfer;
          cy.wrap($el).trigger('dragstart', { dataTransfer, force: true })
          cy.get('.chart-section-container').trigger('drop', { dataTransfer });
        })
      })
    })
  })
})


