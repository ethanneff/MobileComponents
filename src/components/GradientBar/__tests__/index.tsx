import React from "react";
import { renderWithProviders } from "../../../commons/Utils/TestUtils/react-testing-library";
import GradientBar from "..";

describe("GradientBar", () => {
  it("renders correctly", () => {
    const { getByTestId } = renderWithProviders(<GradientBar />);
    const gradientBar = getByTestId("gradientBar");
    const gradient = getByTestId("gradient");
    const animatedView = getByTestId("gradientBarAnimatedView");

    expect(gradientBar).toBeDefined();
    expect(gradient).toBeDefined();
    expect(animatedView).toBeDefined();
  });
});
