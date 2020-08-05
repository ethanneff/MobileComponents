import { render } from "@testing-library/react-native";
import React from "react";
import { HingeGridPositionPoints } from "../HingeGrid";
import OneHingeRestView from "../OneHingeRestView";
import { angleVectors } from "../utils";

jest.mock("../../../commons/Store/selectors");

const element = (sensor: number, fn: jest.Mock<unknown>) => {
  return (
    <OneHingeRestView
      startPosition={HingeGridPositionPoints.centerLeft}
      endPosition={angleVectors(-45, HingeGridPositionPoints.centerLeft, false)}
      restAngle={-45}
      sensorAngle={sensor}
      isInRestPosition={fn}
    />
  );
};

describe(".isInRestPosition", () => {
  it("calls isInRestPosition with true when the sensor angle overlaps the rest angle", () => {
    const isInRestPosition = jest.fn();
    render(element(-45, isInRestPosition));
    expect(isInRestPosition).toHaveBeenCalledWith(true);
  });

  it("calls isInRestPosition with false when the sensor angle does not overlap the rest angle", () => {
    const isInRestPosition = jest.fn();
    render(element(10, isInRestPosition));
    expect(isInRestPosition).toHaveBeenCalledWith(false);
  });
});
