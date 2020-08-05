import React from "react";
import { G } from "react-native-svg";
import Theme from "../../../commons/Theme";
import { Point2 } from "../../../commons/Utils/Maths/geometry/Point";
import { describeBezier } from "../../../commons/Utils/SvgUtils";
import Curve from "../Curve";
import Hinge from "../Hinge";

interface CurveLimbGroupProps {
  startHingePosition: Point2;
  endHingePosition: Point2;
  controlPoint: Point2;
  startHingeId?: string;
  endHingeId?: string;
  scaledDown?: boolean;
}

const styles = (scaledDown?: boolean) => ({
  fixedHinge: {
    fillColor: Theme.color.neutral300,
    strokeColor: Theme.color.neutral300,
    radius: scaledDown ? 16 : 22,
    strokeWidth: 12
  },
  fixedLimb: {
    strokeColor: Theme.color.neutral300,
    strokeWidth: scaledDown ? 18 : 27
  }
});

export default function CurveLimbGroup({
  startHingePosition,
  endHingePosition,
  controlPoint,
  startHingeId,
  endHingeId,
  scaledDown
}: CurveLimbGroupProps) {
  const curveData = describeBezier(
    startHingePosition,
    controlPoint,
    endHingePosition
  );
  return (
    <G>
      <Curve curveData={curveData} />
      <Hinge
        id={startHingeId}
        position={startHingePosition}
        radius={styles(scaledDown).fixedHinge.radius}
        strokeColor={styles(scaledDown).fixedHinge.strokeColor}
        strokeWidth={styles(scaledDown).fixedHinge.strokeWidth}
        fillColor={styles(scaledDown).fixedHinge.fillColor}
      />
      <Hinge
        id={endHingeId}
        position={endHingePosition}
        radius={styles(scaledDown).fixedHinge.radius}
        strokeColor={styles(scaledDown).fixedHinge.strokeColor}
        strokeWidth={styles(scaledDown).fixedHinge.strokeWidth}
        fillColor={styles(scaledDown).fixedHinge.fillColor}
      />
    </G>
  );
}
