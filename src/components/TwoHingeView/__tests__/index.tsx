import React from "react";
import TwoHingeView from "..";
import { DifficultyAdjustmentFactor } from "../../../commons/Physio";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import GhostLimbGroup from "../../HingeView/LimbGroup/GhostLimbGroup";
import RestLimbGroup from "../../HingeView/LimbGroup/RestLimbGroup";
import {
  FixedHinge,
  RestPosition,
  TargetZoneLength,
  TargetZonePosition
} from "../Enums";
import { TwoHingeViewExerciseConfig } from "../Interfaces";

const canvasSize = 600;
const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
  fixedHinge: FixedHinge.Top,
  restPosition: RestPosition.InnerToOuter,
  targetPosition: TargetZonePosition.FixedHingeGravity,
  targetLength: TargetZoneLength.WholeLimb,
  fixedPosition: "centerMiddle",
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
};
const twoHingeViewProps = {
  canvasSize,
  pitchInnerLimb: 0,
  pitchOuterLimb: 0,
  twoHingeViewExerciseConfig
};

it("renders correctly with defaults", () => {
  const { tree } = testRender(<TwoHingeView />);
  expect(tree).toMatchSnapshot();
});

it("renders scaled limbs when scaledDown is true", () => {
  const { findByType: findDefault } = testRender(<TwoHingeView />);
  const { findByType: findScaledDown } = testRender(
    <TwoHingeView scaledDown />
  );

  const defautlEndOfLimb = findDefault(RestLimbGroup).props.endPosition.y;
  const scaledEndOfLimb = findScaledDown(RestLimbGroup).props.endPosition.y;

  expect(scaledEndOfLimb).toBeLessThan(defautlEndOfLimb);
});

it("renders Ghost Limb", () => {
  const { findByType } = testRender(
    <TwoHingeView
      {...twoHingeViewProps}
      isGhostLimbVisible={true}
      ghostLimbOpacity={0.25}
      ghostAngle={50}
    />
  );

  expect(findByType(GhostLimbGroup).props.opacity).toBe(0.25);
});
