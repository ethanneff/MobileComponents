import React, { useCallback, useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import DeviceInfo from "react-native-device-info";
import {
  ExerciseDefinition,
  ExerciseDifficultyStream,
  LevelDescription
} from "../../commons/Models";
import { NormalizedObject } from "../../commons/Store";
import Theme from "../../commons/Theme";
import ProgressBanner from "./ProgressBanner";
import WhatsNewCard from "./WhatsNewCard";

interface Props {
  delay: number;
  newPoints: number;
  initialLevel: number;
  currentPoints: number;
  totalPoints: number;
  nextCurrentPoints: number;
  nextTotalPoints: number;
  currentUserLevel: number;
  levelDescription: string;
  upgradedLevel: boolean;
  whatsNewEnabled: boolean;
  newExerciseDefs: ReadonlyArray<NormalizedObject<ExerciseDefinition>>;
  onEnd(): void;
}

const window = Dimensions.get("window");
const isTablet = DeviceInfo.isTablet();
const safeViewBuffer = Theme.padding.p15;
const progressBannerHeight = isTablet ? Theme.padding.p50 : Theme.padding.p35;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: window.height,
    width: window.width,
    zIndex: 5,
    elevation: 5,
    backgroundColor: Theme.color.overlay
  },
  progressBannerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 6,
    elevation: 6
  },
  backgroundContainer: {
    flex: 1
  }
});

export function getLevelDescriptionByStream(
  exerciseDifficultyStream: ExerciseDifficultyStream | undefined,
  levelDescription: LevelDescription
): string | undefined {
  const { low, medium, high } = levelDescription;
  if (exerciseDifficultyStream === ExerciseDifficultyStream.LowActivity) {
    return low;
  }
  if (exerciseDifficultyStream === ExerciseDifficultyStream.MediumActivity) {
    return medium;
  }
  if (exerciseDifficultyStream === ExerciseDifficultyStream.HighActivity) {
    return high;
  }
  return undefined;
}

export default function ProgressNotification({
  delay,
  newPoints,
  initialLevel,
  currentPoints,
  totalPoints,
  nextCurrentPoints,
  nextTotalPoints,
  currentUserLevel,
  levelDescription,
  upgradedLevel,
  whatsNewEnabled,
  newExerciseDefs,
  onEnd
}: Props) {
  const [move] = useState(new Animated.Value(0));
  const [fade] = useState(new Animated.Value(0));
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const transitionTime = upgradedLevel
    ? Theme.delay.levelUp
    : Theme.delay.autoDismiss;

  const getMoveStyle = useCallback(
    () => ({
      transform: [
        {
          translateY: move.interpolate({
            inputRange: [0, 1],
            outputRange: [-(progressBannerHeight + safeViewBuffer), 0]
          })
        }
      ]
    }),
    [move]
  );

  const getFadeStyle = useCallback(
    () => ({
      opacity: fade
    }),
    [fade]
  );

  const handleEnd = useCallback(() => {
    if (whatsNewEnabled) {
      Animated.timing(move, {
        toValue: 0,
        duration: Theme.delay.easeOut,
        useNativeDriver: true
      }).start();
      return;
    }

    Animated.parallel([
      Animated.timing(move, {
        toValue: 0,
        duration: Theme.delay.easeOut,
        useNativeDriver: true
      }),
      Animated.timing(fade, {
        toValue: 0,
        duration: Theme.delay.fadeOut,
        useNativeDriver: true
      })
    ]).start(onEnd);
  }, [onEnd, move, fade, whatsNewEnabled]);

  const handleOnPadlockAnimationFinish = () => {
    setShowWhatsNew(true);
  };

  useEffect(() => {
    move.setValue(0);
    fade.setValue(0);
    Animated.parallel([
      Animated.timing(move, {
        toValue: 1,
        duration: Theme.delay.easeIn,
        useNativeDriver: true
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: Theme.delay.fadeIn,
        useNativeDriver: true
      })
    ]).start();
  }, [move, fade]);

  useEffect(() => {
    const noUserInputTimer = setTimeout(() => handleEnd(), transitionTime);
    return () => clearTimeout(noUserInputTimer);
  }, [handleEnd, transitionTime]);

  return (
    <TouchableWithoutFeedback onPress={onEnd} testID="progressNotification">
      <View style={styles.backgroundContainer}>
        <Animated.View
          style={[styles.container, getFadeStyle()]}
          testID="progressOverlay"
        />
        <Animated.View
          style={[styles.progressBannerContainer, getMoveStyle()]}
          testID="progressBannerContainer"
        >
          <ProgressBanner
            delay={delay}
            upgradedLevel={upgradedLevel}
            newPoints={newPoints}
            initialLevel={initialLevel}
            currentPoints={currentPoints}
            totalPoints={totalPoints}
            nextCurrentPoints={nextCurrentPoints}
            nextTotalPoints={nextTotalPoints}
            whatsNewEnabled={whatsNewEnabled}
            height={progressBannerHeight}
            onPadlockAnimationFinish={handleOnPadlockAnimationFinish}
          />
        </Animated.View>
        {showWhatsNew && (
          <WhatsNewCard
            level={currentUserLevel}
            levelDescription={levelDescription}
            newExerciseDefs={newExerciseDefs}
            onPress={onEnd}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
