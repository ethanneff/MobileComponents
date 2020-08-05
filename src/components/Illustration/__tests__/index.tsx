import React from "react";
import renderer from "react-test-renderer";
import Component from "..";

describe("Illustration Component", () => {
  const image = require("../../../commons/Assets/Logo/image.png");
  it("renders correctly", () => {
    const component = renderer.create(<Component source={image} />);
    const illustrationComp = component.root.findByProps({
      testID: "illustration"
    });
    expect(illustrationComp).toBeDefined();
  });

  it("renders correctly with height", () => {
    const component = renderer.create(<Component source={image} height={50} />);
    const illustrationContainer = component.root.findByProps({
      testID: "illustrationContainer"
    });
    expect(illustrationContainer.props.style[0].height).toBe("50%");
  });
});
