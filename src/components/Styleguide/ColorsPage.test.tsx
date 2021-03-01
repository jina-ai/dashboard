import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../../theme"
import ColorsPage from "./ColorsPage"

test("Colors page", () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <ColorsPage />
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
