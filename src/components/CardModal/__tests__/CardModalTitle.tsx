import React from "react";
import renderer, { act } from "react-test-renderer";
import Theme from "../../../commons/Theme";
import CardModalTitle from "../CardModalTitle";

const title = "Setup";

describe("CardModalTitle Component", () => {
  it("renders correctly without gradient and no optional props", () => {
    const tree = renderer.create(
      <CardModalTitle gradient={false} title={title} />
    );
    const gradients = tree.root.findAllByProps({ testID: "cardGradient" });
    expect(gradients).toHaveLength(0);
    expect(tree.root.findByProps({ testID: "cardTitle" }).props.title).toBe(
      title
    );
    expect(tree.root.findByProps({ testID: "captionTitle" }).props.title).toBe(
      ""
    );
  });

  it("renders titleCaption correctly when provided", () => {
    const titleCaption = "3 Min";
    const tree = renderer.create(
      <CardModalTitle
        gradient={false}
        title={title}
        titleCaption={titleCaption}
      />
    );
    const gradients = tree.root.findAllByProps({ testID: "cardGradient" });
    expect(gradients).toHaveLength(0);
    expect(tree.root.findByProps({ testID: "cardTitle" }).props.title).toBe(
      title
    );
    expect(tree.root.findByProps({ testID: "captionTitle" }).props.title).toBe(
      titleCaption
    );
  });

  it("renders correctly the default gradient and no optional props", () => {
    const defaultGradient = Theme.gradients.ftuSensorSetupDone;
    const tree = renderer.create(
      <CardModalTitle gradient={true} title={title} />
    );
    const cardGradientProps = tree.root.findByProps({ testID: "cardGradient" })
      .props;
    expect(cardGradientProps.colors).toEqual(defaultGradient.colors);
    expect(cardGradientProps.start).toEqual(defaultGradient.start);
    expect(cardGradientProps.end).toEqual(defaultGradient.end);
  });

  it("renders specified gradient correctly", () => {
    const gradientProps = Theme.gradients.levelUpCard;
    const tree = renderer.create(
      <CardModalTitle
        gradient={true}
        gradientProps={gradientProps}
        title={title}
      />
    );
    const cardGradientProps = tree.root.findByProps({ testID: "cardGradient" })
      .props;
    expect(cardGradientProps.colors).toEqual(
      Theme.gradients.levelUpCard.colors
    );
    expect(cardGradientProps.start).toEqual(gradientProps.start);
    expect(cardGradientProps.end).toEqual(gradientProps.end);
  });

  it("renders close button when onPress prop is provided", () => {
    const onPress = jest.fn();
    const tree = renderer.create(
      <CardModalTitle gradient={false} title={title} onPress={onPress} />
    );
    const closeButton = tree.root.findByProps({ testID: "closeButton" });
    expect(closeButton).toBeTruthy();
  });

  it("invokes onPress prop when close button is pressed", () => {
    const onPress = jest.fn();
    const tree = renderer.create(
      <CardModalTitle gradient={false} title={title} onPress={onPress} />
    );
    const closeButton = tree.root.findByProps({ testID: "closeButton" });
    act(() => {
      closeButton.props.onPress();
    });
    expect(onPress).toHaveBeenCalled();
  });
});
