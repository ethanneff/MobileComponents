import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import SliderJS from "react-native-slider";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import Text from "../Text";
import sliderUtils from "./sliderUtils";

interface Props {
  testID?: string;
  previousValue?: number;
  value: number;
  valuePercent?: boolean;
  valueHidden?: boolean;
  step?: number;
  minValue?: number;
  maxValue?: number;
  minValueText?: string;
  maxValueText?: string;
  hidden?: boolean;
  invisible?: boolean;
  onChange(value: number): void;
  onComplete?(value: number): void;
}

export default memo(function Slider({
  testID = "slider",
  onChange,
  onComplete,
  value,
  step = 1,
  minValue = 0,
  maxValue = 100,
  previousValue,
  minValueText,
  maxValueText,
  hidden,
  valueHidden,
  valuePercent,
  invisible
}: Props) {
  const color = Theme.color.primary200;
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    details: {
      justifyContent: "space-between",
      flexDirection: "row",
      paddingTop: Theme.padding.p4
    },
    visibleValue: {
      paddingBottom: Theme.padding.p6
    },
    previous: {
      paddingVertical: Theme.padding.p2
    },
    invisible: {
      opacity: 0
    },
    hidden: {
      opacity: 0
    },
    thumb: {
      width: Theme.padding.p7,
      height: Theme.padding.p7,
      borderRadius: Theme.padding.p7 / 2,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 2,
      shadowOpacity: 0.25
    },
    track: {
      height: 3,
      borderRadius: 1,
      backgroundColor: Theme.color.neutral100
    }
  });
  const displayValue = `${value}${valuePercent ? "%" : ""}`;
  const displayPreviousValue = strings("slider.previousValue", {
    previousValue
  });
  const containerStyles = [invisible ? styles.invisible : undefined];
  const detailStyles = [
    styles.details,
    !minValueText && !maxValueText ? styles.hidden : undefined
  ];

  const shouldTapToSlide = (): boolean => true;

  return hidden ? null : (
    <View style={containerStyles}>
      <Text
        hidden={!previousValue}
        title={displayPreviousValue}
        caption
        style={styles.previous}
      />
      <Text
        title={displayValue}
        h3
        style={styles.visibleValue}
        hidden={valueHidden}
      />
      <View
        onStartShouldSetResponder={shouldTapToSlide}
        onLayout={sliderUtils.setContainerWidth}
        onResponderRelease={sliderUtils.updateValueOnTap(
          minValue,
          maxValue,
          onChange
        )}
      >
        <SliderJS
          testID={`${testID}-newSlider`}
          step={step}
          minimumValue={minValue}
          maximumValue={maxValue}
          onValueChange={onChange}
          onSlidingComplete={onComplete}
          value={value}
          thumbTintColor={color}
          minimumTrackTintColor={color}
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
        />
      </View>
      <View style={detailStyles}>
        <Text hidden={!minValueText} title={minValueText} />
        <Text hidden={!maxValueText} title={maxValueText} />
      </View>
    </View>
  );
});
