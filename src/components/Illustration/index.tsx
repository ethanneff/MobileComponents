import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View
} from "react-native";
import { SvgProps } from "react-native-svg";
import Theme, { colorWithOpacity } from "../../commons/Theme";
import {
  DeviceStylesConfig,
  getDeviceSize
} from "../../commons/Utils/DeviceInfo";

export const testIDs = { illustration: "illustration" };

const deviceSize = getDeviceSize();

const containerStyles: DeviceStylesConfig = {
  tablet: {
    height: 404
  },
  mobile: {
    height: 276
  },
  small: {
    height: 220
  }
};

interface Props {
  height?: number;
  heightType?: "percentage" | "fixed";
  source: ImageSourcePropType;
  background?: boolean;
  resizeMode?: "contain" | "cover";
  mirror?: boolean;
  responsive?: boolean;
}

class Illustration extends React.PureComponent<Props> {
  readonly styles = StyleSheet.create({
    image: {
      flex: 1,
      height: undefined,
      width: undefined,
      justifyContent: "center"
    },
    responsiveImage: {
      flex: 1,
      height: undefined,
      width: undefined
    }
  });

  render() {
    const {
      height = 45,
      heightType = "percentage",
      source,
      resizeMode = "contain",
      background = false,
      mirror,
      responsive
    } = this.props;

    const style = [
      responsive ? this.styles.responsiveImage : this.styles.image,
      mirror ? { transform: [{ scaleX: -1 }] } : undefined
    ];

    const heightStyle = {
      height: heightType === "percentage" ? `${height}%` : height
    };

    const container = [
      responsive ? containerStyles[deviceSize] : heightStyle,
      {
        backgroundColor: background
          ? colorWithOpacity(Theme.color.neutral50, 0.4)
          : undefined
      }
    ];

    let component;
    if (typeof source === "function") {
      const SvgImage: React.FC<SvgProps> = source;
      component = <SvgImage style={style} testID={testIDs.illustration} />;
    } else {
      component = (
        <ImageBackground
          resizeMode={resizeMode}
          style={style}
          source={source}
          testID={testIDs.illustration}
        />
      );
    }

    return (
      <View style={container} testID="illustrationContainer">
        {component}
      </View>
    );
  }
}

export default Illustration;
