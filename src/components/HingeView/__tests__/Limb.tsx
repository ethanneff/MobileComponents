import React from "react";
import Victor from "victor";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import Limb from "../Limb";

describe("Limb Component", () => {
  it("renders correctly", () => {
    const vector1 = new Victor(10, 20);
    const vector2 = new Victor(20, 20);

    const { tree } = testRender(
      <Limb
        id="limb"
        point1={vector1}
        point2={vector2}
        strokeWidth={5}
        strokeColor={"black"}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
