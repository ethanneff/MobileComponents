import React, { memo } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { strings } from "../../commons/Locales";
import { ExerciseDefinition } from "../../commons/Models";
import { NormalizedObject } from "../../commons/Store";
import Theme from "../../commons/Theme";
import { getDeviceSize } from "../../commons/Utils/DeviceInfo";
import CardModalTitle from "../CardModal/CardModalTitle";
import Text from "../Text";
import ScrollView from "../ScrollView";
import WhatsNewExercisesGrid from "./WhatsNewExercisesGrid";

interface Props {
  level: number;
  levelDescription: string;
  newExerciseDefs: ReadonlyArray<NormalizedObject<ExerciseDefinition>>;
  onPress(): void;
}

const isTablet = DeviceInfo.isTablet();
const isSmallDevice = getDeviceSize() === "small";

export default memo(function WhatsNewCard({
  level,
  levelDescription,
  newExerciseDefs,
  onPress
}: Props) {
  const progressBannerHeight = isTablet ? Theme.padding.p50 : Theme.padding.p35;
  const gradientProps = Theme.gradients.levelUpCard;
  const showLevelDescription = levelDescription.length > 0;
  const styles = StyleSheet.create({
    outerContainer: {
      flex: 1,
      marginTop: progressBannerHeight + Theme.padding.p5,
      zIndex: 6,
      elevation: 6,
      paddingHorizontal: isTablet ? undefined : Theme.padding.p4
    },
    cardContainer: {
      backgroundColor: Theme.color.neutral0,
      width: isTablet ? "80%" : "100%",
      paddingBottom: Theme.padding.p6,
      alignSelf: "center",
      ...Theme.shadows.dropShadow
    },
    modalContainerRadius: {
      borderRadius: isTablet ? Theme.padding.p5 : Theme.padding.p3
    },
    modalTopBorderRadius: {
      // Workaround for RN Known issue: `overflow: hidden` removes shadows on IOS
      borderTopLeftRadius: isTablet ? Theme.padding.p5 : Theme.padding.p3,
      borderTopRightRadius: isTablet ? Theme.padding.p5 : Theme.padding.p3
    },
    scrollContainer: {
      maxHeight: isSmallDevice ? 280 : 500
    },
    textContainer: {
      width: "100%",
      paddingHorizontal: isTablet ? Theme.padding.p8 : Theme.padding.p4,
      alignSelf: "center",
      marginVertical: Theme.padding.p6
    },
    newLevelText: { marginTop: Theme.padding.p2 }
  });
  const cardContainerStyles = [
    styles.cardContainer,
    styles.modalContainerRadius
  ];

  const handleEventPropagation = (event: GestureResponderEvent) => {
    event.stopPropagation();
  };

  return (
    <View style={styles.outerContainer} testID="whatsNewCardContainer">
      <TouchableWithoutFeedback
        onPress={handleEventPropagation}
        testID="cardOuterContainer"
        style={styles.outerContainer}
      >
        <View style={cardContainerStyles} testID="whatsNewCard">
          <CardModalTitle
            gradient={true}
            gradientProps={gradientProps}
            title={`${strings("whatsNew.level")} ${level}`}
            style={styles.modalTopBorderRadius}
            onPress={onPress}
          />
          <ScrollView style={styles.scrollContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.textContainer}>
                {showLevelDescription && (
                  <>
                    <Text h4 title={strings("whatsNew.title")} />
                    <Text
                      caption
                      title={levelDescription}
                      style={styles.newLevelText}
                      testID="levelDescription"
                    />
                  </>
                )}
                <WhatsNewExercisesGrid newExerciseDefs={newExerciseDefs} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});
