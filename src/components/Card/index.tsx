import React, { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Theme from "../../commons/Theme";
import Device from "react-native-device-detection";

const isTablet = Device.isTablet;

interface Props {
  color: string;
  style?: ViewStyle | {};
  opacity?: number;
  row?: boolean;
}

const Card: React.FC<Props> = memo(function CardMemo({
  color,
  opacity = 0.1,
  children,
  row,
  style,
}) {
  const styles = StyleSheet.create({
    container: {
      borderRadius: Theme.padding.p3,
      backgroundColor: color,
      width: "80%",
      alignSelf: "center",
      marginVertical: Theme.padding.p1,
      padding: isTablet ? Theme.padding.p8 : Theme.padding.p4,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
  const containerStyles = [
    styles.container,
    row ? styles.row : undefined,
    style,
  ];
  return <View style={containerStyles}>{children}</View>;
});

export default Card;
