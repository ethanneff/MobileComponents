import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react-native";
import ActionSheetOption from "../ActionSheetOption";

const onPressMock = jest.fn();
const actionSheetListItem = {
  title: "Tiger King",
  id: 1
};

describe("<ActionSheetOptions>", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId } = render(
      <ActionSheetOption
        actionSheetListItem={actionSheetListItem}
        index={1}
        onPress={onPressMock}
      />
    );
    const option = getByTestId("option-1");
    const optionText = getByTestId("optionText-1");
    expect(option).toBeDefined();
    expect(optionText).toBeDefined();
  });

  it("calls the passed onPress method when an option is pressed", () => {
    const { getByTestId } = render(
      <ActionSheetOption
        actionSheetListItem={actionSheetListItem}
        index={1}
        onPress={onPressMock}
      />
    );
    const option = getByTestId("option-1");
    fireEvent.press(option);
    expect(onPressMock).toHaveBeenCalled();
  });

  it("onPress method is disabled when list item has disabled prop", () => {
    const mockListItem = {
      ...actionSheetListItem,
      disabled: true
    };
    const { getByTestId } = render(
      <ActionSheetOption
        actionSheetListItem={mockListItem}
        index={1}
        onPress={onPressMock}
      />
    );
    const option = getByTestId("option-1");
    fireEvent.press(option);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("renders an icon when iconName prop is present on actionSheetListItem", () => {
    const listItem = {
      ...actionSheetListItem,
      iconName: "lock-outline"
    };

    const { getByTestId } = render(
      <ActionSheetOption
        actionSheetListItem={listItem}
        index={1}
        onPress={onPressMock}
      />
    );
    const optionIcon = getByTestId("optionIcon-1");
    expect(optionIcon).toBeDefined();
  });
});
