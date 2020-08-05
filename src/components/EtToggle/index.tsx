import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Theme from "../../commons/Theme";
import Switch from "../Switch";
import Text from "../Text";

interface Props {
  testID?: string;
  title: string;
  value: boolean;
  topBorder?: boolean;
  onValueChange(): void;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: Theme.padding.p4,
    paddingHorizontal: Theme.sizing.margin
  },
  topBorder: {
    borderTopWidth: 1,
    borderColor: Theme.color.lineSpacer
  }
});

export default memo(function EtToggle({
  onValueChange,
  title,
  testID = "switch",
  topBorder,
  value
}: Props) {
  const containerStyles = [
    styles.container,
    topBorder ? styles.topBorder : undefined
  ];
  return (
    <View style={containerStyles}>
      <Text h5 title={title} testID="settingText" />
      <Switch value={value} onValueChange={onValueChange} testID={testID} />
    </View>
  );
});
