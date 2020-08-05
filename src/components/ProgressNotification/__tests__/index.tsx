import React from "react";
import { ReactTestRenderer, act } from "react-test-renderer";
import ProgressNotification, { getLevelDescriptionByStream } from "..";
import {
  ExerciseDifficultyStream,
  LevelDescription
} from "../../../commons/Models";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import { normalizedExerciseDefsArray } from "../example-data";

jest.useFakeTimers();

const leveledUpWhatsNewProps = {
  currentUserLevel: 2,
  levelDescription: "Awesome Level 2",
  upgradedLevel: true,
  whatsNewEnabled: true
};
const leveledUpBannerProps = {
  delay: 0,
  newPoints: 120,
  initialLevel: 1,
  currentPoints: 900,
  totalPoints: 1000,
  nextCurrentPoints: 100,
  nextTotalPoints: 1200
};
const leveledUpProgressNotificationProps = {
  ...leveledUpWhatsNewProps,
  ...leveledUpBannerProps
};

const noLevelUpWhatsNewProps = {
  currentUserLevel: 1,
  levelDescription: "Awesome Level 1",
  upgradedLevel: false,
  whatsNewEnabled: false
};
const noLevelUpBannerProps = {
  delay: 0,
  newPoints: 80,
  initialLevel: 1,
  currentPoints: 900,
  totalPoints: 1000,
  nextCurrentPoints: 100,
  nextTotalPoints: 1200
};
const noLevelUpProgressNotificationProps = {
  ...noLevelUpWhatsNewProps,
  ...noLevelUpBannerProps
};

describe("ProgressNotification", () => {
  let tree: ReactTestRenderer;
  const onEndCallbackSpy = jest.fn();

  afterEach(() => {
    onEndCallbackSpy.mockClear();
    tree.unmount();
  });

  it("renders correctly with defaults", () => {
    const ctx = testRender(
      <ProgressNotification
        {...noLevelUpProgressNotificationProps}
        newExerciseDefs={normalizedExerciseDefsArray}
        onEnd={onEndCallbackSpy}
      />
    );
    tree = ctx.tree;
    const progressBannerContainer = tree.root.findByProps({
      testID: "progressBannerContainer"
    });
    const progressOverlay = tree.root.findByProps({
      testID: "progressOverlay"
    });
    expect(progressBannerContainer).toBeTruthy();
    expect(progressOverlay).toBeTruthy();
  });

  it("invokes the onEnd callback when the background or banner is pressed", () => {
    expect.assertions(1);
    const ctx = testRender(
      <ProgressNotification
        {...noLevelUpProgressNotificationProps}
        newExerciseDefs={normalizedExerciseDefsArray}
        onEnd={onEndCallbackSpy}
      />
    );
    tree = ctx.tree;

    const button = tree.root.findByProps({
      testID: "progressNotification"
    });
    act(() => {
      button.props.onPress();
    });
    expect(onEndCallbackSpy).toHaveBeenCalled();
  });

  it("renders WhatsNewCard when user has unlocked a new level", () => {
    expect.assertions(2);
    const renderCtx = testRender(
      <ProgressNotification
        {...leveledUpProgressNotificationProps}
        newExerciseDefs={normalizedExerciseDefsArray}
        onEnd={onEndCallbackSpy}
      />
    );
    tree = renderCtx.tree;

    const whatsNewCardContainers = tree.root.findAllByProps({
      testID: "whatsNewCardContainer"
    });
    expect(whatsNewCardContainers).toHaveLength(0);

    const progressBannerProps = tree.root.findByProps({
      testID: "progressBanner"
    }).parent!.props;
    act(() => {
      progressBannerProps.onPadlockAnimationFinish();
    });
    act(() => {
      jest.runAllTimers();
    });

    const whatsNewCardContainer = tree.root.findByProps({
      testID: "whatsNewCardContainer"
    });
    expect(whatsNewCardContainer).toBeTruthy();
  });
});

describe("getLevelDescriptionByStream", () => {
  const levelDescription: LevelDescription = {
    low: "welcome to the lowness",
    medium: "welcome to medium land",
    high: "welcome to all the high fives"
  };

  it("returns the correct string on low difficulty stream", () => {
    const difficultyStream = ExerciseDifficultyStream.LowActivity;
    const result = getLevelDescriptionByStream(
      difficultyStream,
      levelDescription
    );
    expect(result).toBe("welcome to the lowness");
  });

  it("returns the correct string on medium difficulty stream", () => {
    const difficultyStream = ExerciseDifficultyStream.MediumActivity;
    const result = getLevelDescriptionByStream(
      difficultyStream,
      levelDescription
    );
    expect(result).toBe("welcome to medium land");
  });

  it("returns the correct string on high difficulty stream", () => {
    const difficultyStream = ExerciseDifficultyStream.HighActivity;
    const result = getLevelDescriptionByStream(
      difficultyStream,
      levelDescription
    );
    expect(result).toBe("welcome to all the high fives");
  });

  it("returns undefined when difficulty stream is not provided", () => {
    const difficultyStream = undefined;
    const result = getLevelDescriptionByStream(
      difficultyStream,
      levelDescription
    );
    expect(result).toBeUndefined();
  });
});
