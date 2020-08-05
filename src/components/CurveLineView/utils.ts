import Victor from "victor";
import Errors from "../../commons/Errors";
import { Point2 } from "../../commons/Utils/Maths/geometry/Point";

export function getMidPointPosition(
  startPosition: Point2,
  endPosition: Point2
) {
  return new Victor(
    (startPosition.x + endPosition.x) / 2,
    (startPosition.y + endPosition.y) / 2
  );
}

// Vector stuff

type Scalar = number;

function vAdd(v1: Point2, v2: Point2): Victor {
  return new Victor(v1.x + v2.x, v1.y + v2.y);
}
function vTimes(scalar: Scalar, vector: Victor): Victor {
  return new Victor(vector.x * scalar, vector.y * scalar);
}
const vLength = ({ x, y }: Victor) => Math.sqrt(x * x + y * y);

/**
 *
 * @param v
 * @returns a vector orthogonal to `v`
 */
function vPerpendicular({ x, y }: Victor): Victor {
  if (y === 0 && x === 0) {
    throw new Error(Errors.INVALID_ORTHOGANAL_VECTOR);
  } else if (y === 0) {
    return new Victor(-y / x, 1);
  }

  return new Victor(1, -x / y);
}

function vNormalize(v: Victor): Victor {
  return vTimes(1 / vLength(v), v);
}

function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}

export const calculateControlPoints = (
  startPosition: Point2,
  midPointPosition: Point2,
  targetZoneAngle: number,
  sensorAngle: number,
  tolerance: number
) => {
  const targetZoneAngleInner = targetZoneAngle - tolerance / 2;
  const targetZoneAngleOuter = targetZoneAngle + tolerance / 2;

  return {
    controlPointOuter: getControlPoint(
      startPosition,
      midPointPosition,
      targetZoneAngleOuter
    ),
    controlPointInner: getControlPoint(
      startPosition,
      midPointPosition,
      targetZoneAngleInner
    ),
    controlPointLine: getControlPoint(
      startPosition,
      midPointPosition,
      sensorAngle
    )
  };
};

const getControlPoint = (start: Point2, midpoint: Point2, angle: number) => {
  const vectorA = new Victor(start.x - midpoint.x, start.y - midpoint.y);
  const lengthA = vLength(vectorA);

  const lengthB =
    (lengthA * Math.sin(toRadians(angle))) / Math.cos(toRadians(angle));

  const vectorPerpendicular = vNormalize(vPerpendicular(vectorA));

  const vectorPoint = vTimes(lengthB, vectorPerpendicular);
  const controlPoint = vAdd(midpoint, vectorPoint);

  return controlPoint;
};
