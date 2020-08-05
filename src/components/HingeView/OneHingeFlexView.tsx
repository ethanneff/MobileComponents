import React, { memo, useEffect } from "react";
import { Dimensions } from "react-native";
import Svg from "react-native-svg";
import { Point2 } from "../../commons/Utils/Maths/geometry/Point";
import { mirrorAngle, wrapTo360 } from "../../commons/Utils/Trigo";
import FixedLimbGroup from "./LimbGroup/FixedLimbGroup";
import TargetZone from "./TargetZone";
import {
  CENTERED_AND_SCALED_TARGET_PATH_LENGTH,
  TARGET_PATH_RADIUS
} from "./utils";

interface Props {
  startPosition: Point2;
  endPosition: Point2;
  scaledDown?: boolean;
  targetZoneAngle: number;
  targetZoneTolerance: number;
  isInTargetZone: boolean;
  sensorAngle: number;
  shouldMirrorExercise?: boolean;
  onIsInTargetZoneChange(val: boolean): void;
  transform?(angle: number): number;
}

const canvasSize = Dimensions.get("window").width;

export default memo(function OneHingeFlexView({
  startPosition,
  endPosition,
  targetZoneAngle,
  targetZoneTolerance,
  isInTargetZone,
  sensorAngle,
  scaledDown,
  onIsInTargetZoneChange,
  transform,
  shouldMirrorExercise
}: Props) {
  const transformValue = (value: number) =>
    transform ? transform(value) : value;

  const startAngle = shouldMirrorExercise
    ? wrapTo360(
        mirrorAngle(transformValue(targetZoneAngle - targetZoneTolerance))
      )
    : wrapTo360(transformValue(targetZoneAngle - targetZoneTolerance));

  const endAngle = shouldMirrorExercise
    ? wrapTo360(
        mirrorAngle(transformValue(targetZoneAngle + targetZoneTolerance))
      )
    : wrapTo360(transformValue(targetZoneAngle + targetZoneTolerance));

  const radius = scaledDown
    ? CENTERED_AND_SCALED_TARGET_PATH_LENGTH
    : TARGET_PATH_RADIUS;

  const newIsInTargetZone = calculateIsInTargetZone(
    startAngle,
    endAngle,
    sensorAngle
  );
  useEffect(() => {
    if (newIsInTargetZone !== isInTargetZone) {
      onIsInTargetZoneChange(newIsInTargetZone);
    }
  }, [newIsInTargetZone, isInTargetZone, onIsInTargetZoneChange]);

  return (
    <Svg width={canvasSize} height={canvasSize} viewBox={"0 0 1600 1600"}>
      <TargetZone
        centerArc={startPosition}
        radius={radius}
        startAngle={startAngle}
        endAngle={endAngle}
        isInTargetZone={isInTargetZone}
      />
      <FixedLimbGroup
        limbId="fixedLimb"
        fixedHingePosition={startPosition}
        endPosition={endPosition}
        scaledDown={scaledDown}
      />
    </Svg>
  );
});

const calculateIsInTargetZone = (
  startAngle: number,
  endAngle: number,
  angle: number
) => {
  if (endAngle < startAngle) {
    return endAngle <= angle && angle <= startAngle;
  }
  return startAngle <= angle && angle <= endAngle;
};
