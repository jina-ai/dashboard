import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../../theme"
import Readme from "./Readme"

test("Readme", () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Readme
        documentation={
          "https://raw.githubusercontent.com/jina-ai/jina-hub/master/encoders/image/BigTransferEncoder/README.md"
        }
      />
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
