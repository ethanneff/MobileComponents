import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Event, track } from "../../commons/Analytics";
import { useGuidanceAudio } from "../../commons/Hooks/useGuidanceAudio";
import { strings } from "../../commons/Locales";
import { setCurrentExerciseAsSkipped } from "../../commons/Store/ExerciseActivityState";
import { getCurrentExerciseDefinition } from "../../commons/Store/ExerciseDefinition/selectors";
import {
  useRootDispatch,
  useRootSelector
} from "../../commons/Store/selectors";
import { setCurrentEtSessionToSensorless } from "../../commons/Store/Session";
import { getIsCurrentEtSessionSensorless } from "../../commons/Store/Session/selectors";
import Theme from "../../commons/Theme";
import {
  DeviceStylesConfig,
  getDeviceSize
} from "../../commons/Utils/DeviceInfo";
import Button from "../../components/Button";
import Text from "../../components/Text";

const centerButtonStyles: DeviceStylesConfig = {
  tablet: {
    marginBottom: Theme.padding.p3,
    borderRadius: Theme.padding.p16,
    width: Theme.padding.p16,
    height: Theme.padding.p16
  },
  mobile: {
    marginBottom: Theme.padding.p3,
    borderRadius: Theme.padding.p14,
    width: Theme.padding.p14,
    height: Theme.padding.p14
  },
  small: {
    marginBottom: Theme.padding.p3,
    borderRadius: Theme.padding.p14,
    width: Theme.padding.p14,
    height: Theme.padding.p14
  }
};

const sideButtonStyles: DeviceStylesConfig = {
  tablet: {
    marginBottom: Theme.padding.p3,
    borderRadius: Theme.padding.p14,
    width: Theme.padding.p14,
    height: Theme.padding.p14
  },
  mobile: {
    marginBottom: Theme.padding.p3,
    borderRadius: Theme.padding.p12,
    width: Theme.padding.p12,
    height: Theme.padding.p12
  },
  small: {
    marginBottom: Theme.padding.p3,
    borderRadius: Theme.padding.p12,
    width: Theme.padding.p12,
    height: Theme.padding.p12
  }
};

const containerStyles: DeviceStylesConfig = {
  tablet: {
    paddingTop: Theme.padding.p20,
    paddingBottom: Theme.padding.p10
  },
  mobile: {
    paddingTop: Theme.padding.p9,
    paddingBottom: Theme.padding.p12
  },
  small: {
    paddingTop: Theme.padding.p9,
    paddingBottom: Theme.padding.p10
  }
};

interface Props {
  sensorfulToggle: boolean;
  testID?: string;
  restart(): void;
  restartInSensorlessMode(): void;
  resume?(): void;
  skip(): void;
}

export default memo(function PauseControls({
  sensorfulToggle,
  restart,
  resume,
  skip,
  restartInSensorlessMode,
  testID
}: Props) {
  const deviceSize = getDeviceSize();
  const navigation = useNavigation();
  const dispatch = useRootDispatch();
  const guidance = useGuidanceAudio();
  const currentExerciseDefinition = useRootSelector(
    getCurrentExerciseDefinition
  );
  const isCurrentEtSessionSensorful = !useRootSelector(
    getIsCurrentEtSessionSensorless
  );
  const shouldTransitionToSensorless =
    isCurrentEtSessionSensorful && !sensorfulToggle;

  const handleRestartInSensorlessMode = () => {
    track(Event.SwitchToSensorlessMidWorkoutButtonClicked, {
      "Current Page": "ET Activity",
      Exercise:
        currentExerciseDefinition === undefined
          ? "none"
          : currentExerciseDefinition.routine
    });
    restartInSensorlessMode();
  };

  const handleResume = () => {
    if (shouldTransitionToSensorless) {
      guidance.stop();
      handleRestartInSensorlessMode();
      return;
    }
    if (resume) {
      resume();
    }
    navigation.goBack();
  };

  const handleSkip = () => {
    guidance.stop();
    dispatch(setCurrentExerciseAsSkipped());
    skip();
    if (shouldTransitionToSensorless) {
      dispatch(setCurrentEtSessionToSensorless());
      return;
    }
  };

  const handleRestart = () => {
    guidance.stop();
    if (shouldTransitionToSensorless) {
      handleRestartInSensorlessMode();
      return;
    }
    restart();
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-end",
      ...containerStyles[deviceSize]
    },
    sideButton: sideButtonStyles[deviceSize],
    centerButton: centerButtonStyles[deviceSize],
    labelButton: {
      alignItems: "center",
      width: Theme.padding.p21,
      marginHorizontal: Theme.padding.p3
    }
  });

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.labelButton}>
        <Button
          outline
          testID="restart"
          icon="replay"
          onPress={handleRestart}
          styleContainer={styles.sideButton}
        />
        <Text title={strings("exerciseActivity.restart")} overline />
      </View>
      <View style={styles.labelButton}>
        <Button
          styleIconSize={Theme.padding.p8}
          testID="play"
          icon="play"
          onPress={handleResume}
          styleContainer={styles.centerButton}
        />
        <Text title={strings("exerciseActivity.resume")} overline />
      </View>
      <View style={styles.labelButton}>
        <Button
          outline
          testID="skip"
          icon="skip-next"
          onPress={handleSkip}
          styleContainer={styles.sideButton}
        />
        <Text title={strings("exerciseActivity.skip")} overline />
      </View>
    </View>
  );
});
