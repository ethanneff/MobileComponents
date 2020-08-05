import { render } from "@testing-library/react-native";
import React from "react";
import { getMidPointPosition } from "../../../CurveLineView/utils";
import { HingeGridPositionPoints } from "../../HingeGrid";
import CurveLimbGroup from "../CurveLimbGroup";

jest.mock("../../../../commons/Store/selectors", () => {
  return {
    useRootSelector: () => jest.fn()
  };
});

describe("CurveLimbGroup", () => {
  it("renders correctly", () => {
    const startPosition = HingeGridPositionPoints.centerLeft;
    const endPosition = HingeGridPositionPoints.centerRight;
    const midPoint = getMidPointPosition(startPosition, endPosition);
    const { container } = render(
      <CurveLimbGroup
        startHingePosition={startPosition}
        endHingePosition={endPosition}
        controlPoint={midPoint}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly with scaledDown prop", () => {
    const startPosition = HingeGridPositionPoints.centerLeft;
    const endPosition = HingeGridPositionPoints.centerRight;
    const midPoint = getMidPointPosition(startPosition, endPosition);
    const { container } = render(
      <CurveLimbGroup
        startHingePosition={startPosition}
        endHingePosition={endPosition}
        controlPoint={midPoint}
        scaledDown
      />
    );
    expect(container).toMatchSnapshot();
  });
});
