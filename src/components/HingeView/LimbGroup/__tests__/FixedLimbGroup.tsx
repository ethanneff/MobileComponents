import React from "react";
import Victor from "victor";
import { testRender } from "../../../../commons/Utils/TestMocks/test-render";
import FixedLimbGroup from "../FixedLimbGroup";

describe("FixedLimbGroup Component", () => {
  it("renders correctly", () => {
    const { tree } = testRender(
      <FixedLimbGroup
        limbId="fixedLimb"
        fixedHingePosition={new Victor(10, 20)}
        endPosition={new Victor(20, 20)}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders correctly with scaledDown prop", () => {
    const { tree } = testRender(
      <FixedLimbGroup
        limbId="fixedLimb"
        fixedHingePosition={new Victor(10, 20)}
        endPosition={new Victor(20, 20)}
        scaledDown
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
