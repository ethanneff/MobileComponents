import React from "react";
import Victor from "victor";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import TargetZone from "../TargetZone";

describe("TargetZone Component", () => {
  it("renders correctly", () => {
    const { tree } = testRender(
      <TargetZone
        centerArc={new Victor(10, 20)}
        radius={10}
        startAngle={90}
        endAngle={120}
        isInTargetZone={true}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders correctly out of targetZone", () => {
    const { tree } = testRender(
      <TargetZone
        centerArc={new Victor(10, 20)}
        radius={10}
        startAngle={90}
        endAngle={120}
        isInTargetZone={false}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
