import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import {
  DeviceStylesConfig,
  getDeviceSize
} from "../../commons/Utils/DeviceInfo";
import Text from "../Text";

const deviceSize = getDeviceSize();

const containerStyle: DeviceStylesConfig = {
  tablet: {
    paddingTop: Theme.padding.p15,
    paddingBottom: Theme.padding.p7,
    paddingHorizontal: Theme.sizing.horizontal,
    alignItems: "center"
  },
  mobile: {
    paddingTop: Theme.padding.p10,
    paddingBottom: Theme.padding.p7,
    paddingHorizontal: Theme.sizing.horizontal,
    alignItems: "center"
  },
  small: {
    paddingTop: Theme.padding.p5,
    paddingBottom: Theme.padding.p6,
    paddingHorizontal: Theme.padding.p4,
    alignItems: "center"
  }
};

interface Props {
  h1?: string;
  h2?: string;
  h3?: string;
  caption?: string;
  overline?: string;
  style?: ViewStyle | {};
  notCentered?: boolean;
  flexible?: boolean;
  testID?: string;
  noTopBottomPadding?: boolean;
  nextLinePadding?: boolean;
  forwardTransparent?: boolean;
  responsive?: boolean;
}

class Header extends React.PureComponent<Props> {
  readonly isTablet = DeviceInfo.isTablet();
  readonly styles = StyleSheet.create({
    container: {
      paddingTop: Theme.sizing.vertical,
      paddingBottom: this.isTablet ? 60 : 20,
      paddingHorizontal: Theme.sizing.horizontal,
      alignItems: "center"
    },
    bottom: {
      paddingBottom: Theme.padding.p2
    },
    centered: {
      textAlign: "center"
    },
    flexible: {
      paddingTop: this.isTablet ? Theme.padding.p12 : Theme.padding.p5,
      flex: 1,
      paddingBottom: 0
    },
    nextLinePadding: {
      paddingTop: Theme.padding.p3
    },
    noTopBottomPadding: {
      paddingTop: 0,
      paddingBottom: 0
    },
    forwardTransparent: {
      backgroundColor: "transparent",
      zIndex: 10
    },
    responsiveContainer: containerStyle[deviceSize],
    responsiveBottom: { width: "100%", paddingBottom: Theme.padding.p1 }
  });

  render() {
    const {
      style,
      h1,
      h2,
      h3,
      caption,
      overline,
      testID,
      flexible,
      notCentered,
      noTopBottomPadding,
      nextLinePadding,
      forwardTransparent,
      responsive
    } = this.props;
    const containerStyles = [
      responsive ? this.styles.responsiveContainer : this.styles.container,
      flexible ? this.styles.flexible : undefined,
      noTopBottomPadding ? this.styles.noTopBottomPadding : undefined,
      forwardTransparent ? this.styles.forwardTransparent : undefined,
      style
    ];

    const textStyles = [
      notCentered ? undefined : this.styles.centered,
      responsive ? this.styles.responsiveBottom : this.styles.bottom,
      nextLinePadding ? this.styles.nextLinePadding : undefined
    ];
    const overlineStyles = [
      notCentered ? undefined : this.styles.centered,
      responsive ? this.styles.responsiveBottom : this.styles.bottom
    ];

    return (
      <View style={containerStyles} testID={testID}>
        <Text
          overline
          style={overlineStyles}
          title={overline}
          testID={`${testID}-overline`}
        />
        <Text h3 style={textStyles} title={h3} />
        <Text h2 style={textStyles} title={h2} />
        <Text h1 style={textStyles} title={h1} />
        <Text caption style={textStyles} title={caption} />
      </View>
    );
  }
}

export default Header;
