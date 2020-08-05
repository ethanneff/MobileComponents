import React from "react";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import { Controls } from "..";

describe(Controls, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const props = {
    handleIncrease: jest.fn(),
    handleDecrease: jest.fn()
  };

  it("renders correctly", () => {
    const { findById } = testRender(<Controls {...props} />);
    const buttonDifficultyUp = findById("buttonDifficultyUp");
    const buttonDifficultyDown = findById("buttonDifficultyDown");
    const label = findById("label");
    expect(buttonDifficultyUp).toBeTruthy();
    expect(buttonDifficultyDown).toBeTruthy();
    expect(label).toBeTruthy();
  });

  it("calls handleIncrease when pressing the up button", () => {
    const { handleIncrease } = props;
    const { press } = testRender(<Controls {...props} />);

    press("buttonDifficultyUp");

    expect(handleIncrease.mock.calls.length).toBe(1);
  });

  it("calls handleDecrease when pressing the down button", () => {
    const { handleDecrease } = props;
    const { press } = testRender(<Controls {...props} />);

    press("buttonDifficultyDown");

    expect(handleDecrease.mock.calls.length).toBe(1);
  });
});
