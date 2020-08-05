import React from "react";
import { cleanup, fireEvent } from "@testing-library/react-native";
import { renderWithProviders } from "../../../commons/Utils/TestUtils/react-testing-library";
import CheckBox from "..";

const onChangeMock = jest.fn();

describe("<CheckBox />", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId } = renderWithProviders(
      <CheckBox checked={false} title="Cool Checkbox" onChange={onChangeMock} />
    );

    const checkbox = getByTestId("checkbox");
    const title = getByTestId("checkboxTitle");

    expect(checkbox).toBeDefined();
    expect(title).toBeDefined();
  });

  it("renders nothing when hidden", () => {
    const { queryByTestId } = renderWithProviders(
      <CheckBox
        title="Cool Checkbox"
        checked={false}
        onChange={onChangeMock}
        testID="checkboxContainer"
        hidden
      />
    );

    const checkbox = queryByTestId("checkboxContainer");
    expect(checkbox).toBeNull();
  });

  it("renders icon when in checked state and title position is left or right", () => {
    const { getByTestId, rerender } = renderWithProviders(
      <CheckBox
        title="Cool Checkbox"
        onChange={onChangeMock}
        checked={true}
        titlePosition="left"
      />
    );

    const icon = getByTestId("checkboxIcon");
    expect(icon).toBeDefined();

    rerender(
      <CheckBox
        title="Cool Checkbox"
        onChange={onChangeMock}
        checked={true}
        titlePosition="right"
      />
    );
    expect(icon).toBeDefined();
  });

  it("does not render icon in checked state if title position is inside", () => {
    const { queryByTestId } = renderWithProviders(
      <CheckBox
        title="Cool Checkbox"
        onChange={onChangeMock}
        checked={true}
        titlePosition="inside"
      />
    );

    const icon = queryByTestId("checkboxIcon");
    expect(icon).toBeNull();
  });

  it("calls onChange prop when checkbox is pressed with correct values", () => {
    const { getByTestId } = renderWithProviders(
      <CheckBox
        title="Cool Checkbox"
        checked={false}
        onChange={onChangeMock}
        testID="checkboxTouchable"
      />
    );
    const checkbox = getByTestId("checkboxTouchable");
    fireEvent.press(checkbox);
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });
});
