import React from "react";
import { View } from "react-native";
import renderer from "react-test-renderer";
import Component from "..";

describe("ModalWrapper component", () => {
  it("renders children", () => {
    const callback = jest.fn();
    const children = <View />;
    const component = renderer.create(
      <Component onBackgroundPress={callback}>{children}</Component>
    );
    component.root.props.onBackgroundPress();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("handles onBackgroundPress callback", () => {
    const callback = jest.fn();
    const children = <View testID="bob" />;
    const component = renderer.create(
      <Component onBackgroundPress={callback}>{children}</Component>
    );
    const internals = component.root.findAllByProps({ testID: "bob" });
    expect(internals).not.toHaveLength(0);
  });

  it("handles optional props", () => {
    const component = renderer.create(
      <Component onBackgroundPress={jest.fn()} maxHeight={2} maxWidth={3}>
        <View testID="bob" />
      </Component>
    );
    const modal = component.root.findByProps({ testID: "modal" });
    expect(modal.instance.props.style.maxHeight).toBe(2);
    expect(modal.instance.props.style.maxWidth).toBe(3);
  });
});
