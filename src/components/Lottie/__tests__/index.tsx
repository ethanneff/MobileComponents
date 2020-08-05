import React from "react";
import renderer from "react-test-renderer";
import Component from "..";

describe("Lottie component", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(<Component hidden={false} source={require("./example.json")} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("renders correctly without defaults", () => {
    const component = renderer
      .create(
        <Component
          source={require("./example.json")}
          repeat={false}
          size={1}
          style={{ flex: 1 }}
          autoPlay={false}
          hidden={false}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("renders null if hidden is true", () => {
    const component = renderer
      .create(<Component source={require("./example.json")} hidden />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
