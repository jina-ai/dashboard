import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../../theme"
import MiscPage from "./MiscPage"

test("Misc page", () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <MiscPage />
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
