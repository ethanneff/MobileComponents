import React from "react";
import { act, render } from "@testing-library/react-native";
import AnimateNumber from "../index";

jest.useFakeTimers();

describe("<AnimateNumber />", () => {
  it("renders correctly", () => {
    const { getByText, rerender } = render(
      <AnimateNumber value="300" testID="number" />
    );
    act(() => {
      jest.runAllTimers();
    });
    expect(getByText("300")).toBeDefined();

    rerender(<AnimateNumber value="350" testID="number" />);

    act(() => {
      jest.runAllTimers();
    });
    expect(getByText("350")).toBeDefined();
  });
});
