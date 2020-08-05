import {
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  NativeTouchEvent
} from "react-native";

export interface TouchEvent extends GestureResponderEvent {
  nativeEvent: NativeTouchEvent;
}

let containerWidth: number = Dimensions.get("window").width;

const sliderUtils = {
  getContainerWidth: () => containerWidth,
  setContainerWidth: (event: LayoutChangeEvent) =>
    (containerWidth = event.nativeEvent.layout.width),
  updateValueOnTap: (
    minimumValue: number,
    maximumValue: number,
    onChangeValue: (value: number) => void
  ) => (event: TouchEvent) => {
    if (!event.nativeEvent) {
      return;
    }
    const absRangeMax =
      maximumValue + (minimumValue < 0 ? Math.abs(minimumValue) : 0);
    let calculatedValue =
      minimumValue +
      Math.floor((event.nativeEvent.locationX / containerWidth) * absRangeMax);
    calculatedValue =
      calculatedValue > maximumValue ? maximumValue : calculatedValue;
    calculatedValue =
      calculatedValue < minimumValue ? minimumValue : calculatedValue;
    onChangeValue(calculatedValue);
  }
};

export default sliderUtils;
