import React from "react";
import Victor from "victor";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import Hinge from "../Hinge";

describe("Hinge Component", () => {
  it("renders correctly", () => {
    const position = new Victor(10, 20);
    const { tree } = testRender(
      <Hinge
        id="hinge"
        position={position}
        radius={15}
        strokeWidth={10}
        strokeColor={"green"}
        fillColor={"black"}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
