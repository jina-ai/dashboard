import React from "react"
import { render } from "@testing-library/react"
import { theme } from "../../theme"
import { ThemeProvider } from "@material-ui/core"
import { InfoToast } from "./InfoToast"

describe("InfoToast unit tests", () => {
  it("should render", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <InfoToast
          data={{ theme: "primary", message: "Some information banner" }}
        />
      </ThemeProvider>
    )

    expect(getByText("Some information banner")).not.toBeNull()
  })

  it("should not render when data is not available", () => {
    const props = {}
    const { container } = render(
      <ThemeProvider theme={theme}>
        <InfoToast {...(props as any)} />
      </ThemeProvider>
    )

    expect(container.innerHTML).toBe("")
  })
})
