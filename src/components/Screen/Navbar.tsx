import React from "react";
import { StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import { strings } from "../../commons/Locales";
import NavbarButton from "./NavbarButton";

const isTablet = DeviceInfo.isTablet();

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Theme.color.neutral0,
    justifyContent: "space-between",
    alignItems: "center",
    height: isTablet ? Theme.padding.p16 : Theme.padding.p11,
    zIndex: 1
  },
  floatingContainer: {
    height: isTablet ? Theme.padding.p16 : Theme.padding.p11,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    zIndex: 1,
    elevation: 1
  },
  border: {
    borderBottomColor: Theme.color.neutral100,
    borderBottomWidth: 1
  }
});

interface Props {
  leftIcon: string;
  rightIcon: string;
  leftHidden?: boolean;
  rightHidden?: boolean;
  floatingNav?: boolean;
  blankNav?: boolean;
  navBackgroundColor?: string;
  leftText?: string;
  rightText?: string;
  border?: boolean;
  onLeftPress?(): void;
  onRightPress?(): void;
}

class Navbar extends React.PureComponent<Props> {
  public render() {
    const {
      onLeftPress,
      onRightPress,
      leftIcon,
      rightIcon,
      leftHidden,
      rightHidden,
      floatingNav,
      navBackgroundColor,
      leftText,
      rightText,
      border,
      blankNav
    } = this.props;
    const isEnabled =
      !!onLeftPress ||
      !!onRightPress ||
      !!leftText ||
      !!rightText ||
      !!blankNav;
    if (!isEnabled) {
      return null;
    }

    const containerStyle = [
      floatingNav ? styles.floatingContainer : styles.container,
      border ? styles.border : undefined,
      navBackgroundColor ? { backgroundColor: navBackgroundColor } : undefined
    ];

    return (
      <View style={containerStyle} testID="navbar">
        <NavbarButton
          hidden={leftHidden}
          icon={leftIcon}
          onPress={onLeftPress}
          text={leftText}
          testID="leftNavbarButton"
          accessibilityLabel={
            leftText || strings("globalAccessibility.navBackButton")
          }
        />
        <NavbarButton
          hidden={rightHidden}
          icon={rightIcon}
          isRight
          onPress={onRightPress}
          text={rightText}
          testID="rightNavbarButton"
          accessibilityLabel={
            rightText || strings("globalAccessibility.navCloseButton")
          }
        />
      </View>
    );
  }
}

export default Navbar;
