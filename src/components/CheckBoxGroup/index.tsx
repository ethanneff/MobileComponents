import React, { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Theme from "../../commons/Theme";
import CheckBox from "../CheckBox";

export interface CheckBoxGroupOption {
  title: string;
  checked: boolean;
  value?: string;
}

interface Props {
  testID?: string;
  style?: ViewStyle;
  size?: number;
  shape?: "square" | "circle";
  titlePosition?: "inside" | "left" | "right";
  vertical?: boolean;
  options: CheckBoxGroupOption[];
  onChange: (updatedOptions: CheckBoxGroupOption[]) => void;
}

export default memo(function CheckboxGroup({
  testID,
  style,
  size,
  shape = "circle",
  titlePosition = "inside",
  vertical = false,
  options,
  onChange
}: Props) {
  const createOnChangeHandler = (index: number) => {
    return (updatedValue: boolean) => {
      const updatedOptions = options.map((option, idx) => {
        if (index === idx) {
          return {
            ...option,
            checked: updatedValue
          };
        }
        return option;
      });
      onChange(updatedOptions);
    };
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: vertical ? "column" : "row",
      justifyContent: "space-between"
    },
    checkboxStyle: {
      marginBottom: vertical ? Theme.padding.p6 : undefined
    }
  });

  const containerStyles = [styles.container, style];

  return (
    <View style={containerStyles} testID={testID}>
      {options.map((option, index) => (
        <CheckBox
          title={option.title}
          checked={option.checked}
          shape={shape}
          titlePosition={titlePosition}
          size={size}
          onChange={createOnChangeHandler(index)}
          key={option.value}
          style={styles.checkboxStyle}
        />
      ))}
    </View>
  );
});
