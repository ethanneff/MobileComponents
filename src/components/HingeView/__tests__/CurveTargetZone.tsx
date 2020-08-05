import { render } from "@testing-library/react-native";
import React from "react";
import {
  calculateControlPoints,
  getMidPointPosition
} from "../../CurveLineView/utils";
import CurveTargetZone from "../CurveTargetZone";
import { HingeGridPositionPoints } from "../HingeGrid";

describe("CurveTargetZone", () => {
  it("renders correctly", () => {
    const startPosition = HingeGridPositionPoints.centerLeft;
    const endPosition = HingeGridPositionPoints.centerRight;
    const midPointPosition = getMidPointPosition(startPosition, endPosition);
    const targetZoneAngle = 15;
    const sensorAngle = 30;
    const tolerance = 20;

    const vectorPoints = calculateControlPoints(
      startPosition,
      midPointPosition,
      targetZoneAngle,
      sensorAngle,
      tolerance
    );
    const { container } = render(
      <CurveTargetZone
        isInTargetZone={false}
        startHingePosition={startPosition}
        endHingePosition={endPosition}
        controlPointOuter={vectorPoints.controlPointOuter}
        controlPointInner={vectorPoints.controlPointInner}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
