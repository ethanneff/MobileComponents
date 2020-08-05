import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { getAppStatus } from "../../commons/Store/App";
import { useRootSelector } from "../../commons/Store/selectors";
import Theme, { colorWithOpacity } from "../../commons/Theme";
import { getDeviceSize } from "../../commons/Utils/DeviceInfo";
import Text from "../../components/Text";
import ActionSheetOption, {
  actionSheetOptionHeight
} from "./ActionSheetOption";

const deviceSize = getDeviceSize();
const screenPercentage =
  deviceSize === "tablet" ? 0.35 : deviceSize === "mobile" ? 0.45 : 0.55;
const { height: screenHeight } = Dimensions.get("window");
const actionSheetMaxHeight = screenHeight * screenPercentage;

const titleBorderWidth = 1;
const titlePaddingVertical = Theme.padding.p6;
const heightOfTitleTextElement = Theme.fontSize.h4.lineHeight;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row"
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colorWithOpacity(Theme.color.neutral900, 0.4)
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: Theme.color.neutral0
  },
  titleContainer: {
    borderBottomColor: Theme.color.lineSpacer,
    borderBottomWidth: titleBorderWidth,
    paddingVertical: titlePaddingVertical,
    alignItems: "center",
    justifyContent: "center"
  },
  optionsContainer: {
    maxHeight: actionSheetMaxHeight
  }
});

const getInitialScrollIndex = (currentIndex: number): number => {
  const listTitleHeight =
    titleBorderWidth + titlePaddingVertical * 2 + heightOfTitleTextElement;
  const numOfOptionsInView = Math.ceil(
    (actionSheetMaxHeight - listTitleHeight) / actionSheetOptionHeight
  );
  const numOfUnselectedOptions = numOfOptionsInView - 1;
  const numOfOptionsAboveCurrentIndex = Math.floor(numOfUnselectedOptions / 2);
  return currentIndex - numOfOptionsAboveCurrentIndex;
};

export interface ActionSheetListItem {
  title: string;
  id: number;
  disabled?: boolean;
  level?: number | null | undefined;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
}

interface RenderItem {
  item: ActionSheetListItem;
  index: number;
}

interface Props {
  cancelButtonText?: string;
  currentIndex?: number;
  options: ActionSheetListItem[];
  title: string;
  testID?: string;
  visible: boolean;
  onPress(index: number): void;
  highlightSelected?: boolean;
}

export default memo(function ActionSheet({
  currentIndex,
  title,
  options,
  cancelButtonText = "",
  testID,
  visible,
  onPress,
  highlightSelected
}: Props) {
  const [sheetAnimation] = useState(new Animated.Value(screenHeight));
  const list = useRef<FlatList<ActionSheetListItem>>(null);
  const appStatus = useRootSelector(getAppStatus);
  const initialScrollIndex =
    currentIndex && getInitialScrollIndex(currentIndex);

  const getItemLayout = (
    _: ActionSheetListItem[] | null | undefined,
    index: number
  ) => ({
    length: actionSheetOptionHeight,
    offset:
      deviceSize === "tablet"
        ? actionSheetOptionHeight * index +
          actionSheetOptionHeight * Theme.percents.p25
        : actionSheetOptionHeight * index,
    index
  });

  const showSheet = useCallback(() => {
    Animated.timing(sheetAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease)
    }).start();
  }, [sheetAnimation]);

  const hideSheet = useCallback(
    (index: number) => {
      Animated.timing(sheetAnimation, {
        toValue: screenHeight,
        useNativeDriver: true,
        duration: 200
      }).start(() => {
        onPress(index);
      });
    },
    [onPress, sheetAnimation]
  );

  const cancel = useCallback(() => {
    hideSheet(-1);
  }, [hideSheet]);

  const keyExtractor = (item: ActionSheetListItem) => String(item.id);

  const renderItem = ({ item, index }: RenderItem) => {
    const selected = highlightSelected && currentIndex === index;
    const handleOptionOnPress = () => hideSheet(index);
    return (
      <ActionSheetOption
        actionSheetListItem={item}
        index={index}
        onPress={handleOptionOnPress}
        selected={selected}
      />
    );
  };

  const animatedViewStyles = [
    styles.body,
    {
      transform: [{ translateY: sheetAnimation }]
    }
  ];

  useEffect(() => {
    if (visible) {
      showSheet();
    }
  }, [visible, showSheet]);

  useEffect(() => {
    if (appStatus === "background" || appStatus === "inactive") {
      cancel();
    }
  }, [appStatus, cancel]);

  const showCancelButton = Boolean(cancelButtonText);
  const cancelButtonItem = {
    title: cancelButtonText,
    id: -1
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={cancel}
    >
      <SafeAreaView style={styles.wrapper} testID={testID}>
        <TouchableWithoutFeedback onPress={cancel} testID="overlayButton">
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <Animated.View style={animatedViewStyles}>
          <View style={styles.optionsContainer}>
            <View style={styles.titleContainer}>
              <Text center h4 title={title} testID="title" />
            </View>
            <FlatList
              testID="optionsList"
              data={options}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              scrollEnabled={true}
              bounces={false}
              getItemLayout={getItemLayout}
              initialScrollIndex={initialScrollIndex}
              ref={list}
            />
          </View>
          {showCancelButton && (
            <ActionSheetOption
              actionSheetListItem={cancelButtonItem}
              index={-1}
              onPress={cancel}
            />
          )}
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
});
