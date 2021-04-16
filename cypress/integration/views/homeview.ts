describe.skip("Hub page", () => {
  before(() => {
    cy.intercept("images", { fixture: "hubImages" })
    cy.visit("/#/home")
  })

  it("should display the resources", () => {
    cy.contains("Resources")
    cy.contains("Jina 101")
    cy.contains("Jina Docs")
    cy.contains('Jina "Hello World"')
    cy.contains("Visit us on Github!")
  })

  it("should have Jina 101 link", () => {
    cy.dataName("jina-101-card").should(
      "have.attr",
      "href",
      "https://101.jina.ai"
    )
  })

  it("should have Jina docs link", () => {
    cy.dataName("jina-docs-card").should(
      "have.attr",
      "href",
      "https://docs.jina.ai"
    )
  })

  it.skip("should have Jina hello world link", () => {
    cy.dataName("jina-hello-world-card").should(
      "have.attr",
      "href",
      "https://github.com/jina-ai/jina#jina-hello-world-"
    )
  })

  it.skip("should have Jina github url link", () => {
    cy.dataName("jina-github-card").should(
      "have.attr",
      "href",
      "https://opensource.jina.ai"
    )
  })
})
