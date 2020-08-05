import { render } from "@testing-library/react-native";
import React from "react";
import CurveLineView from "..";
import { HingeGridPositionPoints } from "../../HingeView/HingeGrid";

jest.mock("../../../commons/Store/selectors", () => {
  return {
    useRootSelector: () => jest.fn()
  };
});

const element = (
  tolerance: number,
  targetZoneAngle: number,
  sensorValue: number,
  fn: jest.Mock<unknown>,
  isInTargetZone: boolean = true
) => (
  <CurveLineView
    canvasSize={500}
    tolerance={tolerance}
    sensorAngle={sensorValue}
    targetZoneAngle={targetZoneAngle}
    startPosition={HingeGridPositionPoints.centerLeft}
    endPosition={HingeGridPositionPoints.centerRight}
    isInTargetZone={isInTargetZone}
    onIsInTargetZoneChange={fn}
  />
);

describe("CurveLineView", () => {
  describe(".onIsInTargetZoneChange()", () => {
    describe("when .isInTargetZone = true", () => {
      it("is called when the calculated isInTargetZone is false", () => {
        const onIsInTargetZoneChange = jest.fn();
        render(element(20, 30, 5, onIsInTargetZoneChange));
        expect(onIsInTargetZoneChange).toHaveBeenCalledTimes(1);
      });
      it("is not called when the calculated isInTargetZone is true", () => {
        const onIsInTargetZoneChange = jest.fn();
        render(element(20, 30, 20, onIsInTargetZoneChange));
        expect(onIsInTargetZoneChange).toHaveBeenCalledTimes(0);
      });
    });

    describe("when .isInTargetZone = false", () => {
      it("is not called when the calculated isInTargetZone is false", () => {
        const onIsInTargetZoneChange = jest.fn();
        render(element(20, 30, 5, onIsInTargetZoneChange, false));
        expect(onIsInTargetZoneChange).toHaveBeenCalledTimes(0);
      });
      it("is called when the calculated isInTargetZone is true", () => {
        const onIsInTargetZoneChange = jest.fn();
        render(element(20, 30, 20, onIsInTargetZoneChange, false));
        expect(onIsInTargetZoneChange).toHaveBeenCalledTimes(1);
      });
    });
  });
});
