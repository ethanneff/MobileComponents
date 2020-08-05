import React, { memo, useState } from "react";
import { StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
import Errors from "../../commons/Errors";
import { strings } from "../../commons/Locales";
import {
  getAssets,
  isSupportedExerciseKey
} from "../../commons/Physio/SupportedExercises";
import Sentry from "../../commons/Sentry";
import { getCurrentExerciseDefinition } from "../../commons/Store/ExerciseDefinition/selectors";
import FeatureFlag from "../../commons/Store/FeatureFlags/components/FeatureFlag";
import {
  getExerciseOverline,
  getExercisePrefix,
  useRootSelector
} from "../../commons/Store/selectors";
import {
  getIsInFtuFlow,
  isNewFtuPersonalizationEnabled
} from "../../commons/Store/Session/selectors";
import Theme from "../../commons/Theme";
import {
  DeviceImageStylesConfig,
  getDeviceSize
} from "../../commons/Utils/DeviceInfo";
import Image from "../../components/Image";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import withAndroidBack, {
  AndroidBackInjectedProps,
  AndroidBackMode
} from "../../components/WithAndroidBack";
import EtToggle from "../EtToggle";
import ScrollView from "../ScrollView";
import { getIndicationFromCurrentEtSession } from "../../commons/Store/Indication/selectors";
import AudioFeedbackToggle from "./AudioFeedbackToggle";
import AudioGuidanceToggle from "./AudioGuidanceToggle";
import EndButton from "./EndButton";
import PauseControls from "./PauseControls";

interface ComponentProps {
  skip(): void;
  restart(): void;
  restartInSensorlessMode(): void;
  resume?(): void;
}

type Props = ComponentProps & AndroidBackInjectedProps;

const imageStyles: DeviceImageStylesConfig = {
  tablet: {
    width: 206,
    height: 206,
    marginTop: Theme.padding.p12,
    marginBottom: Theme.padding.p9
  },
  mobile: {
    width: 224,
    height: 224,
    marginTop: Theme.padding.p7,
    marginBottom: Theme.padding.p9
  },
  small: {
    width: 215,
    height: 215,
    marginBottom: Theme.padding.p5
  }
};

export const UnwrappedEtPauseBase = memo(function EtPauseBase({
  setNavigateHomeMode,
  restart,
  restartInSensorlessMode,
  resume,
  skip
}: Props) {
  setNavigateHomeMode(AndroidBackMode.ExerciseTherapyWithPointsDialog);
  const deviceSize = getDeviceSize();
  const isTablet = DeviceInfo.isTablet();
  const { isCurrentEtSessionSensorless } = useRootSelector(
    state => state.session
  );
  const currentExerciseDefinition = useRootSelector(
    getCurrentExerciseDefinition
  );
  const exerciseOverline = useRootSelector(getExerciseOverline);
  const exercisePrefix = useRootSelector(getExercisePrefix);
  const exerciseTitle = strings(`${exercisePrefix}.title`);
  const isInFTU = useRootSelector(getIsInFtuFlow);
  const indication = useRootSelector(getIndicationFromCurrentEtSession);

  const isNewFTUPersonalization = useRootSelector(
    isNewFtuPersonalizationEnabled
  );
  const showEndButton = !(isInFTU && isNewFTUPersonalization);
  const [sensorfulToggle, setSensorfulToggle] = useState(
    !isCurrentEtSessionSensorless
  );
  const onSensorfulToggle = () => setSensorfulToggle(state => !state);

  if (!currentExerciseDefinition) {
    Sentry.error(
      new Error(Errors.UNABLE_TO_FIND_CURRENT_EXERCISE_DEFINITION_FOR_ET_PAUSE)
    );
    return null;
  }

  if (!indication) {
    Sentry.error(new Error(Errors.INDICATION_NOT_FOUND), {
      currentExerciseDefinition
    });
    return null;
  }

  if (!isSupportedExerciseKey(currentExerciseDefinition.routine)) {
    Sentry.error(new Error(Errors.EXERCISE_IS_NOT_SUPPORTED_FOR_ET_PAUSE), {
      currentExerciseDefinition
    });
    return null;
  }

  const source = getAssets(indication.name, currentExerciseDefinition.routine)
    .imageRest;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: Theme.padding.p3
    },
    image: imageStyles[deviceSize],
    overlineText: {
      paddingBottom: Theme.padding.p1
    }
  });

  return (
    <Screen testID="etPauseScreen" isScroll={!isTablet}>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={isTablet}
        testID="scrollViewTablet"
      >
        <Image
          source={source}
          resizeMode="contain"
          style={styles.image}
          testID="pauseImage"
        />
        <Text
          center
          overline
          title={exerciseOverline}
          style={styles.overlineText}
          testID="etPauseOverline"
        />
        <Text center h2 title={exerciseTitle} testID="etPauseExercise" />
        <PauseControls
          sensorfulToggle={sensorfulToggle}
          restart={restart}
          restartInSensorlessMode={restartInSensorlessMode}
          resume={resume}
          skip={skip}
          testID="etPauseControls"
        />
      </ScrollView>

      <FeatureFlag flag="guidanceCues" value={true}>
        <AudioGuidanceToggle />
      </FeatureFlag>

      <AudioFeedbackToggle />
      {!isCurrentEtSessionSensorless && (
        <EtToggle
          title={strings("etPause.sensor")}
          value={sensorfulToggle}
          onValueChange={onSensorfulToggle}
          topBorder={true}
          testID="sensorToggle"
        />
      )}
      {showEndButton && <EndButton />}
    </Screen>
  );
});

export default withAndroidBack(UnwrappedEtPauseBase);
