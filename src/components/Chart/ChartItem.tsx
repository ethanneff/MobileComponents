import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import Text from "../Text";
import { ChartType } from ".";

interface Props {
  count?: number;
  totalCount?: number;
  selected?: boolean;
  title: string;
  height: number;
  type: ChartType;
}

export default memo(function ChartItem({
  count = 0,
  selected,
  title,
  type,
  totalCount = 1,
  height
}: Props) {
  const isTablet = DeviceInfo.isTablet();
  const barHeight = `${
    count >= totalCount ? 100 : Math.round((count / totalCount) * 100)
  }%`;
  const circleSize = isTablet ? Theme.padding.p4 : Theme.padding.p3;
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    chart: {
      height,
      justifyContent: "flex-end"
    },
    xAxis: {
      height: isTablet ? Theme.padding.p10 : Theme.padding.p8,
      borderTopWidth: 1,
      borderColor: Theme.color.neutral300,
      paddingTop: isTablet ? 0 : Theme.padding.p2
    },
    xAxisLabel: {
      color: Theme.color.neutral700
    },
    xAxisLabelSelected: {
      color: Theme.color.neutral900,
      fontFamily: Theme.fontWeight.medium
    },
    bar: {
      alignSelf: "center",
      backgroundColor: Theme.color.brand,
      height: barHeight,
      width: "75%"
    },
    circle: {
      alignSelf: "center",
      backgroundColor: Theme.color.brand,
      borderRadius: circleSize,
      height: circleSize,
      width: circleSize,
      marginBottom: Theme.padding.p4
    }
  });

  const xAxisLabelStyle = [
    styles.xAxisLabel,
    selected && styles.xAxisLabelSelected
  ];
  const showCircle = count > 0 && type === "circle";
  const showBar = count > 0 && type === "bar";
  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        {showCircle && <View testID="circle" style={styles.circle} />}
        {showBar && <View testID="bar" style={styles.bar} />}
      </View>
      <View style={styles.xAxis}>
        <Text
          testID="xAxis"
          title={title}
          style={xAxisLabelStyle}
          center
          tab
          centerVertically
        />
      </View>
    </View>
  );
});
