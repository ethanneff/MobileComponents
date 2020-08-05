import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Svg from "react-native-svg";
import {
  collisionDetection,
  polarToCartesian
} from "../../commons/Utils/Trigo";
import { HingeGridPositionPoints } from "../HingeView/HingeGrid";
import FixedLimbGroup from "../HingeView/LimbGroup/FixedLimbGroup";
import RestLimbGroup from "../HingeView/LimbGroup/RestLimbGroup";
import TargetZone from "../HingeView/TargetZone";
import { Target } from "../TwoHingeView/Interfaces";
import { useRootDispatch } from "../../commons/Store/selectors";
import { undoDifficultyAdjustment } from "../../commons/Store/Session";
import { OneHingeViewExerciseConfig } from "./interfaces";
import { getAngleTransformation } from "./utils";

export interface OneHingeViewProps {
  /**
   * Width and height of the canvas
   * Always set by default to Dimensions.get("window").width
   */
  canvasSize?: number;

  /**
   * Whether the rest position is visible or not
   */
  isRestPositionVisible: boolean;

  /**
   * The configuation for the view to render the exercise
   */
  oneHingeViewExerciseConfig: OneHingeViewExerciseConfig;

  /**
   * Rest angle value
   */
  restAngle: number;

  /**
   * The {@link Target} to be drawn.
   * Inner state will change depending on the position of the user
   */
  target: Target;

  /**
   * Angle of the chest sensor, between [0, 360]
   * 0 is horizontal, light facing up
   * 90 is vertical, light facing forward
   */
  angleChest: number;

  /**
   * Whether to scale the length of the limb down
   */
  scaledDown?: boolean;
}
const LIMB_LENGTH = 400;
const SCALED_DECREMENT = 96;
const CENTERED_AND_SCALED_LIMB_LENGTH = LIMB_LENGTH - SCALED_DECREMENT;
const TARGET_PATH_RADIUS = 450;
const CENTERED_AND_SCALED_TARGET_PATH_LENGTH =
  TARGET_PATH_RADIUS - SCALED_DECREMENT;

export default function OneHingeView(props: OneHingeViewProps) {
  const dispatch = useRootDispatch();
  const {
    canvasSize = Dimensions.get("window").width,
    isRestPositionVisible,
    target,
    angleChest,
    restAngle,
    oneHingeViewExerciseConfig: oneHingeViewExerciseConfig,
    scaledDown
  } = props;
  const fixedHingePosition =
    HingeGridPositionPoints[oneHingeViewExerciseConfig.fixedPosition];

  const transform = getAngleTransformation(
    oneHingeViewExerciseConfig.angleTransformation
  );

  const angleChestVectors = polarToCartesian(
    fixedHingePosition.x,
    fixedHingePosition.y,
    scaledDown ? CENTERED_AND_SCALED_LIMB_LENGTH : LIMB_LENGTH,
    transform(angleChest)
  );
  const restAngleVectors = polarToCartesian(
    fixedHingePosition.x,
    fixedHingePosition.y,
    scaledDown ? CENTERED_AND_SCALED_LIMB_LENGTH : LIMB_LENGTH,
    transform(restAngle)
  );

  const startAngle = transform(
    target.targetAngle - target.targetAngleTolerance
  );
  const endAngle = transform(target.targetAngle + target.targetAngleTolerance);

  const collision = collisionDetection(
    startAngle,
    endAngle,
    restAngleVectors,
    fixedHingePosition
  );
  useEffect(() => {
    if (collision) {
      dispatch(undoDifficultyAdjustment());
    }
  }, [dispatch, collision]);

  return (
    <Svg width={canvasSize} height={canvasSize} viewBox={"0 0 1600 1600"}>
      {target.isTargetZoneVisible && (
        <TargetZone
          centerArc={fixedHingePosition}
          radius={
            scaledDown
              ? CENTERED_AND_SCALED_TARGET_PATH_LENGTH
              : TARGET_PATH_RADIUS
          }
          startAngle={startAngle}
          endAngle={endAngle}
          isInTargetZone={target.isInTargetZone}
        />
      )}
      {isRestPositionVisible && (
        <RestLimbGroup
          limbId="restPosition"
          startPosition={fixedHingePosition}
          endPosition={restAngleVectors}
          scaledDown={scaledDown}
        />
      )}
      <FixedLimbGroup
        limbId="fixedLimb"
        fixedHingePosition={fixedHingePosition}
        endPosition={angleChestVectors}
        scaledDown={scaledDown}
      />
    </Svg>
  );
}
