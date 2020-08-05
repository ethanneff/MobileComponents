import React from "react";
import { Circle } from "react-native-svg";
import { useBoneMode } from "../../commons/Hooks/useBoneMode";
import { Point2 } from "../../commons/Utils/Maths/geometry/Point";

interface HingeProps {
  position: Point2;
  id?: string;
  strokeColor: string;
  strokeWidth?: number;
  fillColor: string;
  radius: number;
}

export default function Hinge({
  strokeWidth,
  strokeColor,
  fillColor,
  radius,
  position,
  id
}: HingeProps) {
  const boneMode = useBoneMode();
  if (boneMode) {
    return null;
  }
  return (
    <Circle
      id={id}
      cx={position.x}
      cy={position.y}
      r={radius}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill={fillColor}
    />
  );
}
