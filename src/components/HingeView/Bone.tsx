import React from "react";
import { Circle, G, Rect } from "react-native-svg";
import { LimbProps } from "./Limb";

export default function Bone({
  strokeColor,
  point1: vector1,
  point2: vector2,
  id
}: LimbProps) {
  const deltaX = vector2.x - vector1.x;
  const deltaY = vector2.y - vector1.y;
  const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const rad = Math.atan2(deltaY, deltaX);
  const xOffset = 60;
  const yOffset = 23;
  const rNub = yOffset * 0.9; // radius of bone nubs
  const strokeWidth = 5;
  const fillcolor = "#F8FAF1";
  const width = yOffset * 1.85;
  return (
    <>
      <G
        id={id}
        x={vector1.x}
        y={vector1.y}
        transform={`rotate(${rad * (180 / Math.PI)})`}
      >
        {/* "stroke" group
          The only way to add a stroke to a complex shape is to create a slightly
          larger version of the same shape behind it, and fill it with the stroke color.
        */}
        <G fill={strokeColor}>
          <Circle cx={xOffset} cy={yOffset} r={rNub + strokeWidth} />
          <Circle cx={xOffset} cy={-yOffset} r={rNub + strokeWidth} />
          <Circle cx={length - xOffset} cy={yOffset} r={rNub + strokeWidth} />
          <Circle cx={length - xOffset} cy={-yOffset} r={rNub + strokeWidth} />
          <Rect
            y={-yOffset}
            x={xOffset}
            width={length - 2 * xOffset}
            height={width + strokeWidth}
          />
        </G>
        {/* fill group */}
        <G fill={fillcolor}>
          <Circle cx={xOffset} cy={yOffset} r={rNub} />
          <Circle cx={xOffset} cy={-yOffset} r={rNub} />
          <Circle cx={length - xOffset} cy={yOffset} r={rNub} />
          <Circle cx={length - xOffset} cy={-yOffset} r={rNub} />
          <Rect
            y={-yOffset + strokeWidth}
            x={xOffset}
            width={length - 2 * xOffset}
            height={width - strokeWidth}
          />
        </G>
      </G>
    </>
  );
}
