import React from "react";
import DeviceInfo from "react-native-device-info";
import renderer from "react-test-renderer";
import Component from "..";

describe("ProgressCircle Component", () => {
  it("renders correctly with defaults", () => {
    const tree = renderer.create(<Component title="hello" percent={0.2} />);
    expect(tree.root.findByProps({ children: "hello" })).toBeTruthy();
    expect(tree.root.findAllByProps({ children: "world" })).toHaveLength(0);
    expect(
      tree.root.findByProps({ children: "Mock Progress Circle" })
    ).toBeTruthy();
  });

  it("renders correctly with optionals", () => {
    const tree = renderer.create(
      <Component
        height={50}
        title="hello"
        subtitle="world"
        percent={0.2}
        thickness={20}
      />
    );
    expect(tree.toJSON()!.props.style.height).toBe(50);
    expect(tree.toJSON()!.props.style.marginLeft).toBe(20);
    expect(tree.root.findByProps({ children: "hello" })).toBeTruthy();
    expect(tree.root.findByProps({ children: "world" })).toBeTruthy();
    expect(
      tree.root.findByProps({ children: "Mock Progress Circle" })
    ).toBeTruthy();
  });

  it("renders correctly on tablet", () => {
    jest.spyOn(DeviceInfo, "isTablet").mockReturnValue(() => true);
    const tree = renderer.create(<Component title="hello" percent={0.2} />);
    expect(tree.toJSON()!.props.style.marginLeft).toBe(80);
  });
});
