import React from "react";
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import SummaryList, { SummaryListItem } from "../SummaryList";
import { Card } from "./Card";

const window = Dimensions.get("window");
const isTablet = DeviceInfo.isTablet();

interface Props {
  gradient?: boolean;
  title: string;
  titleCaption: string;
  summaryItems: SummaryListItem[];
  completedItemsCount?: number;
  onBackgroundPress?(): void;
  onPress?(): void;
}

const styles = StyleSheet.create({
  screenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    height: window.height,
    width: window.width,
    paddingHorizontal: isTablet ? undefined : Theme.padding.p4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.color.overlay,
    zIndex: 6,
    elevation: 6
  },
  summaryList: {
    paddingHorizontal: isTablet ? Theme.padding.p8 : Theme.padding.p6,
    paddingTop: Theme.padding.p6
  }
});

export function CardModal({
  gradient = false,
  onBackgroundPress,
  onPress,
  title,
  titleCaption,
  summaryItems,
  completedItemsCount = 0
}: Props) {
  const preventEventPropagation = (event: GestureResponderEvent) =>
    event.stopPropagation();

  return (
    <TouchableWithoutFeedback
      onPress={onBackgroundPress}
      testID="cardModalNegativeSpace"
    >
      <View style={styles.screenContainer}>
        <TouchableWithoutFeedback
          onPress={preventEventPropagation}
          testID="cardModalContainer"
        >
          <Card
            gradient={gradient}
            onPress={onPress}
            title={title}
            titleCaption={titleCaption}
            buttonTitle={strings("buttonText.continue")}
          >
            <SummaryList
              items={summaryItems}
              currentIndex={completedItemsCount}
              style={styles.summaryList}
            />
          </Card>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}
