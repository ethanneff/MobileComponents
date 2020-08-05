import { cleanup, fireEvent } from "@testing-library/react-native";
import React from "react";
import HorizontalButtonScroll, { HorizontalScrollButtonItem } from "..";
import Theme from "../../../commons/Theme";
import { renderWithProviders } from "../../../commons/Utils/TestUtils/react-testing-library";

const onChangeMock = jest.fn();

const buttonItems: HorizontalScrollButtonItem[] = [
  {
    title: "Froopyland",
    id: 0
  },
  {
    title: "Gazorpazorp",
    id: 1
  }
];

describe("HorizontalButtonScroll Component", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders the HorizontalButtonScroll element", () => {
    const { getByTestId } = renderWithProviders(
      <HorizontalButtonScroll
        onChange={onChangeMock}
        buttonItems={buttonItems}
      />
    );

    const horizontalBtnScrl = getByTestId("horizontalButtonScroll");

    expect(horizontalBtnScrl).toBeDefined();
  });

  it("calls onChange prop when button is pressed with correct value", () => {
    const { getByTestId } = renderWithProviders(
      <HorizontalButtonScroll
        onChange={onChangeMock}
        buttonItems={buttonItems}
      />
    );
    const firstButton = getByTestId("hbsButton-0");
    fireEvent.press(firstButton);
    expect(onChangeMock).toHaveBeenCalledWith(0);

    const secondButton = getByTestId("hbsButton-1");
    fireEvent.press(secondButton);
    expect(onChangeMock).toHaveBeenCalledWith(1);
  });

  it("highlights a button when it is active and clearAllSelections is falsy", () => {
    const { getByTestId } = renderWithProviders(
      <HorizontalButtonScroll
        onChange={onChangeMock}
        buttonItems={buttonItems}
      />
    );
    const firstButton = getByTestId("hbsButton-0");
    expect(firstButton.props.style[11].backgroundColor).toBeUndefined();
    fireEvent.press(firstButton);
    expect(onChangeMock).toHaveBeenCalledWith(0);
    expect(firstButton.props.style[11].backgroundColor).toBe(
      Theme.color.primary200
    );
  });

  it("removes all button highlights when clearAllSelections prop is true", () => {
    const { getByTestId } = renderWithProviders(
      <HorizontalButtonScroll
        onChange={onChangeMock}
        buttonItems={buttonItems}
        clearAllSelections={true}
      />
    );
    const firstButton = getByTestId("hbsButton-0");
    const secondButton = getByTestId("hbsButton-1");
    expect(firstButton.props.style[11].backgroundColor).toBeUndefined();
    expect(secondButton.props.style[11].backgroundColor).toBeUndefined();
    fireEvent.press(firstButton);
    fireEvent.press(secondButton);
    expect(firstButton.props.style[11].backgroundColor).toBeUndefined();
    expect(secondButton.props.style[11].backgroundColor).toBeUndefined();
  });
});
