import React from "react"
import { render } from "@testing-library/react"
import { theme } from "../../theme"
import { ThemeProvider } from "@emotion/react"
import { PageTitle } from "./PageTitle"

describe("PageTitle unit test cases", () => {
  it("should render", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageTitle title={"Page title"} className={""} />
      </ThemeProvider>
    )

    expect(container.innerHTML).not.toBe("")
  })

  it("should render page title", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <PageTitle title={"Page title"} className={""} />
      </ThemeProvider>
    )
    expect(getByText("Page title")).not.toBeNull()
  })

  it("should render subtitle", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <PageTitle
          title={"Page title"}
          subtitle={"Subtitle text"}
          className={""}
        />
      </ThemeProvider>
    )
    expect(getByText("Subtitle text")).not.toBeNull()
  })
})
