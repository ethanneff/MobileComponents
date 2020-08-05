import React from "react";
import { Dimensions, StyleSheet, View, ViewStyle } from "react-native";
import DeviceInfo from "react-native-device-info";
import { Bar } from "react-native-progress";
import Theme from "../../commons/Theme";
import Icon from "../../components/Icon";

const isTablet = DeviceInfo.isTablet();
const iconSize = Theme.padding.p8;
const iconPadding = Theme.padding.p2;
const loaderCheckmarkSize = iconPadding * 2 + iconSize;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  barContainer: {
    padding: Theme.padding.p3
  },
  iconContainer: {
    borderRadius: loaderCheckmarkSize,
    backgroundColor: Theme.color.success,
    padding: iconPadding,
    height: loaderCheckmarkSize,
    width: loaderCheckmarkSize,
    justifyContent: "center",
    alignItems: "center"
  }
});

interface Props {
  style?: ViewStyle | {};
  hidden?: boolean;
  animated?: boolean;
  finalComplete: boolean;
  indeterminate?: boolean;
  percent: number;
}

const WINDOW = Dimensions.get("window");

class Loader extends React.PureComponent<Props> {
  render() {
    const {
      hidden,
      finalComplete,
      percent,
      indeterminate,
      animated,
      style
    } = this.props;
    const width = WINDOW.height > WINDOW.width ? WINDOW.width : WINDOW.height;
    const containerStyle = style
      ? [styles.container, style]
      : [styles.container];
    const widthMultiplier = isTablet ? 0.5 : 0.6;
    return hidden ? null : (
      <View style={containerStyle}>
        {!finalComplete && (
          <View style={styles.barContainer}>
            <Bar
              animated={animated}
              testID="loaderProgressBar"
              height={isTablet ? 24 : 18}
              width={width * widthMultiplier}
              borderRadius={Theme.padding.p4}
              borderColor={Theme.color.neutral100}
              progress={percent}
              color={Theme.color.primary200}
              indeterminate={indeterminate}
            />
          </View>
        )}
        {finalComplete && (
          <View testID="loaderCheckmark" style={styles.iconContainer}>
            <Icon name={"check"} size={iconSize} color={Theme.color.neutral0} />
          </View>
        )}
      </View>
    );
  }
}

export default Loader;
