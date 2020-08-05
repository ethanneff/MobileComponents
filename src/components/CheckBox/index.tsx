import React, { memo } from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import Theme from "../../commons/Theme";
import Text from "../../components/Text";
import Icon from "../../components/Icon";

interface Props {
  testID?: string;
  style?: ViewStyle;
  shape?: "square" | "circle" | "radio-circle";
  titlePosition?: "inside" | "left" | "right";
  titleStyle?: TextStyle;
  title: string;
  checked: boolean;
  disabled?: boolean;
  size?: number;
  hidden?: boolean;
  onChange: (checked: boolean) => void;
}

export default memo(function CheckBox({
  testID = "checkboxTouchable",
  style,
  shape = "square",
  titlePosition = "right",
  titleStyle = { fontSize: 16 },
  title,
  checked,
  disabled,
  onChange,
  hidden,
  size = shape === "circle" ? 40 : 24
}: Props) {
  const handlePress = () => {
    onChange(!checked);
  };

  const titlePositionInside = titlePosition === "inside";
  const titlePositionLeft = titlePosition === "left";
  const titlePositionRight = titlePosition === "right";

  const styles = StyleSheet.create({
    container: {
      flexDirection: titlePositionLeft ? "row-reverse" : "row"
    },
    title: {
      flex: titlePositionInside ? undefined : 1,
      flexWrap: "wrap"
    },
    titleLeft: {
      paddingRight: Theme.padding.p6
    },
    titleRight: {
      paddingLeft: Theme.padding.p6
    },
    titleInside: {
      lineHeight: size
    },
    checkbox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: shape === "square" ? Theme.padding.p1 : size,
      borderWidth: shape === "square" ? 2 : 1,
      borderColor: Theme.color.neutral100,
      width: size,
      height: size,
      backgroundColor: checked
        ? Theme.color.primary200
        : Theme.color.notificationBackground
    }
  });

  const containerStyles = [styles.container, style];

  const titleStyles = [
    styles.title,
    titleStyle,
    titlePositionLeft && styles.titleLeft,
    titlePositionRight && styles.titleRight,
    titlePositionInside && styles.titleInside
  ];

  const touchTarget = {
    top: 24,
    bottom: 24,
    left: 0,
    right: 0
  };

  return hidden ? null : (
    <TouchableOpacity
      testID={testID}
      onPress={handlePress}
      disabled={disabled}
      hitSlop={touchTarget}
    >
      <View style={containerStyles}>
        {titlePositionInside ? (
          <View style={styles.checkbox} testID="checkbox">
            <Text
              title={title}
              tab
              style={titleStyles}
              testID="checkboxTitle"
            />
          </View>
        ) : (
          <>
            <View style={styles.checkbox} testID="checkbox">
              <Icon
                name={
                  shape === "radio-circle" ? "checkbox-blank-circle" : "check"
                }
                size={
                  shape === "radio-circle" ? Theme.padding.p2 : Theme.padding.p5
                }
                hidden={!checked}
                testID="checkboxIcon"
              />
            </View>
            <Text
              caption
              title={title}
              style={titleStyles}
              testID="checkboxTitle"
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
});
