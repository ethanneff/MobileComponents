import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import LinearGradient from "react-native-linear-gradient";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import Text from "../Text";

interface Props {
  text?: string;
  gradient?: string[];
  backgroundColor?: string;
  hidden?: boolean;
}

const isTablet = DeviceInfo.isTablet();

const Pill = memo(function PillComponent({
  text = strings("pill.new"),
  gradient = Theme.gradients.levelUp.colors,
  backgroundColor = Theme.color.neutral0,
  hidden
}: Props) {
  const borderSize = 2;
  const borderRadius = Theme.padding.p12;

  const styles = StyleSheet.create({
    gradient: {
      width: isTablet ? Theme.padding.p16 : Theme.padding.p13,
      height: Theme.padding.p6,
      padding: borderSize,
      borderRadius
    },
    pill: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor,
      borderRadius
    },
    text: {
      fontFamily: Theme.fontWeight.medium
    }
  });

  if (hidden) {
    return null;
  }
  return (
    <LinearGradient
      testID="pillGradient"
      style={styles.gradient}
      colors={gradient}
    >
      <View testID="pillInner" style={styles.pill}>
        <Text
          testID="pillText"
          style={styles.text}
          title={text}
          button
          overline
        />
      </View>
    </LinearGradient>
  );
});

export default Pill;
