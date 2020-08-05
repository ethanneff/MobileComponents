import React, { memo } from "react";
import { Path } from "react-native-svg";
import Theme from "../../commons/Theme";
import { Point2 } from "../../commons/Utils/Maths/geometry/Point";
import { describeBezierTargetZone } from "../../commons/Utils/SvgUtils";

interface Props {
  isInTargetZone: boolean;
  startHingePosition: Point2;
  endHingePosition: Point2;
  controlPointOuter: Point2;
  controlPointInner: Point2;
}

export default memo(function CurveTargetZone({
  isInTargetZone,
  startHingePosition,
  endHingePosition,
  controlPointOuter,
  controlPointInner
}: Props) {
  const fillColor = isInTargetZone
    ? Theme.color.success
    : Theme.color.neutral50;

  const targetZoneCurve = describeBezierTargetZone(
    startHingePosition,
    controlPointOuter,
    controlPointInner,
    endHingePosition
  );

  return (
    <>
      <Path fill={fillColor} d={targetZoneCurve} />
    </>
  );
});
