import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import { ProgressActivity } from "../../commons/Models";
import Theme, { colorWithOpacity } from "../../commons/Theme";
import Text from "../Text";
import ChartItem from "./ChartItem";
import ChartLegend from "./ChartLegend";

export type ChartType = "bar" | "circle";

interface Props {
  testID?: string;
  items: ReadonlyArray<ProgressActivity>;
  yAxis?: string[];
  type: ChartType;
  title: string;
  subtitle: string;
  height?: number;
  totalCount?: number;
  xAxisParser?(value: string): string;
}

export default memo(function Chart({
  items,
  type,
  testID,
  height = Theme.padding.p35,
  title,
  subtitle,
  totalCount,
  yAxis,
  xAxisParser
}: Props) {
  const isTablet = DeviceInfo.isTablet();
  const xAxisHeight = isTablet ? Theme.padding.p10 : Theme.padding.p8;
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row"
    },
    flex: {
      flex: 1
    },

    chart: {
      paddingTop: Theme.padding.p6,
      alignSelf: "center"
    },
    yAxis: {
      position: "relative",
      borderLeftColor: colorWithOpacity(Theme.color.neutral700, 0.5),
      borderLeftWidth: 1,
      paddingLeft: Theme.padding.p2,
      paddingBottom: Theme.padding.p2,
      marginBottom: xAxisHeight,
      paddingRight: Theme.padding.p1
    }
  });
  return (
    <View testID={testID}>
      <ChartLegend
        testID="legend"
        title={title}
        subtitle={subtitle}
        type={type}
      />
      <View style={[styles.row, styles.chart]}>
        <View testID="chartBody" style={[styles.row, styles.flex]}>
          {items.map((item, index) => (
            <ChartItem
              height={height}
              key={`${item.label}${index}`}
              title={xAxisParser ? xAxisParser(item.label) : item.label}
              selected={item.highlighted}
              count={item.count}
              type={type}
              totalCount={totalCount}
            />
          ))}
        </View>
        {yAxis && totalCount && (
          <View testID="yAxis" style={styles.yAxis}>
            {yAxis.map(item => {
              const yAxisValue = parseInt(item, 10);
              const percentageOfTotal =
                parseFloat((yAxisValue / totalCount).toFixed(2)) * 100;
              const halfFontSize = Theme.fontSize.tab.fontSize / 2;

              const bottomPosition = percentageOfTotal - halfFontSize;
              const yAxisText = {
                position: "absolute",
                textAlign: "right",
                left: Theme.padding.p2,
                bottom: `${bottomPosition}%`
              };
              return <Text title={item} tab key={item} style={yAxisText} />;
            })}
          </View>
        )}
      </View>
    </View>
  );
});
