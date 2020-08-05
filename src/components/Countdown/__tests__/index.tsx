import { getNodeText, render } from "@testing-library/react-native";
import React from "react";
import Component from "..";
import * as DeviceInfo from "../../../commons/Utils/DeviceInfo";

const getDeviceSizeSpy = jest.spyOn(DeviceInfo, "getDeviceSize");

describe("Clock Component", () => {
  afterEach(() => getDeviceSizeSpy.mockClear());
  it("renders with defaults", () => {
    const { getByTestId } = render(<Component percent={0.2} />);
    const expectedProps = {
      style: [{ alignSelf: "center" }, null],
      color: "hsl(255, 100%, 100%)",
      animated: true,
      borderWidth: 2,
      borderColor: "hsl(255, 100%, 100%)",
      thickness: 10,
      unfilledColor: "hsl(84, 67%, 75%)",
      size: 160,
      progress: 0.2
    };

    expect(getByTestId("mockProgressCircle")).toBeTruthy();
    const props = JSON.parse(
      getNodeText(getByTestId("mockProgressCircleProps"))
    );
    expect(props).toMatchObject(expectedProps);
  });

  it("renders with defaults on small devices", () => {
    getDeviceSizeSpy.mockReturnValue("small");
    const { getByTestId } = render(<Component percent={0.2} />);
    const expectedProps = {
      style: [{ alignSelf: "center" }, null],
      color: "hsl(255, 100%, 100%)",
      animated: true,
      borderWidth: 2,
      borderColor: "hsl(255, 100%, 100%)",
      thickness: 8,
      unfilledColor: "hsl(84, 67%, 75%)",
      size: 104,
      progress: 0.2
    };
    expect(getByTestId("mockProgressCircle")).toBeTruthy();
    const props = JSON.parse(
      getNodeText(getByTestId("mockProgressCircleProps"))
    );
    expect(props).toMatchObject(expectedProps);
  });

  it("does not render when hidden", () => {
    const { queryByTestId } = render(<Component percent={0.2} hidden />);
    expect(queryByTestId("mockProgressCircle")).toBeNull();
  });

  it("renders without defaults", () => {
    getDeviceSizeSpy.mockReturnValue("tablet");
    const { getByTestId } = render(
      <Component
        style={{ flex: 1 }}
        border={2}
        borderColor="green"
        percent={0.4}
        notAnimated
        lineColor="blue"
        backgroundColor="pink"
      />
    );
    const expectedProps = {
      style: [{ alignSelf: "center" }, { flex: 1 }],
      color: "pink",
      animated: false,
      borderWidth: 2,
      borderColor: "green",
      thickness: 10,
      unfilledColor: "blue",
      size: 160,
      progress: 0.4
    };
    expect(getByTestId("mockProgressCircle")).toBeTruthy();
    const props = JSON.parse(
      getNodeText(getByTestId("mockProgressCircleProps"))
    );
    expect(props).toMatchObject(expectedProps);
  });
});
