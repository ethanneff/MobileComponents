import React from "react";
import { StyleSheet, View } from "react-native";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import {
  DeviceStylesConfig,
  getDeviceSize
} from "../../commons/Utils/DeviceInfo";
import Button from "../../components/Button";
import Text from "../../components/Text";

type Props = {
  handleIncrease: () => void;
  handleDecrease: () => void;
};

export const Controls: React.FC<Props> = ({
  handleIncrease,
  handleDecrease
}) => {
  const deviceSize = getDeviceSize();
  const isTablet = deviceSize === "tablet";

  const buttonMarginStyles: DeviceStylesConfig = {
    tablet: {
      marginBottom: Theme.padding.p5
    },
    mobile: {
      marginBottom: Theme.padding.p4
    },
    small: {
      marginBottom: Theme.padding.p3
    }
  };

  const iconSize = isTablet ? Theme.padding.p6 : Theme.padding.p4;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-end",
      zIndex: 1
    },
    buttonContainer: {
      height: isTablet ? Theme.padding.p40 : Theme.padding.p30
    },
    button: {
      width: isTablet ? Theme.padding.p14 : Theme.padding.p10,
      height: isTablet ? Theme.padding.p14 : Theme.padding.p10
    },
    buttonMargin: buttonMarginStyles[deviceSize],
    icon: {
      width: iconSize,
      height: iconSize
    },
    label: {
      marginTop: isTablet ? Theme.padding.p3 : Theme.padding.p2
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          testID="buttonDifficultyUp"
          nonFlex
          icon="arrow-up"
          outline
          circle
          styleContainer={[styles.button, styles.buttonMargin]}
          onPress={handleIncrease}
          styleIcon={styles.icon}
          styleIconSize={iconSize}
        />
        <Button
          testID="buttonDifficultyDown"
          nonFlex
          circle
          styleContainer={styles.button}
          icon="arrow-down"
          outline
          onPress={handleDecrease}
          styleIcon={styles.icon}
          styleIconSize={iconSize}
        />
        <Text
          overline
          title={strings("exerciseActivity.target")}
          testID="label"
          style={styles.label}
        />
      </View>
    </View>
  );
};
