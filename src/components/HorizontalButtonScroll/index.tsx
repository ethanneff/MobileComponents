import React, { memo, useCallback, useState } from "react";
import { FlatList, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Theme from "../../commons/Theme";
import Button from "../Button";

export interface HorizontalScrollButtonItem {
  title: string;
  id: number;
}

interface RenderItem {
  item: HorizontalScrollButtonItem;
  index: number;
}

interface Props {
  testID?: string;
  buttonItems: HorizontalScrollButtonItem[];
  activeId?: number | null;
  style?: StyleProp<ViewStyle>;
  clearAllSelections?: boolean;
  onChange(id: number): void;
}

const styles = StyleSheet.create({
  buttonMargin: {
    marginRight: Theme.padding.p2
  }
});

export default memo(function HorizontalButtonScroll({
  testID = "horizontalButtonScroll",
  buttonItems,
  activeId,
  style,
  clearAllSelections,
  onChange
}: Props) {
  const keyExtractor = (item: HorizontalScrollButtonItem) => item.id.toString();
  const [activeButton, setActiveButton] = useState(activeId);

  const getActiveContainerStyle = useCallback(
    (id: number) => {
      return id === activeButton && !clearAllSelections
        ? { backgroundColor: Theme.color.primary200 }
        : {};
    },
    [activeButton, clearAllSelections]
  );

  const handleButtonPress = useCallback(
    id => () => {
      setActiveButton(id);
      onChange(id);
    },
    [onChange]
  );

  const renderItem = ({ item }: RenderItem) => {
    return (
      <Button
        testID={`hbsButton-${item.id}`}
        notBold
        notUppercase
        dottedOutline
        styleContainer={{
          ...styles.buttonMargin,
          ...getActiveContainerStyle(item.id)
        }}
        title={item.title}
        onPress={handleButtonPress(item.id)}
      />
    );
  };

  return (
    <FlatList
      testID={testID}
      scrollEnabled
      horizontal
      data={buttonItems}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      contentContainerStyle={style}
    />
  );
});
