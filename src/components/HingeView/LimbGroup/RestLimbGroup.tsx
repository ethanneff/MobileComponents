import React from "react";
import { G } from "react-native-svg";
import Theme from "../../../commons/Theme";
import { Point2 } from "../../../commons/Utils/Maths/geometry/Point";
import Hinge from "../Hinge";
import Limb from "../Limb";

interface RestLimbGroupProps {
  startPosition: Point2;
  endPosition: Point2;
  limbId?: string;
  hingeId?: string;
  scaledDown?: boolean;
}

const styles = (scaledDown?: boolean) => ({
  restLimb: {
    strokeColor: Theme.color.neutral50,
    strokeWidth: scaledDown ? 19 : 27
  },
  restHinge: {
    fillColor: Theme.color.neutral50,
    strokeColor: Theme.color.neutral50,
    radius: scaledDown ? 16 : 20
  }
});

/*
Consists of one limb, with one one hinge at the end
Rest position in UI
*/

export default function RestLimbGroup({
  startPosition,
  endPosition,
  limbId,
  hingeId,
  scaledDown
}: RestLimbGroupProps) {
  return (
    <G>
      <Limb
        id={limbId}
        point1={startPosition}
        point2={endPosition}
        strokeColor={styles(scaledDown).restLimb.strokeColor}
        strokeWidth={styles(scaledDown).restLimb.strokeWidth}
      />
      <Hinge
        id={hingeId}
        position={endPosition}
        radius={styles(scaledDown).restHinge.radius}
        strokeColor={styles(scaledDown).restHinge.strokeColor}
        fillColor={styles(scaledDown).restHinge.fillColor}
      />
    </G>
  );
}
