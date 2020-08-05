import { render } from "@testing-library/react-native";
import React from "react";
import { ReactTestInstance, create } from "react-test-renderer";
import { describeArc } from "../../../commons/Utils/SvgUtils";
import { mirrorAngle } from "../../../commons/Utils/Trigo";
import { HingeGridPositionPoints } from "../HingeGrid";
import OneHingeFlexView from "../OneHingeFlexView";
import { TARGET_PATH_RADIUS, angleVectors } from "../utils";

jest.mock("../../../commons/Store/selectors");

const onIsInTargetZoneChange = jest.fn();
const targetZoneAngle = 45;
const TargetZoneTolerance = 15;
const startPosition = HingeGridPositionPoints.centerLeft;
const endPosition = angleVectors(45, HingeGridPositionPoints.centerLeft, false);
const sensorAngle = 45;

const element = (
  inTargetZone: boolean,
  targetZoneChange: jest.Mock<unknown>,
  mirror?: boolean
) => {
  return (
    <OneHingeFlexView
      startPosition={startPosition}
      endPosition={endPosition}
      targetZoneAngle={targetZoneAngle}
      targetZoneTolerance={TargetZoneTolerance}
      isInTargetZone={inTargetZone}
      sensorAngle={sensorAngle}
      onIsInTargetZoneChange={targetZoneChange}
      shouldMirrorExercise={mirror}
    />
  );
};

describe("OneHingeFlexView", () => {
  describe(".onIsInTargetZoneChange", () => {
    it("is not called when isInTargetZone is true", () => {
      render(element(true, onIsInTargetZoneChange));
      expect(onIsInTargetZoneChange).toHaveBeenCalledTimes(0);
    });

    it("is called when isInTargetZone is false", () => {
      render(element(false, onIsInTargetZoneChange));
      expect(onIsInTargetZoneChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("shouldMirrorExercisee", () => {
    let rightTargetZone: ReactTestInstance;
    let leftTargetZone: ReactTestInstance;
    const svgPath = (el: ReactTestInstance) =>
      el.findByProps({ id: "targetZone" }).props.d;

    beforeAll(() => {
      rightTargetZone = create(element(false, onIsInTargetZoneChange, false))
        .root;
      leftTargetZone = create(element(false, onIsInTargetZoneChange, true))
        .root;
    });
    describe("true", () => {
      it("mirrors the target zone", () => {
        expect(svgPath(leftTargetZone)).toBe(
          describeArc(
            startPosition.x,
            startPosition.y,
            TARGET_PATH_RADIUS,
            mirrorAngle(targetZoneAngle - TargetZoneTolerance),
            mirrorAngle(targetZoneAngle + TargetZoneTolerance)
          )
        );
      });
    });
    describe("false", () => {
      it("does not mirror the target zone", () => {
        expect(svgPath(rightTargetZone)).toBe(
          describeArc(
            startPosition.x,
            startPosition.y,
            TARGET_PATH_RADIUS,
            targetZoneAngle - TargetZoneTolerance,
            targetZoneAngle + TargetZoneTolerance
          )
        );
      });
    });
  });
});
