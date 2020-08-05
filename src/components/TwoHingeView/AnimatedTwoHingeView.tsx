import React from "react";
import { Animated, Dimensions } from "react-native";
import { DifficultyAdjustmentFactor } from "../../commons/Physio";
import {
  FixedHinge,
  RestPosition,
  TargetZoneLength,
  TargetZonePosition
} from "./Enums";
import { TwoHingeViewExerciseConfig } from "./Interfaces";
import TwoHingeRenderer from "./TwoHingeRenderer";
import { TwoHingeViewPropsOptional, processTwoHinge } from ".";

const DEFAULT_CONFIG: TwoHingeViewExerciseConfig = {
  fixedHinge: FixedHinge.Top,
  restPosition: RestPosition.MiddleToOuter,
  targetPosition: TargetZonePosition.MiddleGravity,
  targetLength: TargetZoneLength.Inner,
  fixedPosition: "topMiddle",
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
};

export default Animated.createAnimatedComponent(
  class TwoHingeView extends React.PureComponent<TwoHingeViewPropsOptional> {
    render() {
      const {
        canvasSize = Dimensions.get("window").width,
        twoHingeViewExerciseConfig = DEFAULT_CONFIG,
        restAngleTolerance = 10,
        isRestPositionVisible = true,
        isRestTargetZone = false,
        target = {
          targetAngleTolerance: 20,
          isTargetZoneVisible: false,
          isInTargetZone: false,
          targetAngle: 180
        },
        isGhostLimbVisible = false,
        ghostLimbOpacity,
        invertMacroArc
      } = this.props;

      const {
        partialTargetZoneProps,
        ghostVectors,
        limbVectors,
        restVectors,
        restAngleTransformed,
        fixedHingeVector,
        pitchThighForTarget,
        limbSectionLength
      } = processTwoHinge(this.props);

      return (
        <TwoHingeRenderer
          {...{
            canvasSize,
            twoHingeViewExerciseConfig,
            restAngleTolerance,
            isRestPositionVisible,
            isRestTargetZone,
            target,
            isGhostLimbVisible,
            partialTargetZoneProps,
            ghostVectors,
            ghostLimbOpacity,
            invertMacroArc,
            limbVectors,
            restVectors,
            restAngleTransformed,
            fixedHingeVector,
            pitchThighForTarget,
            limbSectionLength
          }}
        />
      );
    }
  }
);
