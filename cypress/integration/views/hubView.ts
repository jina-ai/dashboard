describe('Hub page', () => {
  before(() => {
    cy.visit('/#/hub')
  })

  it('should display the title "Jina Hub"', () => {
    cy.dataName('title').should('have.text', 'Jina Hub')
  })

  describe('hub actions overview', () => {
    it('shows actions user can take to explore, create images', () => {
      cy.dataName('hubOverviewActionTitle').should('contain.text', 'Explore')
      cy.dataName('hubOverviewActionButtonLabel').should('contain.text', 'Let\'s Go')
    })
  })

  describe('hub images list preview', () => {
    it('shows a subset of hub images', () => {
      cy.dataName('hubImagesPreviewSubtitle').should('contain.text', 'Latest')
      cy.dataName('hubImageTags').should('contain.text', 'Search')
    })
  })

  describe('explore button ', () => {
    it('takes users to hub list page', () => {
      cy.intercept('images', { fixture: 'hubImages'})
      cy.dataName('hubOverviewActionButtonLabel').contains('Read more').click()
      cy.dataName('hubImagesList')
    })
  })

  describe('hub images', () => {
    it('shows a list of hub images', () => {
      cy.fixture('hubImages').then(hubImages => {
        cy.dataName('hubImagesList').dataName('hubImage').its('length').should('eq', hubImages.length)
      })
    })
  })

  describe('hub images filters', () => {
    it('shows a list of filters generated from hub images', () => {
      cy.dataName('hubImagesFilter').should('contain.text', 'Type of image')
    })

    it('fetches images matching current filters', () => {
      cy.dataName('hubImagesFilter').contains('encoder').click()
      cy.dataName('hubImagesFilter').contains('nlp').click()
    })

  })
})
