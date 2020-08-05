import React from "react";
import Dropdown from "..";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";

describe("dropdown", () => {
  it("shows dropdown with default props", () => {
    const { tree } = testRender(<Dropdown />);
    expect(tree.root.findByProps({ testID: "dropdown" })).toBeDefined();
  });

  it("shows dropdown with hidden", () => {
    const { tree } = testRender(<Dropdown placeholder="hello" hidden />);
    expect(tree.root.instance).toBeNull();
  });

  it("shows dropdown with props", () => {
    const onPress = jest.fn();
    const onChangeValue = jest.fn();
    const { tree } = testRender(
      <Dropdown
        placeholder="hello"
        values={["one", "two"]}
        onPress={onPress}
        onChangeValue={onChangeValue}
      />
    );
    const button = tree.root.findByProps({ testID: "dropdownButton" });
    const itemOne = tree.root.findByProps({ testID: "dropdownItemClose-one" });
    const itemTwo = tree.root.findByProps({ testID: "dropdownItemClose-two" });

    expect(
      tree.root.findByProps({ testID: "dropdownPlaceholder" }).props.title
    ).toBe("hello");

    expect(tree.root.findByProps({ testID: "dropdownItem-one" })).toBeDefined();
    expect(tree.root.findByProps({ testID: "dropdownItem-two" })).toBeDefined();

    button.props.onPress();
    expect(onPress).toBeCalled();

    itemOne.props.onPress();
    expect(onChangeValue).toBeCalledWith("one");

    itemTwo.props.onPress();
    expect(onChangeValue).toBeCalledWith("two");
  });
});
