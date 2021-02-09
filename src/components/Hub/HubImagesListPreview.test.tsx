import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme";
import HubImagesListPreview from "./HubImagesListPreview";
import { HashRouter as Router, Route } from "react-router-dom";

test("HubImagesListPreview", () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Router>
        <HubImagesListPreview />
      </Router>
    </ThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
