import React from "react";
import renderer, { act } from "react-test-renderer";
import EtToggle from "..";

describe("EtSettingToggle", () => {
  it("renders correctly", () => {
    const tree = renderer.create(
      <EtToggle
        title="awesome option"
        value={true}
        onValueChange={jest.fn()}
        testID="testEtToggle"
      />
    );
    const settingText = tree.root.findByProps({ testID: "settingText" });
    const switchComp = tree.root.findAllByProps({ testID: "testEtToggle" })[1];
    expect(settingText.props.title).toBe("awesome option");
    expect(switchComp.props.value).toBe(true);
  });

  it("invokes onValueChange when toggle is pressed", () => {
    const onValueChange = jest.fn();
    const tree = renderer.create(
      <EtToggle
        title="awesome option"
        value={true}
        onValueChange={onValueChange}
      />
    );
    const switchComp = tree.root.findAllByProps({ testID: "switch" })[1];
    act(() => {
      switchComp.props.onValueChange();
    });
    expect(onValueChange).toHaveBeenCalled();
  });
});
