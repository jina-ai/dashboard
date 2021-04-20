import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../../theme"
import ImageCard from "./ImageCard"
import { HashRouter as Router } from "react-router-dom"

test("ImageCard", () => {
  const image = {
    name: "Enel",
    author: "Oda",
    keywords: ["encoder"],
    kind: "encoder",
    description: "whatever",
  }
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Router>
        <ImageCard image={image} index={7} />
      </Router>
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
