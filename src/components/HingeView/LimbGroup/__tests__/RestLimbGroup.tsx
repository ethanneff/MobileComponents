import React from "react";
import Victor from "victor";
import { testRender } from "../../../../commons/Utils/TestMocks/test-render";
import RestLimbGroup from "../RestLimbGroup";

describe("RestLimbGroup Component", () => {
  it("renders correctly", () => {
    const { tree } = testRender(
      <RestLimbGroup
        limbId="restLimb"
        startPosition={new Victor(10, 20)}
        endPosition={new Victor(20, 20)}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders correctly with scaledDown prop", () => {
    const { tree } = testRender(
      <RestLimbGroup
        limbId="restLimb"
        startPosition={new Victor(10, 20)}
        endPosition={new Victor(20, 20)}
        scaledDown
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
