import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import { Circle } from "react-native-progress";
import Theme from "../../commons/Theme";
import Text from "../Text";

interface Props {
  testID?: string;
  height?: number;
  title: string;
  subtitle?: string;
  percent: number;
  thickness?: number;
}

export default memo(function ProgressCircle({
  title,
  subtitle,
  testID,
  height = 165,
  percent = 0.75,
  thickness = 15
}: Props) {
  const isTablet = DeviceInfo.isTablet();
  const innerCircleHeight = (height * 6) / 7;
  const styles = StyleSheet.create({
    container: {
      borderRadius: Theme.padding.p60,
      backgroundColor: Theme.color.neutral0,
      alignItems: "center",
      justifyContent: "center",
      height,
      width: height,
      marginLeft: isTablet ? Theme.padding.p20 : Theme.padding.p5
    },
    circle: {
      position: "absolute"
    }
  });
  return (
    <View style={styles.container} testID={testID}>
      <Text testID="progressCircleTitle" title={title} h1 center />
      {subtitle && (
        <Text testID="progressCircleSubtitle" title={subtitle} tab center />
      )}
      <Circle
        unfilledColor={Theme.color.notificationBackground}
        size={innerCircleHeight}
        borderWidth={0}
        thickness={thickness}
        color={Theme.color.primary200}
        progress={percent}
        style={styles.circle}
      />
    </View>
  );
});
