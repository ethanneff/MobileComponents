import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import { ChartType } from "../Chart";
import Text from "../Text";

interface Props {
  testID?: string;
  title: string;
  subtitle: string;
  type: ChartType;
}

export default memo(function ChartLegend({
  testID,
  title,
  subtitle,
  type
}: Props) {
  const isTablet = DeviceInfo.isTablet();
  const circleSize = isTablet ? Theme.padding.p4 : Theme.padding.p3;
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center"
    },
    title: {
      marginBottom: Theme.padding.p1
    },
    circle: {
      alignSelf: "center",
      backgroundColor: Theme.color.brand,
      borderRadius: circleSize,
      height: circleSize,
      width: circleSize
    },
    bar: {
      borderRadius: 0
    }
  });
  const styleIcon =
    type === "circle" ? styles.circle : [styles.circle, styles.bar];
  return (
    <View testID={testID}>
      <Text title={title} style={styles.title} caption />
      <View style={styles.row}>
        <View testID="icon" style={styleIcon} />
        <Text title={subtitle} caption />
      </View>
    </View>
  );
});
