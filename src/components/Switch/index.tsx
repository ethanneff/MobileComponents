import React from "react";
import {
  Switch as Original,
  Platform,
  StyleSheet,
  SwitchProps
} from "react-native";
import { Switch } from "react-native-switch";
import Config from "../../commons/Config";
import Theme from "../../commons/Theme";

export default function Toggle(props: SwitchProps) {
  const height = Theme.padding.p9;
  const padding = height / Theme.padding.p3;
  const styles = StyleSheet.create({ circle: { elevation: 2, zIndex: 2 } });
  return Platform.OS === Config.os.ios ? (
    <Original
      {...props}
      trackColor={{
        true: Theme.color.success,
        false: Theme.color.neutral100
      }}
    />
  ) : (
    <Switch
      {...props}
      switchWidthMultiplier={1.8}
      backgroundActive={Theme.color.success}
      backgroundInactive={Theme.color.neutral100}
      circleBorderWidth={0}
      innerCircleStyle={styles.circle}
      circleSize={Theme.padding.p8}
      switchLeftPx={padding}
      switchRightPx={padding}
      barHeight={height}
    />
  );
}
