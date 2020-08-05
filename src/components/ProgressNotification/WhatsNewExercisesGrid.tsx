import React, { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { strings } from "../../commons/Locales";
import { ExerciseDefinition } from "../../commons/Models";
import { NormalizedObject } from "../../commons/Store";
import Theme from "../../commons/Theme";
import Pill from "../Pill";
import Text from "../Text";
import WhatsNewExercise from "./WhatsNewExercise";

interface Props {
  newExerciseDefs: ReadonlyArray<NormalizedObject<ExerciseDefinition>>;
}

export default memo(function WhatsNewExercisesGrid({ newExerciseDefs }: Props) {
  const gridColumnCount = 3;

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: Theme.padding.p5,
      marginBottom: Theme.padding.p3
    },
    exercisesGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between"
    },
    gridItem: {
      flexBasis: "30%"
    }
  });

  const getFillerGridItems = useCallback(() => {
    const fillerGridItemCount =
      gridColumnCount - (newExerciseDefs.length % gridColumnCount);
    return Array(fillerGridItemCount).fill("");
  }, [gridColumnCount, newExerciseDefs]);

  const fillerGridItems = getFillerGridItems();

  if (newExerciseDefs.length === 0) {
    return null;
  }

  return (
    <>
      <View style={styles.header} testID="whatsNewExercisesHeader">
        <Text h4 title={strings("whatsNew.exercisesGridTitle")} />
        <Pill />
      </View>
      <View style={styles.exercisesGrid} testID="whatsNewExercisesGrid">
        {newExerciseDefs.map(exerciseDef => (
          <WhatsNewExercise
            key={exerciseDef.routine}
            exerciseDefinition={exerciseDef}
            containerStyles={styles.gridItem}
          />
        ))}
        {fillerGridItems.map((_, idx) => (
          <View key={`gridFiller-${idx}`} style={styles.gridItem} />
        ))}
      </View>
    </>
  );
});
