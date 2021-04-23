describe("Login", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("should log you in and out", () => {
    const user = {
      login: "dummyUser",
      name: "dummyUserDisplayName",
      email: "dummyUser@jina.ai",
      id: "dummyId",
      avatar_url: "https://avatars.githubusercontent.com/u/25417797?v=4",
    }

    cy.intercept(Cypress.env("githubLambda") + "?ghcode=abcd1234", {
      statusCode: 200,
      body: {
        data: {
          access_token: "gho_abcd1234",
          token_type: "bearer",
          scope: "user",
        },
      },
    })

    cy.intercept(Cypress.env("githubApi"), {
      statusCode: 200,
      body: user,
    })

    cy.dataName("menuButton").click()
    cy.dataName("loginLogout").click()
    cy.url().should("include", "#/login")
    cy.visit("/?code=abcd1234#/login")
    cy.url().should("include", "#/logs")
    cy.get(".MuiAvatar-img")
      .should("have.attr", "src")
      .should("eq", user.avatar_url)

    cy.dataName("menuButton").click()
    cy.dataName("loginLogout").click()

    cy.get(".MuiAvatar-img").should("not.exist")
  })
})
