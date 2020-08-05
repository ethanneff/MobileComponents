import React, { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Errors from "../../commons/Errors";
import { strings } from "../../commons/Locales";
import { ExerciseDefinition } from "../../commons/Models";
import {
  getAssets,
  isSupportedExerciseKey
} from "../../commons/Physio/SupportedExercises";
import { NormalizedObject } from "../../commons/Store/interfaces";
import Theme from "../../commons/Theme";
import ErrorView from "../../components/ErrorView";
import Text from "../../components/Text";
import Image from "../../components/Image";
import { useRootSelector } from "../../commons/Store/selectors";
import { getIndicationFromCurrentEtSession } from "../../commons/Store/Indication";
import Sentry from "../../commons/Sentry";

interface Props {
  exerciseDefinition: NormalizedObject<ExerciseDefinition>;
  containerStyles: ViewStyle;
}

export default memo(function WhatsNewExercise({
  exerciseDefinition,
  containerStyles
}: Props) {
  const styles = StyleSheet.create({
    container: containerStyles || {},
    imageContainer: {
      backgroundColor: Theme.color.neutral50,
      marginBottom: Theme.padding.p2,
      justifyContent: "center",
      alignItems: "center"
    },
    image: {
      height: Theme.sizing.exerciseThumbnail,
      width: Theme.sizing.exerciseThumbnail,
      resizeMode: "contain"
    }
  });
  const indication = useRootSelector(getIndicationFromCurrentEtSession);

  if (!isSupportedExerciseKey(exerciseDefinition.routine)) {
    return <ErrorView error={new Error(Errors.UNSUPPORTED_EXERCISE)} />;
  }
  if (!indication) {
    Sentry.error(new Error(Errors.INDICATION_NOT_FOUND), {
      exerciseDefinition
    });
    return null;
  }

  const thumbnailSource = getAssets(indication.name, exerciseDefinition.routine)
    .imagePreview;

  const routineName = strings(`exercises.${exerciseDefinition.routine}.title`);

  return (
    <View style={styles.container} testID="whatsNewExerciseContainer">
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={thumbnailSource}
          testID="whatsNewExerciseThumbnail"
        />
      </View>
      <Text caption title={routineName} testID="whatsNewExerciseTitle" />
    </View>
  );
});
