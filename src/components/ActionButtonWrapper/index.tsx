import React, { Children, ReactElement, memo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Config from "../../commons/Config";
import Theme from "../../commons/Theme";
import {
  DeviceStylesConfig,
  getDeviceSize
} from "../../commons/Utils/DeviceInfo";

const isAndroid = Platform.OS === Config.os.android;
const iosTopShadow = {
  ...Theme.shadows.dropShadow,
  shadowOffset: {
    height: -2,
    width: 0
  }
};
const androidBorder = {
  borderTopWidth: 1,
  borderColor: Theme.color.neutral100
};

type Button = ReactElement;

interface Props {
  hidden?: boolean;
  topShadow?: boolean;
  children: [Button, Button] | Button;
}

export default memo(function ActionButtonWrapper({
  hidden,
  topShadow = true,
  children
}: Props) {
  const deviceSize = getDeviceSize();
  const isTablet = deviceSize === "tablet";
  const isSmall = deviceSize === "small";

  const getSecondaryButtonMargin = (): number => {
    if (isTablet) {
      return Theme.padding.p0;
    } else if (isSmall) {
      return Theme.padding.p3;
    } else {
      return Theme.padding.p4;
    }
  };

  const deviceContainerStyles: DeviceStylesConfig = {
    tablet: {
      flexDirection: "row-reverse",
      height: Theme.padding.p30,
      padding: Theme.padding.p8
    },
    mobile: {
      flexDirection: "column",
      paddingVertical: Theme.padding.p4
    },
    small: {
      paddingVertical: Theme.padding.p3
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Theme.color.neutral0,
      justifyContent: "center",
      alignItems: "center"
    },
    containerShadow: isAndroid || !topShadow ? androidBorder : iosTopShadow,
    buttons: {
      flex: isTablet ? 1 : 0,
      width: isTablet ? "60%" : "80%"
    },
    buttonSecondary: {
      marginRight: isTablet ? Theme.padding.p6 : Theme.padding.p0,
      marginTop: getSecondaryButtonMargin()
    }
  });

  const deviceContainerStyle = deviceContainerStyles[deviceSize];
  const containerStyles = [
    styles.container,
    styles.containerShadow,
    deviceContainerStyle
  ];
  const secondaryBtnStyles = [styles.buttons, styles.buttonSecondary];

  const styledChildren = () =>
    Children.map(children, (child, index) =>
      index === 1 ? (
        <View
          key={`secondaryButton${index}`}
          style={secondaryBtnStyles}
          testID="secondaryButtonWrapper"
        >
          {child}
        </View>
      ) : (
        <View key={`primaryButton${index}`} style={styles.buttons}>
          {child}
        </View>
      )
    );

  if (hidden) {
    return null;
  }
  return (
    <View style={containerStyles} testID="buttonBarWrapper">
      {styledChildren()}
    </View>
  );
});
