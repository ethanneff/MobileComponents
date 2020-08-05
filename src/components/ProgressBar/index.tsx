import React, { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import Text from "../../components/Text";
import GradientBar from "../GradientBar";

const isTablet = DeviceInfo.isTablet();
const window = Dimensions.get("window");
const progressWidth = isTablet ? window.width * 0.55 : window.width * 0.5;

interface Props {
  color: string;
  total: number;
  current: number;
}

const levelProgress = {
  borderRadius: 30,
  height: Theme.padding.p7,
  width: progressWidth
};

const numDecimalPlacesToRight = 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  level: {
    paddingRight: 8
  },
  points: {
    position: "absolute",
    color: Theme.color.neutral900
  }
});

export const getPercent = (pointsEarned: number, totalPoints: number) => {
  if (totalPoints === 0) {
    return 0;
  }
  return parseFloat(
    (pointsEarned / totalPoints).toFixed(numDecimalPlacesToRight)
  );
};

export default memo(function ProgressBar({ color, total, current }: Props) {
  const levelPoints = `${current}/${total}`;
  const progress = getPercent(current, total);
  return (
    <View style={styles.container} testID="progressBar">
      <GradientBar
        progress={progress}
        color={color}
        borderColor={Theme.color.neutral100}
        unfilledColor={Theme.color.neutral50}
        width={levelProgress.width}
        borderRadius={levelProgress.borderRadius}
        height={levelProgress.height}
      />
      <Text
        style={styles.points}
        h5
        title={`${strings("playlist.levelPoints", { levelPoints })}`}
        testID="progressBarPoints"
      />
    </View>
  );
});
