import {
  RendererViewConfig,
  ViewExerciseConfig
} from "../../commons/Physio/SupportedExercises";
import { HingeGridPosition } from "../HingeView/HingeGrid";
import {
  FixedHinge,
  RestPosition,
  TargetZoneLength,
  TargetZonePosition
} from "./Enums";

/**
 * Defines a target to be reached by the user
 */
export interface Target {
  /**
   * If true, the target will be visible
   */
  isTargetZoneVisible: boolean;

  /**
   * True if the current position is within the target zone
   */
  isInTargetZone: boolean;

  /**
   * Pitch value of the target zone, user should aim to reach this value +/- errorMargin
   */
  targetAngle: number;

  /**
   * Error margin allowed for this target, user should aim to reach pitch +/- errorMargin
   */
  targetAngleTolerance: number;
}

/**
 * Configuration of the view, it can be used by one or many exercises.
 * For example, doing a squat, a half squat, or a single leg dip exercise is in the end rendered using a LegDip config.
 * Meant to passed as a Prop
 */
export interface TwoHingeViewExerciseConfig extends ViewExerciseConfig {
  /**
   * @see FixedHinge
   */
  fixedHinge: FixedHinge;

  fixedPosition: HingeGridPosition;

  /**
   * @see RestPosition
   */
  restPosition: RestPosition;

  /**
   * @see TargetZonePosition
   */
  targetPosition: TargetZonePosition;

  /**
   * @see TargetZoneLength
   */
  targetLength: TargetZoneLength;
}

export function isTwoHingeViewConfig(
  c: RendererViewConfig
): c is TwoHingeViewExerciseConfig {
  return (c as TwoHingeViewExerciseConfig).fixedHinge !== undefined;
}
