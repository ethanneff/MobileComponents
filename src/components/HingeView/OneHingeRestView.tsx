import React, { memo, useEffect } from "react";
import { Dimensions } from "react-native";
import Svg from "react-native-svg";
import { Point2 } from "../../commons/Utils/Maths/geometry/Point";
import FixedLimbGroup from "./LimbGroup/FixedLimbGroup";
import RestLimbGroup from "./LimbGroup/RestLimbGroup";
import { angleVectors } from "./utils";

interface Props {
  startPosition: Point2;
  endPosition: Point2;
  restAngle: number;
  sensorAngle: number;
  scaledDown?: boolean;
  isInRestPosition(val: boolean): void;
}

const canvasSize = Dimensions.get("window").width;

export default memo(function OneHingeRestView({
  startPosition,
  restAngle,
  sensorAngle,
  endPosition,
  scaledDown,
  isInRestPosition
}: Props) {
  const restEnd = angleVectors(restAngle, startPosition, scaledDown);

  const isRestPosition =
    sensorAngle >= restAngle - 10 && sensorAngle <= restAngle + 10;

  useEffect(() => {
    isInRestPosition(isRestPosition);
  }, [isInRestPosition, isRestPosition]);
  return (
    <Svg width={canvasSize} height={canvasSize} viewBox={"0 0 1600 1600"}>
      <RestLimbGroup
        limbId="restPosition"
        startPosition={startPosition}
        endPosition={restEnd}
        scaledDown={scaledDown}
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
