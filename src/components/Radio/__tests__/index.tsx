import React from "react";
import renderer from "react-test-renderer";
import Component from "..";

jest.mock("react-native-device-info", () => ({
  isTablet: jest.fn(() => true)
}));

describe("Radio Component", () => {
  const options = [
    { name: "bob", value: "1" },
    { name: "steve", value: "2" },
    { name: "jill", value: "3" }
  ];
  it("renders correctly", () => {
    const dom = renderer.create(
      <Component options={options} onChange={() => undefined} value="1" />
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders horizontally correctly", () => {
    const dom = renderer.create(
      <Component
        options={options}
        horizontal
        onChange={() => undefined}
        value="1"
      />
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders nothing when hidden", () => {
    const dom = renderer.create(
      <Component
        options={options}
        hidden
        onChange={() => undefined}
        value="1"
      />
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders nothing when invisible", () => {
    const dom = renderer.create(
      <Component
        options={options}
        invisible
        onChange={() => undefined}
        value="1"
      />
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders min and max text correctly", () => {
    const dom = renderer.create(
      <Component
        options={options}
        onChange={() => undefined}
        value="1"
        maxValueText="no"
        minValueText="yes"
      />
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("calls onChange when radio button is pressed", () => {
    const mock = jest.fn();
    const dom = renderer.create(
      <Component options={options} onChange={mock} value="1" testID="moo" />
    );
    const button = dom.root.findByProps({ testID: "moo-1" });
    button.props.onPress();
    expect(mock).toBeCalled();
  });
});
