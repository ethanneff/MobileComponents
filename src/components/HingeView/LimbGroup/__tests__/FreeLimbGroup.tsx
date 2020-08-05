import React from "react";
import Victor from "victor";
import { testRender } from "../../../../commons/Utils/TestMocks/test-render";
import FreeLimbGroup from "../FreeLimbGroup";

describe("FreeLimbGroup Component", () => {
  it("renders correctly", () => {
    const { tree } = testRender(
      <FreeLimbGroup
        limbId="freeLimb"
        startPosition={new Victor(10, 20)}
        endPosition={new Victor(20, 20)}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
