import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../../theme"
import TypographyPage from "./TypographyPage"

test("Typograpy page", () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <TypographyPage />
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
