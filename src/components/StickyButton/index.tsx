import React, { memo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Config from "../../commons/Config";
import Theme from "../../commons/Theme";
import {
  DeviceStylesConfig,
  getDeviceSize
} from "../../commons/Utils/DeviceInfo";
import Button from "../Button";

const buttonStyles: DeviceStylesConfig = {
  tablet: {
    marginVertical: Theme.sizing.margin
  },
  mobile: {
    marginVertical: Theme.sizing.margin
  },
  small: {
    marginVertical: Theme.padding.p3
  }
};
const deviceSize = getDeviceSize();
const buttonStyle = buttonStyles[deviceSize];

const isAndroid = Platform.OS === Config.os.android;
const iosTopShadow = {
  ...Theme.shadows.dropShadow,
  shadowOffset: {
    height: -2,
    width: 0
  }
};
const androidTopShadow = {
  borderTopWidth: 1,
  borderColor: Theme.color.neutral100
};

interface Props {
  title: string;
  secondary?: boolean;
  testID?: string;
  hidden?: boolean;
  noTopShadow?: boolean;
  disable?: boolean;
  onPress?: () => void;
}

export default memo(function StickyButton({
  onPress,
  secondary,
  title,
  hidden,
  disable,
  testID = "stickyButton",
  noTopShadow
}: Props) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Theme.color.neutral0,
      justifyContent: "center"
    },
    containerShadow: isAndroid || noTopShadow ? androidTopShadow : iosTopShadow,
    button: {
      marginVertical: buttonStyle.marginVertical
    }
  });

  const containerStyles = [styles.container, styles.containerShadow];

  if (hidden) {
    return null;
  }
  return (
    <View style={containerStyles}>
      <Button
        half
        secondary={secondary}
        title={title}
        onPress={onPress}
        styleContainer={styles.button}
        testID={testID}
        disable={disable}
      />
    </View>
  );
});
