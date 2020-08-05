import React from "react";
import renderer from "react-test-renderer";
import Component from "../ChartLegend";

describe("ChartLegend Component", () => {
  it("renders correctly with type bar", () => {
    const tree = renderer.create(
      <Component title="bob" subtitle="smith" type="bar" />
    );
    expect(
      tree.root.findByProps({ testID: "icon" }).props.style.borderRadius
    ).toBeUndefined();
    expect(tree.root.findByProps({ children: "bob" })).toBeTruthy();
    expect(tree.root.findByProps({ children: "smith" })).toBeTruthy();
  });

  it("renders correctly with type circle", () => {
    const tree = renderer.create(
      <Component title="bob" subtitle="smith" type="circle" />
    );
    expect(
      tree.root.findByProps({ testID: "icon" }).props.style.borderRadius
    ).not.toBeUndefined();
    expect(tree.root.findByProps({ children: "bob" })).toBeTruthy();
    expect(tree.root.findByProps({ children: "smith" })).toBeTruthy();
  });
});
