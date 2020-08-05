import React from "react";
import renderer from "react-test-renderer";
import Component from "..";
import { ProgressActivity } from "../../../commons/Models";

const exampleBar: ProgressActivity[] = [
  { count: 3, highlighted: true, label: "one" },
  { count: 4, highlighted: false, label: "two" },
  { count: 0, highlighted: false, label: "three" }
];

const exampleCircle: ProgressActivity[] = [
  { count: 1, highlighted: true, label: "one" },
  { count: 1, highlighted: false, label: "two" },
  { count: 0, highlighted: false, label: "three" }
];

const exampleYAxis = ["10", "7", "3", " 1"];

describe("Chart Component", () => {
  it("renders bar", () => {
    const tree = renderer.create(
      <Component
        items={exampleBar}
        title="hello"
        subtitle="world"
        type="bar"
        height={50}
        totalCount={10}
      />
    );
    expect(tree.root.findAllByProps({ testID: "bar" })).not.toHaveLength(0);
    expect(tree.root.findAllByProps({ testID: "circle" })).toHaveLength(0);
  });

  it("renders circle", () => {
    const tree = renderer.create(
      <Component
        items={exampleCircle}
        title="hello"
        subtitle="world"
        type="circle"
        height={50}
        totalCount={10}
      />
    );
    expect(tree.root.findAllByProps({ testID: "circle" })).not.toHaveLength(0);
    expect(tree.root.findAllByProps({ testID: "bar" })).toHaveLength(0);
  });

  it("renders bar with yAxis", () => {
    const tree = renderer.create(
      <Component
        items={exampleBar}
        title="hello"
        subtitle="world"
        type="bar"
        height={50}
        totalCount={10}
        yAxis={exampleYAxis}
      />
    );
    expect(tree.root.findAllByProps({ testID: "bar" })).not.toHaveLength(0);
    expect(tree.root.findAllByProps({ testID: "circle" })).toHaveLength(0);
    expect(tree.root.findAllByProps({ testID: "yAxis" })).not.toHaveLength(0);
  });

  it("renders circle with yAxis", () => {
    const tree = renderer.create(
      <Component
        items={exampleCircle}
        title="hello"
        subtitle="world"
        type="circle"
        height={50}
        totalCount={10}
        yAxis={exampleYAxis}
      />
    );
    expect(tree.root.findAllByProps({ testID: "circle" })).not.toHaveLength(0);
    expect(tree.root.findAllByProps({ testID: "bar" })).toHaveLength(0);
    expect(tree.root.findAllByProps({ testID: "yAxis" })).not.toHaveLength(0);
  });
});
