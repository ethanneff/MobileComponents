import React, { memo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Circle } from "react-native-progress";
import Theme from "../../commons/Theme";
import { getDeviceSize } from "../../commons/Utils/DeviceInfo";
interface Props {
  hidden?: boolean;
  style?: ViewStyle | {};
  border?: number;
  percent: number;
  lineColor?: string;
  borderColor?: string;
  notAnimated?: boolean;
  backgroundColor?: string;
}

export default memo(function Countdown({
  hidden,
  style,
  border = 2,
  notAnimated,
  percent,
  borderColor = Theme.color.neutral0,
  lineColor = Theme.color.success,
  backgroundColor = Theme.color.neutral0
}: Props) {
  const isSmallDevice = getDeviceSize() === "small";
  const thickness = isSmallDevice ? Theme.padding.p2 : Theme.padding.p3 - 2;
  const size = isSmallDevice ? Theme.padding.p26 : Theme.padding.p40;

  const styles = StyleSheet.create({
    circle: { alignSelf: "center" }
  });

  return hidden ? null : (
    <Circle
      style={[styles.circle, style]}
      color={backgroundColor}
      animated={!notAnimated}
      borderWidth={border}
      borderColor={borderColor}
      thickness={thickness}
      unfilledColor={lineColor}
      size={size}
      progress={percent}
    />
  );
});
