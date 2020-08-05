import React from "react";
import renderer from "react-test-renderer";
import Theme from "../../../commons/Theme";
import Component from "../ChartItem";

describe("ChartItem Component", () => {
  it("renders bar with count", () => {
    const tree = renderer.create(
      <Component height={50} title="hello" type="bar" count={1} />
    );
    expect(tree.root.findAllByProps({ testID: "bar" })).not.toHaveLength(0);
    expect(tree.root.findAllByProps({ testID: "circle" })).toHaveLength(0);
    expect(tree.root.findByProps({ children: "hello" })).toBeTruthy();
  });

  it("renders no bar with no count", () => {
    const tree = renderer.create(
      <Component height={50} title="hello" type="bar" />
    );
    expect(tree.root.findAllByProps({ testID: "bar" })).toHaveLength(0);
    expect(tree.root.findAllByProps({ testID: "circle" })).toHaveLength(0);
    expect(tree.root.findByProps({ children: "hello" })).toBeTruthy();
  });

  it("renders no circle with no count", () => {
    const tree = renderer.create(
      <Component height={50} title="hello" type="circle" />
    );
    expect(tree.root.findAllByProps({ testID: "circle" })).toHaveLength(0);
    expect(tree.root.findAllByProps({ testID: "bar" })).toHaveLength(0);
    expect(tree.root.findByProps({ children: "hello" })).toBeTruthy();
  });

  it("renders circle with count", () => {
    const tree = renderer.create(
      <Component height={50} title="hello" type="circle" count={1} />
    );
    expect(tree.root.findAllByProps({ testID: "circle" })).not.toHaveLength(0);
    expect(tree.root.findAllByProps({ testID: "bar" })).toHaveLength(0);
    expect(tree.root.findByProps({ children: "hello" })).toBeTruthy();
  });

  it("renders bar height as a portion of total count", () => {
    const tree = renderer.create(
      <Component
        height={50}
        title="hello"
        type="bar"
        count={1}
        totalCount={10}
      />
    );
    expect(
      tree.root.findByProps({ testID: "bar" }).instance.props.style.height
    ).toBe("10%");
    expect(tree.root.findAllByProps({ testID: "bar" })).not.toHaveLength(0);
    expect(tree.root.findAllByProps({ testID: "circle" })).toHaveLength(0);
    expect(tree.root.findByProps({ children: "hello" })).toBeTruthy();
  });

  it("renders selected", () => {
    const tree = renderer.create(
      <Component
        height={50}
        selected
        title="hello"
        type="circle"
        count={1}
        totalCount={10}
      />
    );

    const xAxis = tree.root.findByProps({ testID: "xAxis" });

    expect(xAxis.instance.props.style[1].color).toBe(Theme.color.neutral900);
    expect(xAxis.instance.props.style[1].fontFamily).toBe(
      Theme.fontWeight.medium
    );
  });

  it("renders not selected", () => {
    const tree = renderer.create(
      <Component
        height={50}
        title="hello"
        type="circle"
        count={1}
        totalCount={10}
      />
    );
    const xAxis = tree.root.findByProps({ testID: "xAxis" });
    expect(xAxis.instance.props.style[0].color).toBe(Theme.color.neutral700);
    expect(xAxis.instance.props.style[1]).toBeUndefined();
  });
});
