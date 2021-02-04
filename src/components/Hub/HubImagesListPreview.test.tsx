import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme";
import HubImagesListPreview from "./HubImagesListPreview";

test("HubImagesListPreview", () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <HubImagesListPreview />
    </ThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
