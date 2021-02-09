import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme";
import store from "../../redux";
import HubImagesListPreview from "./HubImagesListPreview";
import { HashRouter as Router } from "react-router-dom";

test("HubImagesListPreview", () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <HubImagesListPreview />
        </Router>
      </Provider>
    </ThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
