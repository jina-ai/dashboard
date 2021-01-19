import React from "react";
import renderer from "react-test-renderer";
import HubOverviewActionsContainer from "./HubOverviewActionsContainer";

test("actions on hub homepage", () => {
  const component = renderer.create(<HubOverviewActionsContainer />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
