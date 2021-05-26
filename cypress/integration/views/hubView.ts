describe('Hub page', () => {
  before(() => {
    cy.intercept('images', { fixture: 'hubImages'})
    cy.visit('/#/hub')
  })

  it('should display the title "Jina Hub"', () => {
    cy.dataName('title').should('have.text', 'Jina Hub')
  })

  describe('hub actions overview', () => {
    it('shows actions user can take to explore, create images', () => {
      cy.dataName('primaryActionButton').should('contain.text', 'Browse')
      cy.dataName('secondaryActionButton').should('contain.text', 'Create')
    })
  })

  describe('hub images list preview', () => {
    it('shows a subset of hub images', () => {
      cy.dataName('hubImagesPreviewSubtitle').should('contain.text', 'Latest')
      cy.dataName('hubImageTags').should('contain.text', 'audio')
    })
  })

  describe('explore button ', () => {
    it('takes users to hub list page', () => {
      cy.intercept('images', { fixture: 'hubImages'})
      cy.dataName('primaryActionButton').should('contain.text', 'Browse').click()
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
      cy.dataName('hubImagesFilter').should('contain.text', 'Executor type')
    })

    it('fetches images matching current filters', () => {
      cy.dataName('hubImagesFilter').contains('Encoder').click()
    })

    it('keeps filter on back button', () => {
      cy.dataName('hubImagesFilter').contains('Encoder').click()
      cy.go("back")
      cy.dataName('primaryActionButton').should('contain.text', 'Browse').click()
      cy.dataName('hubImagesFilter').contains('Encoder')
    })

  })

  describe('hub image overview', () => {
    it('opens overview of hub image', () => {
      cy.dataName('hubImage').contains('LaserEncoder').click()
      cy.dataName('imageOverviewTitle').should('contain.text', 'LaserEncoder')
      cy.dataName('imageOverviewDescription').should('contain.text', 'B x D')
    })
  })
})
