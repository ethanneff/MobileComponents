import React, { memo } from "react";
import { Circle, G, Path } from "react-native-svg";
import Theme from "../../commons/Theme";
import { polarToCartesian, wrapTo360 } from "../../commons/Utils/Trigo";

interface MacroArcProps {
  startAngle: number | undefined;
  endAngle: number | undefined;
  centerX: number | undefined;
  centerY: number | undefined;
  limbLength: number | undefined;
  scaledDown?: boolean;
}

const styles = (scaledDown?: boolean) => ({
  arc: {
    strokeColor: Theme.color.neutral50,
    strokeWidth: 40,
    radius: scaledDown ? 20 : 24
  }
});

export default memo(function MacroArc({
  startAngle,
  endAngle,
  centerX,
  centerY,
  limbLength,
  scaledDown
}: MacroArcProps) {
  if (
    startAngle === undefined ||
    endAngle === undefined ||
    centerX === undefined ||
    centerY === undefined ||
    limbLength === undefined
  ) {
    return null;
  }
  const arc = styles(scaledDown).arc;
  const arcRadius = limbLength * 2 - arc.strokeWidth / 2;

  const { arcCoordinates, arcEnd } = describeMacroArc(
    centerX,
    centerY,
    arcRadius,
    startAngle,
    endAngle
  );

  const arcEndCircleProps = {
    r: arc.strokeWidth / 2,
    stroke: arc.strokeColor,
    strokeWidth: 4,
    fill: arc.strokeColor,
    opacity: 1
  };
  return (
    <G>
      <Path
        strokeWidth={arc.strokeWidth}
        d={arcCoordinates}
        fill={"none"}
        stroke={arc.strokeColor}
      />
      <Circle
        id={"macro-arc-end"}
        cx={arcEnd.x}
        cy={arcEnd.y}
        {...arcEndCircleProps}
      />
    </G>
  );
});

function describeMacroArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = wrapTo360(startAngle);
  const end = wrapTo360(endAngle);

  const arcStart = polarToCartesian(x, y, radius, end);
  const arcEnd = polarToCartesian(x, y, radius, start);

  const largeArcFlag = "0";
  const sweepFlag = end - start < 180 ? "0" : "1";

  const arcCoordinates = [
    "M",
    arcStart.x,
    arcStart.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    sweepFlag,
    arcEnd.x,
    arcEnd.y
  ].join(" ");

  return { arcCoordinates, arcStart, arcEnd };
}
