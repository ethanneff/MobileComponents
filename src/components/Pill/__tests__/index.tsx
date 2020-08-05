import React from "react";
import { create } from "react-test-renderer";
import { strings } from "../../../commons/Locales";
import Theme from "../../../commons/Theme";
import Pill from "../index";

describe("<Pill />", () => {
  it("should render when passing no props with defaults", () => {
    const defaultText = strings("pill.new");
    const defaultGradient = Theme.gradients.levelUp.colors;
    const defaultBackgroundColor = Theme.color.neutral0;
    const { root } = create(<Pill />);
    const gradientComponent = root.findByProps({
      testID: "pillGradient"
    });
    const pillInner = root.findByProps({
      testID: "pillInner"
    });
    const textComponent = root.findByProps({
      testID: "pillText"
    });

    expect(gradientComponent.props.colors).toEqual(defaultGradient);
    expect(pillInner.props.style.backgroundColor).toEqual(
      defaultBackgroundColor
    );
    expect(textComponent.props.title).toEqual(defaultText);
  });

  it("should use the gradient when passed in", () => {
    const { root } = create(
      <Pill gradient={Theme.gradients.progress.colors} />
    );
    const gradientProp = root.props.gradient;
    const gradientComponent = root.findByProps({
      testID: "pillGradient"
    });

    expect(gradientProp).toEqual(Theme.gradients.progress.colors);
    expect(gradientComponent.props.colors).toEqual(
      Theme.gradients.progress.colors
    );
  });

  it("should use the background color when passed in", () => {
    const { root } = create(<Pill backgroundColor={Theme.color.brand} />);
    const backgroundColorProp = root.props.backgroundColor;
    const pillInner = root.findByProps({
      testID: "pillInner"
    });

    expect(backgroundColorProp).toEqual(Theme.color.brand);
    expect(pillInner.props.style.backgroundColor).toEqual(Theme.color.brand);
  });

  it("should render the text when passed in", () => {
    const pillText = "Sweet";
    const { root } = create(<Pill text={pillText} />);
    const textProp = root.props.text;
    const textComponent = root.findByProps({
      testID: "pillText"
    });

    expect(textProp).toEqual(pillText);
    expect(textComponent.props.title).toEqual(pillText);
  });
});
