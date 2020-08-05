import React from "react";
import { act } from "react-test-renderer";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import { normalizedExerciseDefsArray } from "../example-data";
import WhatsNewCard from "../WhatsNewCard";

const level = 4;
const levelDescription = "New things to check out!";
const onPress = jest.fn();

describe("WhatsNewCard Component", () => {
  afterEach(() => {
    onPress.mockClear();
  });

  it("renders correctly", () => {
    const { tree } = testRender(
      <WhatsNewCard
        level={level}
        levelDescription={levelDescription}
        newExerciseDefs={normalizedExerciseDefsArray}
        onPress={onPress}
      />
    );
    const whatsNewCard = tree.root.findByProps({ testID: "whatsNewCard" });
    const cardTitleComp = whatsNewCard.props.children[0];
    expect(cardTitleComp.props.title).toBe(`Level ${level}`);
    expect(
      tree.root.findByProps({ testID: "levelDescription" }).props.title
    ).toBe(levelDescription);
  });

  it("invokes onPress prop correctly when invoked from CardModalTitle", () => {
    const { tree } = testRender(
      <WhatsNewCard
        level={level}
        levelDescription={levelDescription}
        newExerciseDefs={normalizedExerciseDefsArray}
        onPress={onPress}
      />
    );
    const whatsNewCard = tree.root.findByProps({ testID: "whatsNewCard" });
    const cardTitleComp = whatsNewCard.props.children[0];
    act(() => {
      cardTitleComp.props.onPress();
    });
    expect(onPress).toHaveBeenCalled();
  });

  it("stops event propagation from escaping the cardOuterContainer", () => {
    const stopPropagation = jest.fn();
    const mockGestureResponderEvent = {
      stopPropagation
    };
    const { tree } = testRender(
      <WhatsNewCard
        level={level}
        levelDescription={levelDescription}
        newExerciseDefs={normalizedExerciseDefsArray}
        onPress={onPress}
      />
    );
    const cardOuterContainer = tree.root.findByProps({
      testID: "cardOuterContainer"
    });
    act(() => {
      cardOuterContainer.props.onPress(mockGestureResponderEvent);
    });
    expect(stopPropagation).toHaveBeenCalled();
  });

  it("does not render the level description if it is empty", () => {
    const { tree } = testRender(
      <WhatsNewCard
        level={level}
        levelDescription=""
        newExerciseDefs={normalizedExerciseDefsArray}
        onPress={onPress}
      />
    );
    const description = tree.root.findAllByProps({
      testID: "levelDescription"
    });
    expect(description).toHaveLength(0);
  });
});
