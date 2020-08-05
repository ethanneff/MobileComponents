import React from "react";
import { G } from "react-native-svg";
import Victor from "victor";
import Theme from "../../../commons/Theme";
import Hinge from "../Hinge";
import Limb from "../Limb";

interface FreeLimbGroupProps {
  startPosition: Victor;
  endPosition: Victor;
  limbId?: string;
  hingeId?: string;
}

const styles = {
  freeLimb: {
    strokeColor: Theme.color.neutral300,
    strokeWidth: 27
  },
  freeHinge: {
    fillColor: Theme.color.neutral0,
    strokeColor: Theme.color.neutral300,
    radius: 22,
    strokeWidth: 12
  }
};

/*
Consists of one limb, with one free hinge (no fill) hinge at the end
*/

export default function FreeLimbGroup({
  startPosition,
  endPosition,
  limbId,
  hingeId
}: FreeLimbGroupProps) {
  return (
    <G>
      <Limb
        id={limbId}
        point1={startPosition}
        point2={endPosition}
        strokeColor={styles.freeLimb.strokeColor}
        strokeWidth={styles.freeLimb.strokeWidth}
      />
      <Hinge
        id={hingeId}
        position={endPosition}
        radius={styles.freeHinge.radius}
        strokeColor={styles.freeHinge.strokeColor}
        strokeWidth={styles.freeHinge.strokeWidth}
        fillColor={styles.freeHinge.fillColor}
      />
    </G>
  );
}
