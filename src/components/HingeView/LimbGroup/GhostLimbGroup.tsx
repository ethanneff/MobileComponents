import React from "react";
import { Circle, ClipPath, Defs, G, Rect } from "react-native-svg";
import Victor from "victor";
import Theme from "../../../commons/Theme";
import { radiansToDegrees } from "../../../commons/Utils/Trigo";
import Hinge from "../Hinge";

interface GhostLimbGroupProps {
  startPosition: Victor;
  endPosition: Victor;
  scaledDown?: boolean;
  opacity?: number;
}

const styles = (scaledDown?: boolean) => ({
  ghostLimb: {
    strokeColor: Theme.color.primary200,
    strokeWidth: scaledDown ? 19 : 27
  },
  ghostHinge: {
    fillColor: Theme.color.primary200,
    strokeColor: Theme.color.primary200,
    radius: scaledDown ? 20 : 24
  }
});

export default function GhostLimbGroup({
  startPosition,
  endPosition,
  scaledDown,
  opacity
}: GhostLimbGroupProps) {
  const deltaX = endPosition.x - startPosition.x;
  const deltaY = endPosition.y - startPosition.y;
  const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const radians = Math.atan2(deltaY, deltaX);
  const limbWidth = styles(scaledDown).ghostLimb.strokeWidth;
  const yOffset = limbWidth / 2;
  return (
    <>
      <Defs>
        <ClipPath id="clip">
          <G x={startPosition.x} y={startPosition.y}>
            <Rect
              y={-yOffset}
              width={length}
              height={limbWidth}
              fill={styles(scaledDown).ghostLimb.strokeColor}
              transform={`rotate(${radiansToDegrees(radians)})`}
            />
          </G>
          <Hinge
            position={endPosition}
            radius={styles(scaledDown).ghostHinge.radius}
            strokeColor={styles(scaledDown).ghostHinge.strokeColor}
            fillColor={styles(scaledDown).ghostHinge.fillColor}
          />
        </ClipPath>
      </Defs>
      <Circle
        cx={startPosition.x}
        cy={startPosition.y}
        opacity={opacity}
        r={length + styles(scaledDown).ghostHinge.radius}
        fill={styles(scaledDown).ghostLimb.strokeColor}
        clipPath="url(#clip)"
      />
    </>
  );
}
