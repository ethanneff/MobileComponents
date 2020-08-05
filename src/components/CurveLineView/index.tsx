import React, { memo, useEffect } from "react";
import Svg from "react-native-svg";
import { mod } from "../../commons/Utils/Maths";
import { Point2 } from "../../commons/Utils/Maths/geometry/Point";
import CurveTargetZone from "../HingeView/CurveTargetZone";
import CurveLimbGroup from "../HingeView/LimbGroup/CurveLimbGroup";
import { calculateControlPoints, getMidPointPosition } from "./utils";

interface TargetZoneProps {
  targetZoneAngle: number;
  tolerance: number;
}

interface ComponentProps {
  canvasSize: number;
  sensorAngle: number;
  isInTargetZone: boolean;
  startPosition: Point2;
  endPosition: Point2;
  onIsInTargetZoneChange(val: boolean): void;
}

type Props = TargetZoneProps & ComponentProps;

const normalizedAngleCalculation = (angle: number) => mod(angle - 89, 178) - 89;

/**
 * @description for rendering the curve line and target zone
 * @param {number} targetZoneAngle needs to be a value that is above -90 and below 90
 */

export default memo(function CurveLineView({
  canvasSize,
  sensorAngle,
  targetZoneAngle,
  tolerance,
  isInTargetZone,
  onIsInTargetZoneChange,
  startPosition,
  endPosition
}: Props) {
  const normalizedTargetZoneAngle = normalizedAngleCalculation(targetZoneAngle);

  const normalizedAngle = normalizedAngleCalculation(sensorAngle);

  const controlPointPosition = getMidPointPosition(startPosition, endPosition);

  const vectorPoints = calculateControlPoints(
    startPosition,
    controlPointPosition,
    normalizedTargetZoneAngle,
    normalizedAngle,
    tolerance
  );

  const newIsInTargetZone = calculateIsInTargetZone(
    normalizedTargetZoneAngle,
    tolerance,
    normalizedAngle
  );

  useEffect(() => {
    if (newIsInTargetZone !== isInTargetZone) {
      onIsInTargetZoneChange(newIsInTargetZone);
    }
  }, [newIsInTargetZone, isInTargetZone, onIsInTargetZoneChange]);
  return (
    <Svg width={canvasSize} height={canvasSize} viewBox={"0 0 1600 1600"}>
      <CurveTargetZone
        isInTargetZone={isInTargetZone}
        startHingePosition={startPosition}
        endHingePosition={endPosition}
        controlPointOuter={vectorPoints.controlPointOuter}
        controlPointInner={vectorPoints.controlPointInner}
      />
      <CurveLimbGroup
        startHingePosition={startPosition}
        endHingePosition={endPosition}
        controlPoint={vectorPoints.controlPointLine}
      />
    </Svg>
  );
});

const calculateIsInTargetZone = (
  targetZoneAngle: number,
  targetZoneTolerance: number,
  sensorAngle: number
) => {
  const delta = targetZoneTolerance / 2;
  return (
    targetZoneAngle - delta <= sensorAngle &&
    sensorAngle <= targetZoneAngle + delta
  );
};
