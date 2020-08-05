import React from "react";
import { Image } from "react-native";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import { normalizedExerciseDefsArray } from "../example-data";
import WhatsNewExercisesGrid from "../WhatsNewExercisesGrid";
import { prepareHipSessionAndExercise } from "../../../commons/Utils/TestUtils/hipExercises";
import { configureStore } from "../../../commons/Store";
import { HIP_FLEXOR_STRETCH } from "../../../example-data/exercise-definitions";

describe("<WhatsNewExercisesGrid />", () => {
  it("renders correctly", () => {
    const ctx = configureStore(false, false);
    prepareHipSessionAndExercise(ctx.store, HIP_FLEXOR_STRETCH);
    const { findAllByProps, findAllByType } = testRender(
      <WhatsNewExercisesGrid newExerciseDefs={normalizedExerciseDefsArray} />,
      ctx
    );
    const header = findAllByProps({ testID: "whatsNewExercisesHeader" });
    const grid = findAllByProps({ testID: "whatsNewExercisesGrid" });
    const newExercises = findAllByType(Image);

    expect(header).toBeTruthy();
    expect(grid).toBeTruthy();
    expect(newExercises).toHaveLength(2);
  });

  it("should not render if there are no new Exercises.", () => {
    const { findAllByProps, findAllByType } = testRender(
      <WhatsNewExercisesGrid newExerciseDefs={[]} />
    );
    const header = findAllByProps({ testID: "whatsNewExercisesHeader" });
    const grid = findAllByProps({ testID: "whatsNewExercisesGrid" });
    const newExercises = findAllByType(Image);
    expect(header).toHaveLength(0);
    expect(grid).toHaveLength(0);
    expect(newExercises).toHaveLength(0);
  });
});
