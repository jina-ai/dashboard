import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../../theme"
import ImageDetails from "./ImageDetails"
import { HubImage } from "../../redux/hub/hub.types"

test("ImageDetails", () => {
  const image = {
    platform: ["Enel"],
    author: "Oda",
    keywords: ["encoder"],
    "docker-command": "whatever",
  }
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <ImageDetails image={(image as unknown) as HubImage} />
    </ThemeProvider>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
