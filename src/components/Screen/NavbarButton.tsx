import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import Icon from "../Icon";
import Text from "../Text";

const isTablet = DeviceInfo.isTablet();

interface Props {
  icon: string;
  isRight?: boolean;
  hidden?: boolean;
  text?: string;
  style?: ViewStyle | {};
  testID?: string;
  accessibilityLabel?: string;
  onPress?(): void;
}

export default function NavbarButton({
  onPress,
  icon,
  isRight,
  hidden,
  style,
  text,
  testID,
  accessibilityLabel
}: Props) {
  const cachedOnPress = useCallback(() => {
    // This useCallback prevents function arguments from being passed into `onPress`
    // When run in tests, arguments weren't passed into `onPress`, making this logic untestable.
    if (onPress) {
      onPress();
    }
  }, [onPress]);
  const arrowOffset = icon.startsWith("arrow-left") ? Theme.padding.p1 : 0;
  const paddingHorizontal =
    (isTablet ? Theme.padding.p7 : Theme.padding.p4) - arrowOffset;
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      paddingHorizontal,
      flexDirection: "row",
      alignItems: "center",
      minHeight: Theme.padding.p11
    },
    buttonWithText: {
      flexDirection: "row-reverse",
      justifyContent: "flex-end"
    },
    textContainer: {
      paddingHorizontal: Theme.padding.p4
    },
    right: {
      flexDirection: "row",
      justifyContent: "flex-end"
    },
    hidden: {
      opacity: 0
    }
  });
  const containerStyle = [
    styles.button,
    text ? styles.buttonWithText : undefined,
    isRight ? styles.right : undefined,
    style ? style : undefined
  ];
  if (!onPress && !text) {
    return null;
  }
  const iconSize = isTablet ? Theme.padding.p9 : Theme.padding.p6;
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={cachedOnPress}
      disabled={hidden}
      testID={testID}
      activeOpacity={!onPress ? 1 : 0.2}
      accessibilityLabel={accessibilityLabel}
    >
      <Text h3 hidden={!text} title={text} style={styles.textContainer} />
      <Icon
        hidden={hidden}
        color={Theme.color.neutral700}
        name={icon}
        size={iconSize}
        testID="navbarIcon"
      />
    </TouchableOpacity>
  );
}
