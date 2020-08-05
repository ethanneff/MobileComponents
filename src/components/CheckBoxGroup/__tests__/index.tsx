import React from "react";
import { cleanup, fireEvent } from "@testing-library/react-native";
import { renderWithProviders } from "../../../commons/Utils/TestUtils/react-testing-library";
import CheckBoxGroup, { CheckBoxGroupOption } from "..";

const checkBoxOptions: CheckBoxGroupOption[] = [
  {
    title: "S",
    value: "0",
    checked: false
  },
  {
    title: "M",
    value: "1",
    checked: false
  },
  {
    title: "T",
    value: "2",
    checked: false
  }
];

const onChangeMock = jest.fn();

describe("<CheckBoxGroup />", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId, getAllByTestId } = renderWithProviders(
      <CheckBoxGroup
        options={checkBoxOptions}
        onChange={onChangeMock}
        testID="checkboxGroupContainer"
      />
    );
    const checkboxGroup = getByTestId("checkboxGroupContainer");
    const checkboxes = getAllByTestId("checkboxTouchable");

    expect(checkboxGroup).toBeDefined();
    expect(checkboxes).toHaveLength(3);
  });

  it("calls passed onChange function when a checkbox is pressed with correct updated options", () => {
    const { getAllByTestId } = renderWithProviders(
      <CheckBoxGroup
        options={checkBoxOptions}
        onChange={onChangeMock}
        testID="checkboxGroupContainer"
      />
    );
    const checkboxes = getAllByTestId("checkboxTouchable");
    fireEvent.press(checkboxes[0]);
    expect(onChangeMock).toHaveBeenCalledWith([
      {
        title: "S",
        value: "0",
        checked: true
      },
      {
        title: "M",
        value: "1",
        checked: false
      },
      {
        title: "T",
        value: "2",
        checked: false
      }
    ]);

    fireEvent.press(checkboxes[1]);
    expect(onChangeMock).toHaveBeenCalledWith([
      {
        title: "S",
        value: "0",
        checked: false
      },
      {
        title: "M",
        value: "1",
        checked: true
      },
      {
        title: "T",
        value: "2",
        checked: false
      }
    ]);

    fireEvent.press(checkboxes[2]);
    expect(onChangeMock).toHaveBeenCalledWith([
      {
        title: "S",
        value: "0",
        checked: false
      },
      {
        title: "M",
        value: "1",
        checked: false
      },
      {
        title: "T",
        value: "2",
        checked: true
      }
    ]);
  });
});
