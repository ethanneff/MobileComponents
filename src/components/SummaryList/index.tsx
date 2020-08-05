import React from "react";
import { FlatList, StyleSheet, View, ViewStyle } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import Text from "../Text";
import { OutlineFadeIcon } from "./OutlineFadeIcon";

function getStyle(index: number, itemsLength: number, isTablet: boolean) {
  const isLastItem = index === itemsLength - 1;
  const paddingBottom = isLastItem
    ? 0
    : isTablet
    ? Theme.padding.p6
    : Theme.padding.p4;
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingBottom
    },
    title: {
      paddingLeft: Theme.padding.p4,
      flexShrink: 1
    }
  });
  return styles;
}

export interface SummaryListItem {
  title: string;
  count: number;
}

interface Props {
  items: ReadonlyArray<SummaryListItem>;
  currentIndex?: number;
  style?: ViewStyle | {};
}

interface RenderItem {
  item: SummaryListItem;
  index: number;
}

const SummaryList: React.FC<Props> = props => {
  const isTablet = DeviceInfo.isTablet();
  const { items, currentIndex = 0, style } = props;
  const renderSummaryList = ({ item, index }: RenderItem) => {
    if (items.length === 0) {
      return null;
    }

    let total = 0;
    for (let i = 0; i <= index; i++) {
      total += items[i].count;
    }
    const showIcon = currentIndex >= total;
    const { title } = item;
    const styles = getStyle(index, items.length, isTablet);
    return (
      <View style={styles.container}>
        <OutlineFadeIcon showIcon={showIcon} index={index} />
        <Text h4 numberOfLines={2} title={title} style={styles.title} />
      </View>
    );
  };

  return (
    <View style={style}>
      <FlatList
        data={items}
        keyExtractor={item => item.title}
        renderItem={renderSummaryList}
      />
    </View>
  );
};

export default SummaryList;
