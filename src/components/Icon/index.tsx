// usage: <Icon name="check" />
// source: https://materialdesignicons.com/
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Original from "react-native-vector-icons/MaterialCommunityIcons";
import Theme from "../../commons/Theme";
import Text from "../Text";

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    right: -10,
    top: -10,
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.color.primary200,
    borderRadius: 20
  },
  badgeText: {
    fontSize: Theme.padding.p3,
    color: Theme.color.neutral0,
    textAlign: "center"
  }
});

interface Props {
  testID?: string;
  hidden?: boolean;
  name?: string;
  size?: number;
  clear?: boolean;
  badge?: number;
  color?: string;
  style?: ViewStyle | {};
  onPress?(): void;
  accessibilityRole?: "none" | "image" | "imagebutton";
  accessibilityLabel?: string;
}

const DEFAULT_ICON_SIZE = Theme.padding.p6;
const DEFAULT_BADGE = 0;
const DEFAULT_ACTIVE_COLOR = Theme.color.neutral700;
const BADGE_LIMIT = "!";
const MAX_BADGE_NUMBER = 99;

class Icon extends React.PureComponent<Props> {
  render() {
    const {
      testID,
      style,
      name,
      clear,
      hidden,
      size = DEFAULT_ICON_SIZE,
      color = DEFAULT_ACTIVE_COLOR,
      badge = DEFAULT_BADGE,
      accessibilityRole,
      accessibilityLabel
    } = this.props;
    const num = badge > MAX_BADGE_NUMBER ? BADGE_LIMIT : String(badge);
    const colored = clear ? Theme.color.neutral0 : color;
    if (hidden || name === undefined || name.length === 0) {
      return null;
    }
    return (
      <View style={style}>
        <Original
          testID={testID}
          name={name}
          size={size}
          color={colored}
          accessibilityRole={accessibilityRole}
          accessibilityLabel={accessibilityLabel}
        />
        {badge > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText} title={num} />
          </View>
        )}
      </View>
    );
  }
}

export default Icon;
