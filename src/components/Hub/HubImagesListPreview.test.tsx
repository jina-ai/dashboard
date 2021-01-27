import React from "react";
import renderer from "react-test-renderer";
import HubImagesListPreview from "./HubImagesListPreview";

test("HubImagesListPreview", () => {
  const component = renderer.create(<HubImagesListPreview />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
