import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme";
import HubOverviewActionsContainer from "./HubOverviewActionsContainer";

test("actions on hub homepage", () => {
  const component = renderer.create(<ThemeProvider theme={theme} ><HubOverviewActionsContainer /></ThemeProvider>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
