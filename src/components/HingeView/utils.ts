import { Point2 } from "../../commons/Utils/Maths/geometry/Point";
import { polarToCartesian } from "../../commons/Utils/Trigo";

export const LIMB_LENGTH = 400;
export const SCALED_DECREMENT = 96;
export const TARGET_PATH_RADIUS = 450;
export const CENTERED_AND_SCALED_LIMB_LENGTH = LIMB_LENGTH - SCALED_DECREMENT;
export const CENTERED_AND_SCALED_TARGET_PATH_LENGTH =
  TARGET_PATH_RADIUS - SCALED_DECREMENT;

export const angleVectors = (
  angle: number,
  startPosition: Point2,
  scaledDown?: boolean
) =>
  polarToCartesian(
    startPosition.x,
    startPosition.y,
    scaledDown ? CENTERED_AND_SCALED_LIMB_LENGTH : LIMB_LENGTH,
    angle
  );
