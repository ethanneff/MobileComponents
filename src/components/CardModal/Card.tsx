import React from "react";
import { StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import Button from "../Button";
import CardModalTitle from "./CardModalTitle";

const isTablet = DeviceInfo.isTablet();

interface Props {
  gradient?: boolean;
  title: string;
  titleCaption: string;
  buttonTitle: string;
  itemHeight?: number;
  deviceIsTablet?: boolean;
  children?: React.ReactNode;
  onPress?(): void;
}
function getStyle(deviceIsTablet: boolean) {
  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: Theme.color.neutral0,
      maxWidth: 500,
      width: deviceIsTablet ? "80%" : "100%",
      paddingBottom: deviceIsTablet ? Theme.padding.p8 : Theme.padding.p4,
      alignSelf: "center",
      ...Theme.shadows.dropShadow
    },
    modalContainerRadius: {
      borderRadius: deviceIsTablet ? Theme.padding.p5 : Theme.padding.p3
    },
    modalTopBorderRadius: {
      // Workaround for RN Known issue: `overflow: hidden` removes shadows on IOS
      borderTopLeftRadius: deviceIsTablet ? Theme.padding.p5 : Theme.padding.p3,
      borderTopRightRadius: deviceIsTablet ? Theme.padding.p5 : Theme.padding.p3
    },
    button: {
      marginTop: deviceIsTablet ? Theme.padding.p9 : Theme.padding.p6
    }
  });
  return styles;
}

export function Card({
  gradient = false,
  onPress,
  title,
  titleCaption,
  buttonTitle,
  deviceIsTablet = isTablet,
  children
}: Props) {
  const styles = getStyle(deviceIsTablet);

  const cardContainerStyles = [
    styles.cardContainer,
    styles.modalContainerRadius
  ];
  return (
    <View style={cardContainerStyles}>
      <CardModalTitle
        gradient={gradient}
        titleCaption={titleCaption}
        title={title}
        style={styles.modalTopBorderRadius}
      />
      {children}
      <Button
        testID="cardModalButton"
        half
        title={buttonTitle}
        onPress={onPress}
        hidden={!onPress}
        styleContainer={styles.button}
        deviceIsTablet={deviceIsTablet}
      />
    </View>
  );
}
