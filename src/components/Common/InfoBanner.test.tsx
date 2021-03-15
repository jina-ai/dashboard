import React from "react"
import { render } from "@testing-library/react"
import { theme } from "../../theme"
import { ThemeProvider } from "@emotion/react"
import { InfoBanner } from "./InfoBanner"

describe("InfoBanner unit tests", () => {
  it("should render", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <InfoBanner
          data={{ theme: "primary", message: "Some information banner" }}
        />
      </ThemeProvider>
    )

    expect(getByText("Some information banner")).not.toBeNull()
  })

  it("should not render when data is not present", () => {
    const props = {}
    const { container } = render(
      <ThemeProvider theme={theme}>
        <InfoBanner {...(props as any)} />
      </ThemeProvider>
    )

    expect(container.innerHTML).toBe("")
  })
})
