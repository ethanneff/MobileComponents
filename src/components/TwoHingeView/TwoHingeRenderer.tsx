import Svg from "react-native-svg";
import React from "react";
import RestLimbGroup from "../HingeView/LimbGroup/RestLimbGroup";
import TargetZone, { TargetZoneProps } from "../HingeView/TargetZone";
import MacroArc from "../HingeView/MacroArc";
import GhostLimbGroup from "../HingeView/LimbGroup/GhostLimbGroup";
import FreeLimbGroup from "../HingeView/LimbGroup/FreeLimbGroup";
import FixedLimbGroup from "../HingeView/LimbGroup/FixedLimbGroup";
import { Point2 } from "../../commons/Utils/Maths/geometry/Point";
import { Target, TwoHingeViewExerciseConfig } from "./Interfaces";
import { Limb, RestPositionVectors, getTargetPath } from ".";

export type TwoHingeRendererProps = {
  canvasSize?: number;
  twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig;
  restAngleTolerance: number;
  isRestPositionVisible: boolean;
  isRestTargetZone?: boolean;
  target: Target;
  isGhostLimbVisible?: boolean;
  partialTargetZoneProps: TargetZoneProps;
  ghostVectors: RestPositionVectors | undefined;
  ghostLimbOpacity?: number;
  invertMacroArc?: boolean;
  limbVectors: Limb;
  restVectors: RestPositionVectors;
  restAngleTransformed: number;
  fixedHingeVector: Point2;
  pitchThighForTarget: number;
  limbSectionLength: number;
};

export default function TwoHingeRenderer(props: TwoHingeRendererProps) {
  const {
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
  } = props;
  return (
    <Svg width={canvasSize} height={canvasSize} viewBox={"0 0 1600 1600"}>
      {!isRestTargetZone && isRestPositionVisible && restVectors.vector3 && (
        <>
          <RestLimbGroup
            limbId="restLimb"
            startPosition={restVectors.vector2}
            endPosition={restVectors.vector1}
            hingeId="restHinge"
          />
          <RestLimbGroup
            limbId="restSecondLimb"
            startPosition={restVectors.vector1}
            endPosition={restVectors.vector3}
            hingeId="restSecondHinge"
          />
        </>
      )}

      {!isRestTargetZone && isRestPositionVisible && !restVectors.vector3 && (
        <RestLimbGroup
          limbId="restLimb"
          startPosition={restVectors.vector2}
          endPosition={restVectors.vector1}
          hingeId="restHinge"
        />
      )}
      {isRestTargetZone && isRestPositionVisible && (
        <TargetZone
          {...getTargetPath(
            twoHingeViewExerciseConfig.restPosition,
            twoHingeViewExerciseConfig.targetLength,
            restAngleTransformed,
            restAngleTolerance,
            limbVectors.middleHingeVector,
            limbVectors.middleHingeVector,
            pitchThighForTarget,
            limbSectionLength
          )}
          isInTargetZone={false}
        />
      )}
      {isGhostLimbVisible && (
        <MacroArc
          startAngle={restAngleTransformed}
          endAngle={
            invertMacroArc
              ? partialTargetZoneProps.endAngle
              : partialTargetZoneProps.startAngle
          }
          centerX={fixedHingeVector.x}
          centerY={fixedHingeVector.y}
          limbLength={limbSectionLength}
          scaledDown
        />
      )}
      {target.isTargetZoneVisible && (
        <TargetZone
          {...partialTargetZoneProps}
          isInTargetZone={target.isInTargetZone}
        />
      )}

      {isGhostLimbVisible && ghostVectors && ghostVectors.vector3 && (
        <GhostLimbGroup
          startPosition={ghostVectors.vector2}
          endPosition={ghostVectors.vector3}
          opacity={ghostLimbOpacity}
        />
      )}
      <FreeLimbGroup
        limbId="freeLimb"
        startPosition={limbVectors.middleHingeVector}
        endPosition={limbVectors.movingHingeVector}
        hingeId="movingHinge"
      />
      <FixedLimbGroup
        limbId="fixedLimb"
        fixedHingePosition={limbVectors.fixedHingeVector}
        endPosition={limbVectors.middleHingeVector}
        fixedHingeId="fixedHinge"
        freeHingeId="knee"
      />
    </Svg>
  );
}
