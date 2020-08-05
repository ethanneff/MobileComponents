import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Victor from "victor";
import { DifficultyAdjustmentFactor } from "../../commons/Physio";
import { Point2 } from "../../commons/Utils/Maths/geometry/Point";
import { HingeGridPositionPoints } from "../HingeView/HingeGrid";
import { TargetZoneProps } from "../HingeView/TargetZone";
import { undoDifficultyAdjustment } from "../../commons/Store/Session";
import { useRootDispatch } from "../../commons/Store/selectors";
import { collisionDetection } from "../../commons/Utils/Trigo";
import { Target, TwoHingeViewExerciseConfig } from "./Interfaces";
import {
  FixedHinge,
  RestPosition,
  TargetZoneLength,
  TargetZonePosition
} from "./Enums";
import TwoHingeRenderer from "./TwoHingeRenderer";

/**
 * Measurements are based on a SVG viewBox of 1600x1600
 */

export interface TwoHingeViewProps {
  /**
   * Width and height of the canvas
   * Always set by default to Dimensions.get("window").width
   */
  canvasSize?: number;

  /**
   * The {@link TwoHingeViewExerciseConfig} of the view to render the exercise
   */
  twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig;

  /**
   * Whether the rest position is visible or not
   */
  isRestPositionVisible: boolean;

  /**
   * Rest pitch value
   */
  restAngle: number;

  /**
   * Rest angle tolerance. Only used when rendering target zone for rest position.
   */
  restAngleTolerance?: number;

  /**
   * Render rest position like a target zone, instead of a gray line.
   */
  isRestTargetZone?: boolean;

  /**
   * The {@link Target} to be drawn.
   * Inner state will change depending on the position of the user
   */
  target: Target;

  /**
   * Pitch of the inner limb section, between [0, 360]
   * 0 is horizontal, light facing up
   * 90 is vertical, light facing forward
   */
  pitchInnerLimb: number;

  /**
   * Pitch of the outer limb section, between [0, 360]
   * 0 is horizontal, light facing up
   * 90 is vertical, light facing forward
   */
  pitchOuterLimb: number;

  /**
   * Whether to scale the length of the limb down
   */
  scaledDown?: boolean;

  /**
   * Ghost limb angle for rendering
   */
  ghostAngle?: number;

  /**
   * Whether the Ghost Limb (guiding limb line) is visible or not
   */
  isGhostLimbVisible?: boolean;

  /**
   * Opacity of the Ghost Limb (guiding limb line)
   */
  ghostLimbOpacity?: number;

  /**
   * Should MacroArc be inverted
   */
  invertMacroArc?: boolean;
}

export type TwoHingeViewPropsOptional = Partial<TwoHingeViewProps>;

/**
 * A limb is made up of 3 hinges,
 * those hinges are defined as a cartesian vector in the canvas (x, y)
 *
 * From those 3 points the limb can be drawn
 */
export interface Limb {
  fixedHingeVector: Victor;
  middleHingeVector: Victor;
  movingHingeVector: Victor;
}

interface LimbRotations {
  rotationFixedLimb: number;
  rotationFreeLimb: number;
}

export interface RestPositionVectors {
  vector1: Victor;
  vector2: Victor;
  vector3?: Victor;
}

const SENSOR_TO_CANVAS_ROTATION_OFFSET_DEG = 180;

/**
 * Apply a rotation offset to an angle in degrees
 * This is used because a 0 degrees pitch value is actually 180 in the canvas.
 * Also the rotation of the sensors are anti-clockwise, while the canvas is clockwise, so use the negative value of the pitch
 * Using this method, the view can be fed directly with the pitch values coming from the sensors
 *
 * @param angle in degrees, which will be applied the offset to
 */
const applyRotationOffset = (angle: number): number => {
  return SENSOR_TO_CANVAS_ROTATION_OFFSET_DEG - angle;
};

const SEMI_CIRCLE_ARC_DEG = 180;

/**
 * Get the number value of the target zone length, here used as radius for the arc
 *
 * @param targetZoneLength Enum describing the length of the target zone wanted
 * @param canvasSize Size of the squared canvas
 */
const getTargetZoneLength = (
  targetZoneLength: TargetZoneLength,
  limbSectionLength: number
): number => {
  switch (targetZoneLength) {
    case TargetZoneLength.WholeLimb:
      return limbSectionLength + limbSectionLength;

    case TargetZoneLength.Outer:
    case TargetZoneLength.Inner:
      return limbSectionLength;

    default:
      throw new TypeError(
        `targetZoneLength provided is of unknown value: ${targetZoneLength}`
      );
  }
};

const getLimbRotations = (
  fixedHinge: FixedHinge,
  pitchInnerLimb: number,
  pitchOuterLimb: number
): LimbRotations => {
  switch (fixedHinge) {
    case FixedHinge.Top:
      return {
        rotationFixedLimb: applyRotationOffset(pitchInnerLimb),
        rotationFreeLimb: applyRotationOffset(pitchOuterLimb)
      };
    case FixedHinge.Bottom:
      return {
        rotationFixedLimb: -pitchOuterLimb,
        rotationFreeLimb: -pitchInnerLimb
      };
  }
};

/**
 * Get the Zero position of the hinges, depending on
 * the fixed hinge.
 * Drawing always starts from this zero position.
 * At the zero position, the limbs are always at the
 * horizontal position, on the left of the fixed hinge.
 * Example:
 * X: Fixed Hinge
 * o: Moving hinge
 *
 *      o-------o-------X
 *
 * @param fixedHingePoint The fixed hinge vector
 */
const getZeroPosition = (
  fixedHingePoint: Point2,
  limbSectionLength: number
): Limb => {
  const zeroMiddleHingeX = fixedHingePoint.x - limbSectionLength;
  const zeroMiddleHingeY = fixedHingePoint.y;
  const zeroMovingHingeX = zeroMiddleHingeX - limbSectionLength;
  const zeroMovingHingeY = zeroMiddleHingeY;

  return {
    fixedHingeVector: new Victor(fixedHingePoint.x, fixedHingePoint.y),
    middleHingeVector: new Victor(zeroMiddleHingeX, zeroMiddleHingeY),
    movingHingeVector: new Victor(zeroMovingHingeX, zeroMovingHingeY)
  };
};

/**
 * Get the position of the limb by returning the
 * cartesian value of the vectors representing the position of
 * the inner limb section, middle hinge and outer limb section in the canvas
 *
 * @param zeroPosition Three vectors representing the Zero position of the inner limb section, middle hinge and outer limb section
 * @param pitchInnerLimb The pitch of the inner limb section, between 0 and 360
 * @param pitchOuterLimb The pitch of the outer limb section, between 0 and 360
 */
const getLimb = (
  zeroPosition: Limb,
  rotationFixedLimb: number,
  rotationFreeLimb: number
): Limb => {
  // Start from the zero position
  const fixedHingeVector = zeroPosition.fixedHingeVector.clone();
  const middleHingeVector = zeroPosition.middleHingeVector.clone();
  const movingHingeVector = zeroPosition.movingHingeVector.clone();

  // From the fixed point
  // Figure the position of the middle hinge
  middleHingeVector // Start with the middle hinge vector at the zero position
    .subtract(zeroPosition.fixedHingeVector) // Translate to (0, 0)
    .rotateByDeg(rotationFixedLimb)
    .add(zeroPosition.fixedHingeVector); // Translate back to the position of the fixed hinge

  // Figure out the position of the Moving hinge
  movingHingeVector // Start from the zero position of the Moving Hinge
    .subtract(zeroPosition.middleHingeVector) // Translate to (0, 0)
    .rotateByDeg(rotationFreeLimb)
    .add(middleHingeVector); // Translate back to the middle hinge position

  return {
    fixedHingeVector,
    middleHingeVector,
    movingHingeVector
  };
};

/**
 * Get two vectors giving the cartesian value of the starting point
 * and end point of a line representing the keel, ie the rest position.
 *
 * Since the rest position depends on the current position of the limb,
 * getLimb has to be used first to get the middleHingeVector and inner hinge vector
 *
 * @param restPosition Rest position used
 * @param restPitch Pitch of the rest position
 * @param limbZero Zero position of the limb, represented by 3 vectors (hip/shoulder, knee/elbow and shank/forearm)
 * @param middleHingeVector Vector representing the current position of the middle hinge,
 * get the current position using getLimb
 * @param fixedHingeVector Vector representing the current position of the fixed hinge,
 * get the current position using getLimb
 */
const getRestPosition = (
  restPosition: RestPosition,
  restPitch: number,
  targetPosition: TargetZonePosition,
  limbZero: Limb,
  middleHingeVector: Victor,
  fixedHingeVector: Victor
): RestPositionVectors => {
  // Rest position
  let restVector1: Victor;
  let restVector2: Victor;
  let restVector3: Victor | undefined;

  switch (restPosition) {
    case RestPosition.MiddleToOuter:
      // Find the point for the outer hinge
      // Start from the zero position of the outer hinge
      restVector1 = limbZero.movingHingeVector.clone();

      const rotationDeg = restPitch;
      // In the case of a KneeThigh target, the rest position is given as a relative angle, compensate with 90deg
      const rotationDegKneeThighTarget = rotationDeg + SEMI_CIRCLE_ARC_DEG / 2;

      restVector1
        .subtract(limbZero.middleHingeVector) // Translate to (0, 0)
        // Rotate the vector by the pitch given for the rest,
        // multiplied by -1 or 1 depending on the fixed hinge
        .rotateByDeg(
          targetPosition === TargetZonePosition.MiddleInner
            ? rotationDegKneeThighTarget
            : rotationDeg
        )
        .add(middleHingeVector); // Translate back to the knee postion

      // Assign vector2, as the knee position
      restVector2 = middleHingeVector;
      break;
    case RestPosition.MiddleToInner:
      // Find the point for the hip
      restVector1 = limbZero.movingHingeVector.clone(); // Start from the zero position

      restVector1
        .subtract(limbZero.middleHingeVector) // Translate the thigh vector back to (0, 0)
        // Rotate the vector by the pitch given for the rest
        .rotateByDeg(restPitch)
        .add(middleHingeVector); // Translate back to the knee position
      // Assign vector2, as the knee position
      restVector2 = middleHingeVector;
      break;
    case RestPosition.InnerToOuter:
      // Find the point for the knee
      restVector1 = limbZero.middleHingeVector.clone(); // Start from the knee zero position
      restVector1
        .subtract(limbZero.fixedHingeVector) // Translate to (0, 0)
        .rotateByDeg(restPitch) // Rotate by the pitch assign to the rest position
        .add(fixedHingeVector); // Translate to the hip position to get the actual knee position

      restVector2 = fixedHingeVector;
      // Vector 3 for the outer hinge, use it to draw a full straight leg
      restVector3 = limbZero.movingHingeVector.clone();
      restVector3
        .subtract(limbZero.middleHingeVector)
        .rotateByDeg(restPitch)
        .add(restVector1);
      break;
    case RestPosition.InnerToMiddle:
      // Find the point for the knee
      restVector1 = limbZero.middleHingeVector.clone(); // Start from the knee zero position
      restVector1
        .subtract(limbZero.fixedHingeVector) // Translate to (0, 0)
        .rotateByDeg(restPitch) // Rotate by the pitch assign to the rest position
        .add(fixedHingeVector); // Translate to the hip position to get the actual knee position
      // Assign vector2, as the knee position
      restVector2 = fixedHingeVector;
      break;
    case RestPosition.OuterToInner:
      // Find the point for the hip
      restVector1 = limbZero.movingHingeVector.clone(); // Start from the hip zero position
      restVector1
        .subtract(limbZero.fixedHingeVector) // Translate to (0, 0)
        // Rotate the vector by the pitch given for the rest
        .rotateByDeg(restPitch)
        .add(fixedHingeVector); // Translate to the outer hinge position to get the actual hip position
      // Assign vector2, as the outer hinge position
      restVector2 = fixedHingeVector;
      break;

    default:
      throw new TypeError(
        `restPosition provided is of unknown value: ${restPosition}`
      );
  }

  if (restVector3 === undefined) {
    return { vector1: restVector1, vector2: restVector2 };
  } else {
    return { vector1: restVector1, vector2: restVector2, vector3: restVector3 };
  }
};

/**
 * Get the path description of the target zone
 * @param targetPosition Position of the target zone
 * @param targetZoneLength Length/Radius of the target zone
 * @param targetPitch Pitch assign to the target, ie objective for the user
 * @param errorMargin + and - error margin around the target pitch
 * @param middleHingeVector Current position of the middle hinge
 * @param fixedHingeVector Current position of the fixed hinge
 * @param pitchThigh Current pitch of the thigh
 */
export const getTargetPath = (
  targetPosition: TargetZonePosition | RestPosition,
  targetZoneLength: TargetZoneLength,
  targetPitch: number,
  errorMargin: number,
  middleHingeVector: Victor,
  fixedHingeVector: Victor,
  pitchThigh: number,
  limbSectionLength: number
): TargetZoneProps => {
  // Get the actual number value of the target zone length/radius
  const targetZoneLengthValue = getTargetZoneLength(
    targetZoneLength,
    limbSectionLength
  );

  // Center of the virtual circle for the arc of target
  let targetVector: Victor;
  // In most cases, the pitch applied to the target for rendering is the actual target pitch
  let pitchTargetRendering = targetPitch;
  switch (targetPosition) {
    case TargetZonePosition.MiddleGravity:
      // Target drawn from the knee
      targetVector = middleHingeVector.clone();
      break;
    case TargetZonePosition.MiddleInner:
      // Target drawn from the knee
      targetVector = middleHingeVector.clone();
      // Follow the thigh
      // Because at the zero position, we want
      // the target to be over the thigh, add an extra 180 degrees
      pitchTargetRendering = pitchThigh + pitchTargetRendering;
      break;
    case TargetZonePosition.FixedHingeGravity:
      // Target drawn from the fixed hinge
      targetVector = fixedHingeVector.clone();
      break;
    default:
      throw new TypeError(
        `targetZonePosition provided is of unknown value: ${targetPosition}`
      );
  }

  const startAngle = pitchTargetRendering - errorMargin;
  const endAngle = pitchTargetRendering + errorMargin;

  return {
    centerArc: targetVector,
    radius: targetZoneLengthValue,
    startAngle,
    endAngle
  };
};

/**
 * Helper to generate an error message for incompatible ExerciseConfig parameters
 *
 * @param configParamDetails1 Description of the first parameter
 * @param configParamDetails2 Description of the second parameter
 */
const getIncompatibleConfigErrorString = (
  configParamDetails1: string,
  configParamDetails2: string
): string => {
  return (
    `Error: ${configParamDetails1} and ${configParamDetails2} together are likely to give unexpected rendering, ` +
    "double-check the ExerciseConfig provided"
  );
};

/**
 * Check the exercise configuration provided to the view will not give unexpected rendering results
 *
 * @param exerciseConfig Configuration being verified
 * @throws TypeError if some parameters of the configuration are likely to give unexpected rendering results
 *
 */
const checkConfiguration = (exerciseConfig: TwoHingeViewExerciseConfig) => {
  if (exerciseConfig.fixedHinge === FixedHinge.Top) {
    if (exerciseConfig.restPosition === RestPosition.MiddleToInner) {
      throw new TypeError(
        getIncompatibleConfigErrorString(
          "A fixed Torso",
          "a MiddleToInner rest position"
        )
      );
    }
  }
  if (exerciseConfig.fixedHinge === FixedHinge.Bottom) {
    if (exerciseConfig.restPosition === RestPosition.MiddleToOuter) {
      throw new TypeError(
        getIncompatibleConfigErrorString(
          "A fixed outer hinge",
          "a MiddleToOuter rest position"
        )
      );
    }
  }
};

const DEFAULT_PITCH = 90;
const DEFAULT_CONFIG: TwoHingeViewExerciseConfig = {
  fixedHinge: FixedHinge.Top,
  restPosition: RestPosition.MiddleToOuter,
  targetPosition: TargetZonePosition.MiddleGravity,
  targetLength: TargetZoneLength.Inner,
  fixedPosition: "topMiddle",
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
};

export function processTwoHinge(props: TwoHingeViewPropsOptional) {
  const {
    twoHingeViewExerciseConfig = DEFAULT_CONFIG,
    restAngle = DEFAULT_PITCH,
    pitchInnerLimb: pitchInnerLimb = DEFAULT_PITCH,
    pitchOuterLimb: pitchOuterLimb = DEFAULT_PITCH,
    target = {
      targetAngleTolerance: 20,
      isTargetZoneVisible: false,
      isInTargetZone: false,
      targetAngle: 180
    },
    scaledDown,
    ghostAngle
  } = props;

  const defaultLimbSectionLength = 210;
  const scaleDownFactor = 0.77;
  const scaledLimbSectionLength = defaultLimbSectionLength * scaleDownFactor;

  const limbSectionLength = scaledDown
    ? scaledLimbSectionLength
    : defaultLimbSectionLength;

  // If the configuration is probably wrong, stop here and display an error message
  try {
    checkConfiguration(twoHingeViewExerciseConfig);
  } catch (error) {
    throw Error(error.message);
  }

  const fixedHingeVector =
    HingeGridPositionPoints[twoHingeViewExerciseConfig.fixedPosition];

  // Start with getting the zero position
  const zeroPosition = getZeroPosition(fixedHingeVector, limbSectionLength);

  const { rotationFixedLimb, rotationFreeLimb } = getLimbRotations(
    twoHingeViewExerciseConfig.fixedHinge,
    pitchInnerLimb,
    pitchOuterLimb
  );

  const limbVectors = getLimb(
    zeroPosition,
    rotationFixedLimb,
    rotationFreeLimb
  );

  // Get the point for the rest position
  // Depends on the limb position

  const restAngleTransformed =
    twoHingeViewExerciseConfig.fixedHinge === FixedHinge.Top
      ? applyRotationOffset(restAngle)
      : -restAngle;

  const restVectors = getRestPosition(
    twoHingeViewExerciseConfig.restPosition,
    restAngleTransformed,
    twoHingeViewExerciseConfig.targetPosition,
    zeroPosition,
    limbVectors.middleHingeVector,
    limbVectors.fixedHingeVector
  );

  let ghostAngleTransformed: number | undefined;
  let ghostVectors: RestPositionVectors | undefined;
  if (ghostAngle !== undefined) {
    ghostAngleTransformed =
      twoHingeViewExerciseConfig.fixedHinge === FixedHinge.Top
        ? applyRotationOffset(ghostAngle)
        : -ghostAngle;
    ghostVectors = getRestPosition(
      twoHingeViewExerciseConfig.restPosition,
      ghostAngleTransformed,
      twoHingeViewExerciseConfig.targetPosition,
      zeroPosition,
      limbVectors.middleHingeVector,
      limbVectors.fixedHingeVector
    );
  }

  const targetAngle =
    twoHingeViewExerciseConfig.fixedHinge === FixedHinge.Top
      ? applyRotationOffset(target.targetAngle)
      : -target.targetAngle;
  const pitchThighForTarget = applyRotationOffset(pitchInnerLimb);
  // Depends on the limb position
  const partialTargetZoneProps = getTargetPath(
    twoHingeViewExerciseConfig.targetPosition,
    twoHingeViewExerciseConfig.targetLength,
    targetAngle,
    target.targetAngleTolerance,
    limbVectors.middleHingeVector,
    limbVectors.fixedHingeVector,
    pitchThighForTarget,
    limbSectionLength
  );

  const collision = target.isTargetZoneVisible
    ? collisionDetection(
        partialTargetZoneProps.endAngle,
        partialTargetZoneProps.startAngle,
        restVectors.vector1,
        restVectors.vector2
      )
    : false;

  return {
    collision,
    ghostVectors,
    limbVectors,
    restVectors,
    restAngleTransformed,
    partialTargetZoneProps,
    fixedHingeVector,
    pitchThighForTarget,
    limbSectionLength
  };
}

/**
 * A representation of a limb, made up of 3 hinges: inner hinge (hip/shoulder), middle hinge (knee/elbow), and outer hinge (ankle/wrist).
 * and two limb sections making up a limb: the inner section (thigh/upper arm) and outer section (shank/forearm).
 *
 * In order to draw the limb, the cartesian vector representation of the 3 hinges is used.
 * There is always one fixed hinge, either the inner or the outer hinge, depending on the
 * exercise and configuration provided.
 *
 * Since the pitches of the inner limb section and the outer limb section are known, drawing is based on those two values.
 * Using vector rotation, the correct position of the 3 hinges is computed.
 * The rotations applied are clockwise unless mentioned otherwise. Clockwise rotation
 * is the default in the canvas.
 *
 * The TwoHingeView handles the representation of a rest position as well as a target zone,
 * meant to be reached by the user.
 *
 * Once the position of the 3 hinges is figured out, the rest position (a single limb section)
 * and the target zone can be drawn.
 *
 * 1. Get the zero position
 * 2. Get the position of the non-TwoHingeViewPropsOptional hinges
 * 3. Get position of the rest representation (a single limb section)
 * 4. Get the path description of the target zone
 *
 */
export default function TwoHingeView(props: TwoHingeViewPropsOptional) {
  const dispatch = useRootDispatch();
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
  } = props;
  const {
    collision,
    partialTargetZoneProps,
    ghostVectors,
    limbVectors,
    restVectors,
    restAngleTransformed,
    fixedHingeVector,
    pitchThighForTarget,
    limbSectionLength
  } = processTwoHinge(props);

  useEffect(() => {
    if (collision) {
      dispatch(undoDifficultyAdjustment());
    }
  }, [dispatch, collision]);

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

export { default as AnimatedTwoHingeView } from "./AnimatedTwoHingeView";
