import React, { useEffect, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import Theme from "../../commons/Theme";
import {
  DeviceImageStylesConfig,
  getDeviceSize
} from "../../commons/Utils/DeviceInfo";

const deviceSize = getDeviceSize();
const iconSizes: DeviceImageStylesConfig = {
  tablet: {
    width: Theme.padding.p6
  },
  mobile: {
    width: Theme.padding.p5
  },
  small: {
    width: Theme.padding.p4
  }
};
const iconLength = iconSizes[deviceSize].width as number;
const iconContainerLength = iconLength;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: iconContainerLength + 1
  },
  outline: {
    backgroundColor: Theme.color.neutral0,
    height: iconContainerLength,
    width: iconContainerLength,
    alignItems: "center",
    borderColor: Theme.color.neutral900,
    borderWidth: 1,
    borderRadius: iconLength
  },
  icon: {
    height: iconLength - 2,
    width: iconLength - 2
  }
});

interface Props {
  index: number;
  showIcon: boolean;
}

export function OutlineFadeIcon(props: Props) {
  const { index, showIcon } = props;
  const [fade] = useState(new Animated.Value(0));
  useEffect(() => {
    if (showIcon) {
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
        delay: 200 + 100 * index
      }).start();
    }
  }, [fade, index, showIcon]);

  return (
    <View style={styles.container}>
      <View style={styles.outline}>
        {showIcon && (
          <Animated.View style={{ opacity: fade }} testID="checkIcon">
            <Image
              source={require("../../commons/Assets/Playlist/small-green-check-mark.png")}
              resizeMode="stretch"
              style={styles.icon}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
}
