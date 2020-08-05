import { LayoutChangeEvent } from "react-native";
import sliderUtils, { TouchEvent } from "../sliderUtils";

describe("sliderUtils functions", () => {
  afterEach(() => {
    // Reset the container width so we can predict the value for updateValueOnTap.
    const containerWidthEvent = {
      nativeEvent: {
        layout: {
          width: 750
        }
      }
    } as LayoutChangeEvent;
    sliderUtils.setContainerWidth(containerWidthEvent);
  });

  it("updates containerWidth", () => {
    expect(sliderUtils.getContainerWidth()).toEqual(750);
    const event = {
      nativeEvent: {
        layout: {
          width: 200
        }
      }
    } as LayoutChangeEvent;

    sliderUtils.setContainerWidth(event);
    expect(sliderUtils.getContainerWidth()).toEqual(200);
  });

  it("does NOT call callback if no native event", () => {
    const callback = jest.fn();
    const event = {} as TouchEvent;
    sliderUtils.updateValueOnTap(0, 100, callback)(event);
    expect(callback).not.toBeCalled();
  });

  it("calls callback when event contains nativeEvent", () => {
    const callback = jest.fn();
    const tapEvent = {
      nativeEvent: {
        locationX: 200
      }
    } as TouchEvent;
    sliderUtils.updateValueOnTap(0, 100, callback)(tapEvent);
    expect(callback).toBeCalledWith(26);
  });

  it("calls callback with max threshold", () => {
    const callback = jest.fn();
    const event = {
      nativeEvent: {
        locationX: 1000
      }
    } as TouchEvent;
    sliderUtils.updateValueOnTap(0, 100, callback)(event);
    expect(callback).toBeCalledWith(100);
  });

  it("calls callback with min threshold", () => {
    const callback = jest.fn();
    const event = {
      nativeEvent: {
        locationX: -1000
      }
    } as TouchEvent;
    sliderUtils.updateValueOnTap(0, 100, callback)(event);
    expect(callback).toBeCalledWith(0);
  });

  it("calls callback with correct value when min slider value is < 0", () => {
    const callback = jest.fn();
    const event = {
      nativeEvent: {
        locationX: 200
      }
    } as TouchEvent;
    sliderUtils.updateValueOnTap(-90, 90, callback)(event);
    expect(callback).toBeCalledWith(-42);
  });
});
