import React, { memo, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import Icon from "../Icon";
import Text from "../Text";

export interface DropdownProps {
  testID?: string;
  placeholder?: string;
  hidden?: boolean;
  values?: string[];
  onChangeValue?(value: string): void;
  onPress?(): void;
}

export default memo(function Dropdown({
  placeholder,
  hidden,
  onPress,
  values,
  onChangeValue
}: DropdownProps) {
  const isTablet = DeviceInfo.isTablet();
  const iconSize = isTablet ? Theme.padding.p7 : Theme.padding.p5;
  const styles = StyleSheet.create({
    dropdown: {
      backgroundColor: Theme.color.neutral0
    },
    icon: {
      paddingTop: isTablet ? Theme.padding.p0 : Theme.padding.p1
    },
    text: {
      color: Theme.color.neutral300
    },
    iconButton: {
      padding: Theme.padding.p1
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      marginBottom: Theme.padding.p2,
      padding: isTablet ? Theme.padding.p4 : Theme.padding.p3,
      borderRadius: 6,
      borderRightWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: Theme.color.neutral100,
      height: Theme.padding.p16,
      backgroundColor: Theme.color.neutral50
    }
  });
  const styleInput = [styles.item, styles.dropdown];

  const onChangeValuePress = useCallback(
    value => () => {
      if (!onChangeValue) {
        return;
      }
      onChangeValue(value);
    },
    [onChangeValue]
  );

  return hidden ? null : (
    <View testID="dropdown">
      <TouchableOpacity
        style={styleInput}
        onPress={onPress}
        testID="dropdownButton"
      >
        {placeholder && (
          <Text
            title={placeholder}
            style={styles.text}
            testID="dropdownPlaceholder"
          />
        )}
        <Icon name="chevron-down" size={iconSize} style={styles.icon} />
      </TouchableOpacity>
      {values &&
        values.reverse().map(value => {
          return (
            <View
              style={styles.item}
              key={value}
              testID={`dropdownItem-${value}`}
            >
              <Text caption title={value} />
              <TouchableOpacity
                onPress={onChangeValuePress(value)}
                style={styles.iconButton}
                testID={`dropdownItemClose-${value}`}
              >
                <Icon name="close" size={iconSize} style={styles.icon} />
              </TouchableOpacity>
            </View>
          );
        })}
    </View>
  );
});
