import React, { memo } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { getDeviceSize } from "../../commons/Utils/DeviceInfo";
import Theme from "../../commons/Theme";
import Icon from "../Icon";
import Text from "../Text";
import AppVersionItem from "./AppVersionItem";

interface Props {
  testID?: string;
  initialNumToRender?: number;
  style?: ViewStyle | {};
  items: ListItem[];
  topBorder?: boolean;
  bottomBorder?: boolean;
  hidden?: boolean;
  title?: string;
}

export interface ListItem {
  id: string;
  title: string;
  accessoryIcon?: boolean;
  description?: string;
  icon?: string;
  hidden?: boolean;
  subtitle?: string;
  disabled?: boolean;
  onPress?(): void;
}

interface RenderItem {
  item: ListItem;
  index: number;
}

export default memo(function List({
  title,
  items,
  style,
  hidden,
  testID,
  initialNumToRender = 10,
  topBorder,
  bottomBorder
}: Props) {
  const defaultAccessoryIcon = "chevron-right";
  const isTablet = DeviceInfo.isTablet();
  const iconSize = isTablet ? Theme.padding.p9 : Theme.padding.p6;
  const touchableActiveOpacity = Theme.sizing.activeOpacity;
  const isSmall = getDeviceSize() === "small";
  const styles = (index: number = 0) =>
    StyleSheet.create({
      listContainer: {
        backgroundColor: Theme.color.notificationBackground
      },
      list: {
        flex: 0,
        backgroundColor: Theme.color.neutral0
      },
      container: {
        marginHorizontal: Theme.sizing.margin,
        flexDirection: "row",
        borderColor: Theme.color.neutral100,
        borderBottomWidth: index === items.length - 1 && !bottomBorder ? 0 : 1,
        borderTopWidth: index === 0 && topBorder ? 1 : 0
      },
      sectionTitle: {
        paddingHorizontal: Theme.sizing.margin,
        paddingTop: isSmall ? Theme.padding.p6 : Theme.padding.p9,
        paddingBottom: isSmall ? Theme.padding.p3 : Theme.padding.p4
      },
      description: {
        color: Theme.color.neutral700
      },
      item: {
        flexDirection: "row",
        flex: 1,
        paddingVertical: isTablet ? Theme.padding.p5 : Theme.padding.p4
      },
      content: {
        flex: 1,
        justifyContent: "center",
        paddingRight: Theme.padding.p5
      },
      accessoryIcon: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
      }
    });
  const listStyles = [styles().list, style];
  const keyExtractor = (item: ListItem) => item.id;

  const renderItem = ({ item, index }: RenderItem) => {
    const {
      accessoryIcon,
      icon,
      subtitle,
      onPress,
      id,
      description,
      disabled
    } = item;
    const currentItemStyle = styles(index);
    return item.hidden ? null : (
      <View style={currentItemStyle.container}>
        {item.id === "version" ? (
          <AppVersionItem item={item} style={currentItemStyle.item} />
        ) : (
          <TouchableOpacity
            disabled={!onPress || disabled}
            onPress={onPress}
            testID={id}
            activeOpacity={touchableActiveOpacity}
            style={currentItemStyle.item}
          >
            <View style={currentItemStyle.content}>
              <Text h4 title={item.title} testID="listItemTitle" />
              <Text
                caption
                title={subtitle}
                hidden={!subtitle}
                testID="listItemSubtitle"
              />
            </View>
            <Text
              h4
              title={description}
              hidden={!description}
              style={currentItemStyle.description}
              testID="listItemDescription"
            />
            <Icon
              hidden={!accessoryIcon}
              name={icon || defaultAccessoryIcon}
              size={iconSize}
              color={Theme.color.neutral700}
              style={currentItemStyle.accessoryIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return hidden ? null : (
    <View style={styles().listContainer}>
      {title && items.length > 0 && (
        <Text body title={title} style={styles().sectionTitle} />
      )}
      <View style={listStyles}>
        <FlatList
          testID={testID}
          initialNumToRender={initialNumToRender}
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
});
