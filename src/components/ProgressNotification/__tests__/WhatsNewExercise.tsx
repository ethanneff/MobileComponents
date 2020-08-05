import React from "react";
import { create } from "react-test-renderer";
import { strings } from "../../../commons/Locales";
import { ExerciseDefinition } from "../../../commons/Models";
import supportedExercises from "../../../commons/Physio/SupportedExercises";
import { NormalizedObject } from "../../../commons/Store/interfaces";
import Theme from "../../../commons/Theme";
import ErrorView from "../../ErrorView";
import { NORMALIZED_SIDE_LUNGE } from "../example-data";
import WhatsNewExercise from "../WhatsNewExercise";

jest.mock("../../../commons/Store/selectors", () => {
  return {
    useRootSelector: jest.fn(() => "hip")
  };
});

const UNSUPPORTED_EXERCISE: NormalizedObject<ExerciseDefinition> = {
  ...NORMALIZED_SIDE_LUNGE,
  routine: "unsupported-exercise"
};

describe("<WhatsNewExercise />", () => {
  it("renders correctly", () => {
    const routineName = strings(
      `exercises.${NORMALIZED_SIDE_LUNGE.routine}.title`
    );
    const thumbnailSrc = supportedExercises["side-lunge"].assets.imagePreview;

    const { root } = create(
      <WhatsNewExercise
        containerStyles={{ width: "30%" }}
        exerciseDefinition={NORMALIZED_SIDE_LUNGE}
      />
    );

    const routine = root.findByProps({
      testID: "whatsNewExerciseTitle"
    });

    const image = root.findByProps({
      testID: "whatsNewExerciseThumbnail"
    });

    expect(image.props.source).toEqual(thumbnailSrc);
    expect(routine.props.title).toEqual(routineName);
  });

  it("displays an error when an unsupported ExerciseDefinition is passed", () => {
    const { root } = create(
      <WhatsNewExercise
        containerStyles={{ width: "30%" }}
        exerciseDefinition={UNSUPPORTED_EXERCISE}
      />
    );

    const errorView = root.findAllByType(ErrorView);
    const routine = root.findAllByProps({
      testID: "whatsNewExerciseTitle"
    });

    const image = root.findAllByProps({
      testID: "whatsNewExerciseThumbnail"
    });

    expect(routine).toHaveLength(0);
    expect(image).toHaveLength(0);
    expect(errorView).toHaveLength(1);
  });

  it("accepts and uses passed in styles through containerStyles prop", () => {
    const containerStyles = {
      width: "50%",
      marginBottom: Theme.padding.p3
    };

    const { root } = create(
      <WhatsNewExercise
        exerciseDefinition={NORMALIZED_SIDE_LUNGE}
        containerStyles={containerStyles}
      />
    );

    const container = root.findByProps({ testID: "whatsNewExerciseContainer" });
    expect(container.props.style).toMatchObject(containerStyles);
  });
});
