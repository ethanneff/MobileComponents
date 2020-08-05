import React from "react";
import { G } from "react-native-svg";
import Theme from "../../../commons/Theme";
import { Point2 } from "../../../commons/Utils/Maths/geometry/Point";
import Hinge from "../Hinge";
import Limb from "../Limb";

interface FixedLimbGroupProps {
  fixedHingePosition: Point2;
  fixedHingeId?: string;
  endPosition: Point2;
  freeHingeId?: string;
  limbId?: string;
  scaledDown?: boolean;
}

const styles = (scaledDown?: boolean) => ({
  fixedHinge: {
    fillColor: Theme.color.neutral300,
    strokeColor: Theme.color.neutral300,
    radius: scaledDown ? 16 : 22,
    strokeWidth: 12
  },
  freeHinge: {
    fillColor: Theme.color.neutral0,
    strokeColor: Theme.color.neutral300,
    radius: scaledDown ? 16 : 22,
    strokeWidth: 12
  },
  fixedLimb: {
    strokeColor: Theme.color.neutral300,
    strokeWidth: scaledDown ? 18 : 27
  }
});

/*
Consists of one limb, with one hinge at *each* end
One is a fixed hinge (fill), the other is a free hinge (no fill)
*/

export default function FixedLimbGroup({
  fixedHingePosition,
  endPosition,
  limbId,
  fixedHingeId,
  freeHingeId,
  scaledDown
}: FixedLimbGroupProps) {
  return (
    <G>
      <Limb
        id={limbId}
        point1={fixedHingePosition}
        point2={endPosition}
        strokeColor={styles(scaledDown).fixedLimb.strokeColor}
        strokeWidth={styles(scaledDown).fixedLimb.strokeWidth}
      />
      <Hinge
        id={fixedHingeId}
        position={fixedHingePosition}
        radius={styles(scaledDown).fixedHinge.radius}
        strokeColor={styles(scaledDown).fixedHinge.strokeColor}
        strokeWidth={styles(scaledDown).fixedHinge.strokeWidth}
        fillColor={styles(scaledDown).fixedHinge.fillColor}
      />
      <Hinge
        id={freeHingeId}
        position={endPosition}
        radius={styles(scaledDown).fixedHinge.radius}
        strokeColor={styles(scaledDown).freeHinge.strokeColor}
        strokeWidth={styles(scaledDown).freeHinge.strokeWidth}
        fillColor={styles(scaledDown).freeHinge.fillColor}
      />
    </G>
  );
}
