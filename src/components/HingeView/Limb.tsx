import React from "react";
import { Line } from "react-native-svg";
import { useBoneMode } from "../../commons/Hooks/useBoneMode";
import { Point2 } from "../../commons/Utils/Maths/geometry/Point";
import Bone from "./Bone";

export interface LimbProps {
  strokeWidth?: number;
  strokeColor: string;
  point1: Point2;
  point2: Point2;
  id?: string;
}

export default function Limb({
  strokeWidth,
  strokeColor,
  point1: vector1,
  point2: vector2,
  id
}: LimbProps) {
  const boneMode = useBoneMode();
  if (boneMode) {
    return (
      <Bone
        strokeColor={strokeColor}
        point1={vector1}
        point2={vector2}
        id={id}
      />
    );
  }
  return (
    <Line
      id={id}
      x1={vector1.x}
      y1={vector1.y}
      x2={vector2.x}
      y2={vector2.y}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
    />
  );
}
