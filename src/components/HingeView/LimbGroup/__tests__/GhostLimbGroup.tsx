import React from "react";
import { Rect } from "react-native-svg";
import Victor from "victor";
import { testRender } from "../../../../commons/Utils/TestMocks/test-render";
import Hinge from "../../Hinge";
import GhostLimbGroup from "../GhostLimbGroup";

describe("GhostLimbGroup Component", () => {
  it("renders correctly", () => {
    const { tree } = testRender(
      <GhostLimbGroup
        startPosition={new Victor(10, 20)}
        endPosition={new Victor(20, 20)}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders alternate styling when scaledDown is true", () => {
    const { findByType } = testRender(
      <GhostLimbGroup
        startPosition={new Victor(10, 20)}
        endPosition={new Victor(20, 20)}
        scaledDown
      />
    );

    expect(findByType(Rect).props.height).toBe(19);
    expect(findByType(Hinge).props.radius).toBe(20);
  });

  it("accepts a custom opacity", () => {
    const { findByProps } = testRender(
      <GhostLimbGroup
        startPosition={new Victor(10, 20)}
        endPosition={new Victor(20, 20)}
        opacity={0.25}
      />
    );

    expect(findByProps({ opacity: 0.25 })).toBeTruthy();
  });
});
