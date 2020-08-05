import { HingeGridPositionPoints } from "../../HingeView/HingeGrid";
import { calculateControlPoints, getMidPointPosition } from "../utils";

const startPosition = HingeGridPositionPoints.centerLeft;
const endPosition = HingeGridPositionPoints.centerRight;
const midPoint = getMidPointPosition(startPosition, endPosition);
const controlPoints = calculateControlPoints(
  startPosition,
  midPoint,
  30,
  30,
  20
);

describe("getControlPointPosition", () => {
  it("returns the correct coordinates for the center of the Curve View Line", () => {
    expect(midPoint.x).toBe((startPosition.x + endPosition.x) / 2);
    expect(midPoint.y).toBe((startPosition.y + endPosition.y) / 2);
  });
});

describe("calculateControlPoints", () => {
  it("returns the correct control points for controlPointOuter", () => {
    expect(controlPoints.controlPointOuter.x).toEqual(
      controlPoints.controlPointInner.x
    );
    expect(controlPoints.controlPointOuter.y).toBeGreaterThan(
      controlPoints.controlPointInner.y
    );
  });

  it("returns the correct control points for controlPointInner", () => {
    expect(controlPoints.controlPointInner.x).toEqual(
      controlPoints.controlPointOuter.x
    );
    expect(controlPoints.controlPointInner.y).toBeLessThan(
      controlPoints.controlPointOuter.y
    );
  });

  it("returns the correct control points for controlPointLine", () => {
    expect(controlPoints.controlPointLine.x).toEqual(
      controlPoints.controlPointOuter.x
    );
    expect(controlPoints.controlPointLine.x).toEqual(
      controlPoints.controlPointInner.x
    );
    expect(controlPoints.controlPointLine.y).toBeGreaterThan(
      controlPoints.controlPointInner.y
    );

    expect(controlPoints.controlPointLine.y).toBeLessThan(
      controlPoints.controlPointOuter.y
    );
  });
});
