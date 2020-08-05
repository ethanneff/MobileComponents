import React, { memo } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import DeviceInfo from "react-native-device-info";
import LinearGradient, {
  LinearGradientProps
} from "react-native-linear-gradient";
import Theme from "../../commons/Theme";
import Text from "../../components/Text";
import Icon from "../Icon";

const window = Dimensions.get("window");

interface Props {
  halfHeight?: boolean;
  gradient: boolean;
  gradientProps?: LinearGradientProps;
  title: string;
  titleCaption?: string;
  style?: ViewStyle | {};
  onPress?(): void;
}

export default memo(function CardModalTitle({
  gradient,
  gradientProps = Theme.gradients.ftuSensorSetupDone,
  title,
  titleCaption = "",
  style,
  onPress
}: Props) {
  const isTablet = DeviceInfo.isTablet();
  const iconName = "close";
  const iconSize = Theme.padding.p6;
  const iconColor = Theme.color.neutral700;
  const styles = StyleSheet.create({
    container: {
      paddingTop: isTablet ? Theme.padding.p5 : Theme.padding.p4,
      paddingBottom: isTablet ? Theme.padding.p6 : Theme.padding.p4,
      overflow: "hidden"
    },
    caption: {
      paddingBottom: Theme.padding.p1
    },
    backgroundCurve: {
      backgroundColor: Theme.color.neutral30,
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: window.width
    },
    iconContainer: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      top: Theme.padding.p5,
      right: Theme.padding.p5,
      zIndex: 1,
      elevation: 1
    },
    icon: {
      padding: Theme.padding.p1
    }
  });
  const containerStyles = [styles.container, style ? style : undefined];

  return (
    <View style={containerStyles} testID="cardContainer">
      {gradient ? (
        <LinearGradient
          {...gradientProps}
          style={styles.backgroundCurve}
          testID="cardGradient"
        />
      ) : (
        <View style={styles.backgroundCurve} />
      )}
      {onPress && (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={onPress}
            style={styles.icon}
            testID="closeButton"
          >
            <Icon
              name={iconName}
              size={iconSize}
              color={iconColor}
              testID="closeIcon"
            />
          </TouchableOpacity>
        </View>
      )}
      <Text
        center
        overline
        title={titleCaption}
        style={styles.caption}
        testID="captionTitle"
      />
      <Text center h2 title={title} testID="cardTitle" />
    </View>
  );
});
