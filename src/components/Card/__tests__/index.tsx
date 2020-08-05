import React from "react";
import renderer from "react-test-renderer";
import Component from "..";
import Text from "../../Text";

describe("Card Component", () => {
  it("renders correctly with defaults", () => {
    const tree = renderer.create(
      <Component color="green">
        <Text title="hello" />
      </Component>
    );
    expect(tree.toJSON()!.props.style[0].backgroundColor).toBe("green");
    expect(tree.root.findByProps({ children: "hello" })).toBeTruthy();
  });

  it("renders correctly with optionals", () => {
    const tree = renderer.create(
      <Component color="blue" opacity={0.2} row>
        <Text title="children" />
      </Component>
    );
    const json = tree.toJSON()!;
    expect(json.props.style[1].flexDirection).toBe("row");
    expect(json.props.style[0].backgroundColor).toBe("blue");
    expect(tree.root.findByProps({ children: "children" })).toBeTruthy();
  });
});
