import React, { memo } from "react";
import { Path } from "react-native-svg";
import Theme from "../../commons/Theme";
import { Point2 } from "../../commons/Utils/Maths/geometry/Point";
import { describeArc } from "../../commons/Utils/SvgUtils";

const styles = {
  targetZone: {
    color: Theme.color.neutral50,
    inTarget: {
      color: Theme.color.success
    }
  }
};

export interface TargetZoneProps {
  centerArc: Point2;
  radius: number;
  startAngle: number;
  endAngle: number;
}

interface OwnProps {
  isInTargetZone: boolean;
}

type Props = TargetZoneProps & OwnProps;

export default memo(function TargetZone(props: Props) {
  const { centerArc, radius, startAngle, endAngle, isInTargetZone } = props;
  const targetPath = describeArc(
    centerArc.x,
    centerArc.y,
    radius,
    startAngle,
    endAngle
  );

  const fillColor = isInTargetZone
    ? styles.targetZone.inTarget.color
    : styles.targetZone.color;

  return <Path id="targetZone" fill={fillColor} d={targetPath} />;
});
