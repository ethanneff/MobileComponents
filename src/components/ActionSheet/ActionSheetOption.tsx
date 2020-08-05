import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import Text from "../../components/Text";
import StickyButton from "../../components/StickyButton";
import Icon from "../Icon";
import { ActionSheetListItem } from ".";

interface Props {
  index: number;
  onPress(): void;
  selected?: boolean;
  actionSheetListItem: ActionSheetListItem;
}

const isTablet = DeviceInfo.isTablet();
const borderTopWidth = 1;
const heightOfTextElement = Theme.fontSize.body.lineHeight;
const paddingVertical = isTablet ? Theme.padding.p7 / 2 : Theme.padding.p3;
export const actionSheetOptionHeight =
  paddingVertical * 2 + heightOfTextElement + borderTopWidth;

const styles = StyleSheet.create({
  container: {
    borderTopColor: Theme.color.lineSpacer,
    borderTopWidth
  },
  option: {
    paddingVertical,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  disabledText: {
    color: Theme.color.neutral300
  },
  icon: {
    paddingLeft: Theme.padding.p1
  }
});

export default memo(function ActionSheetOption({
  index,
  onPress,
  selected,
  actionSheetListItem
}: Props) {
  const {
    disabled,
    title,
    iconName,
    iconSize,
    iconColor
  } = actionSheetListItem;
  const isCancelButton = index === -1;
  const isFirstOption = index === 0;
  const optionContainerStyle = [
    styles.option,
    isFirstOption
      ? {
          borderTopWidth: 0
        }
      : undefined
  ];
  const optionTextStyle = [disabled && styles.disabledText];
  const testID = isCancelButton ? "cancel" : `option-${index}`;
  return isCancelButton ? (
    <StickyButton secondary title="Cancel" testID={testID} onPress={onPress} />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        style={optionContainerStyle}
        onPress={onPress}
        testID={testID}
        disabled={disabled}
      >
        <Text
          title={title}
          testID={`optionText-${index}`}
          style={optionTextStyle}
          bold={selected}
        />
        {iconName && (
          <Icon
            name={iconName}
            style={styles.icon}
            size={iconSize}
            color={iconColor}
            testID={`optionIcon-${index}`}
          />
        )}
      </TouchableOpacity>
    </View>
  );
});
