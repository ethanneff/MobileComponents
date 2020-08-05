import { createPoint2 } from "../../commons/Utils/Maths/geometry/Point";

export const HingeGridPositionPoints = {
  centerLeft: createPoint2(550, 880),
  centerRight: createPoint2(1050, 880),
  centerMiddle: createPoint2(800, 880),
  topLeft: createPoint2(550, 690),
  topMiddle: createPoint2(800, 690),
  topRight: createPoint2(1050, 690),
  bottomMiddle: createPoint2(800, 1110),
  bottomRight: createPoint2(1050, 1110),
  bottomLeft: createPoint2(550, 1110)
};

export type HingeGridPosition = keyof typeof HingeGridPositionPoints;
