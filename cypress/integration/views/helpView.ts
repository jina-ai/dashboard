describe('The Help Page', () => {
    before(() => {
        cy.visit('/#/help')
    })
    
    it('should redirect to /help', () => {
        cy.hash().should('eq', '#/help')
    })

    context('on loading Help page', () => {
        it('should display the title "Resources"', () => {
            cy.dataName('title').should('have.text', 'Resources')
        })

        it('should display contain 5 help cards', () => {
            cy.get('[data-name*="help-card-"').should('have.length', 5)
        })

        it('should display "Jina 101" Help Card that opens Jina 101 docs in new tab', () => {
            cy.dataName('help-card-warning').within(() => {
                cy.get('h4').should('have.text', 'Jina 101')
            })
        })
        it('should display "Jina Docs" Help Card', () => {
            cy.dataName('help-card-primary').within(() => {
                cy.get('h4').should('have.text', 'Jina Docs')
            })
        })
        it('should display "Jina "Hello World"" Help Card', () => {
            cy.dataName('help-card-error').within(() => {
                cy.get('h4').should('have.text', 'Jina "Hello World"')
            })
        })
        it('should display Github Help Card', () => {
            cy.dataName('help-card-info').within(() => {
                cy.get('h4').should('have.text', 'Visit us on Github!')
            })
        })
        it('should display "We are hiring!" Help Card', () => {
            cy.dataName('help-card-linkedin').within(() => {
                cy.get('h4').should('have.text', 'We are hiring!')
            })
        })

    })
    
    describe('Help card links', () => {

        context('on selecting each help card', () => {
            it('should close Cookie Banner', () => {
                cy.get('.cookies-banner').within(() =>{
                    cy.get('Button').click()
                })
            })
            it('should go to the Jina 101 page in new tab', () => {
                cy.dataName('help-card-warning')
                .should('have.prop', 'href')
                .and('equal', 'https://101.jina.ai/')
                cy.dataName('help-card-warning').click()
            })
            it('should go to the Jina Docs page in new tab', () => {
                cy.dataName('help-card-primary')
                .should('have.prop', 'href')
                .and('equal', 'https://docs.jina.ai/')
                cy.dataName('help-card-primary').click()
            })
            it('should go to the Jina "Hello World" page in new tab', () => {
                cy.dataName('help-card-error')
                .should('have.prop', 'href')
                .and('equal', 'https://github.com/jina-ai/jina#jina-hello-world-')
                cy.dataName('help-card-error').click()
            })
            it('should go to the Jina main Github page in new tab', () => {
                cy.dataName('help-card-info')
                .should('have.prop', 'href')
                .and('equal', 'https://opensource.jina.ai/')
                cy.dataName('help-card-info').click()
            })
            it('should go to the Jina LinkedIn page in new tab', () => {
                cy.dataName('help-card-linkedin')
                .should('have.prop', 'href')
                .and('equal', 'https://www.linkedin.com/company/jinaai/jobs/')
                cy.dataName('help-card-info').click()
            })
        })

    })
    
})