describe('Hub page', () => {
  before(() => {
    cy.intercept('GET', 'https://hubapi.jina.ai/images', { fixture: 'hubImages'})
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
      cy.dataName('hubOverviewActionButtonLabel').contains('Read more').click()
      cy.dataName('hubImagesList')
    })
  })

  describe('hub images', () => {
    it('shows a list of hub images', () => {
      cy.dataName('hubImagesList').dataName('hubImage').its('length').should('eq', 98)
    })
  })
})
