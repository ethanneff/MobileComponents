import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import ProgressBar from "../ProgressBar";
import NavbarButton from "../Screen/NavbarButton";
import Text from "../Text";

interface Props {
  levelIndex: number;
  levelPointsEarned: number;
  totalLevelPoints: number;
  enableLevels: boolean;
  onLeftPress?(): void;
}

const isTablet = DeviceInfo.isTablet();
const paddingForDevice = isTablet ? Theme.padding.p8 : Theme.padding.p4;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: Theme.padding.p1,
    paddingBottom: Theme.padding.p1,
    backgroundColor: Theme.color.neutral0,
    zIndex: 5
  },
  levelProgress: {
    flex: 8,
    flexDirection: "row"
  },
  title: {
    paddingRight: paddingForDevice
  },
  navButtonLeft: {
    padding: paddingForDevice,
    paddingLeft: paddingForDevice,
    paddingRight: Theme.padding.p2
  },
  border: {
    borderBottomColor: Theme.color.neutral100,
    borderBottomWidth: 1,
    marginLeft: "10%",
    marginRight: "10%",
    zIndex: 5
  },
  emptyRight: {
    padding: Theme.padding.p8
  }
});

export default memo(function LevelsDrawer({
  levelIndex,
  levelPointsEarned,
  totalLevelPoints,
  enableLevels,
  onLeftPress
}: Props) {
  const levelText = `${strings("playlist.level")} ${levelIndex + 1}`;
  const icon = enableLevels ? "chevron-up" : "chevron-down";
  const containerStyles = [
    !enableLevels ? Theme.shadows.dropShadow : undefined,
    styles.container
  ];
  const borderStyle = [enableLevels ? styles.border : undefined];
  const bottomStyle = [borderStyle, { opacity: enableLevels ? 1 : 0 }];

  return (
    <>
      <View style={containerStyles} testID="levelsDrawer">
        <NavbarButton
          hidden={false}
          icon={icon}
          style={styles.navButtonLeft}
          onPress={onLeftPress}
          testID="levelsDrawerIcon"
        />
        <View style={styles.levelProgress}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onLeftPress}
            testID="levelsDrawerText"
          >
            <Text h5 style={styles.title} title={levelText} />
          </TouchableOpacity>
          <ProgressBar
            color={Theme.color.success}
            current={levelPointsEarned}
            total={totalLevelPoints}
          />
        </View>
        <View testID="navbarSpacer" style={styles.emptyRight} />
      </View>
      <View style={bottomStyle} />
    </>
  );
});
