import { cleanup, fireEvent } from "@testing-library/react-native";
import React from "react";
import { act } from "@testing-library/react-hooks";
import ActionSheet from "..";
import { renderWithProviders } from "../../../commons/Utils/TestUtils/react-testing-library";
import { replaceState } from "../../../commons/Store/action";

const testOptions = [
  { title: "Yes", id: 0 },
  { title: "No", id: 1 },
  { title: "Maybe", id: 2 }
];

const onPressMock = jest.fn();

describe("example", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    cleanup();
  });

  it("renders correctly", () => {
    const { getByTestId, getByText } = renderWithProviders(
      <ActionSheet
        title="Sweet stinky sheet"
        cancelButtonText="cancel"
        options={testOptions}
        visible={true}
        onPress={onPressMock}
      />
    );
    const title = getByTestId("title");
    const yesOption = getByText("Yes");
    const noOption = getByText("No");
    const maybeOption = getByText("Maybe");
    const cancelButton = getByText("CANCEL");
    const overlay = getByTestId("overlayButton");

    expect(title).toBeDefined();
    expect(yesOption).toBeDefined();
    expect(noOption).toBeDefined();
    expect(maybeOption).toBeDefined();
    expect(cancelButton).toBeDefined();
    expect(overlay).toBeDefined();
  });

  it("calls the passed onPress prop with correct value when an option is pressed", () => {
    const { getByTestId } = renderWithProviders(
      <ActionSheet
        title="Sweet stinky sheet"
        cancelButtonText="Cancel"
        options={testOptions}
        visible={true}
        onPress={onPressMock}
      />
    );
    const firstOption = getByTestId("option-0");
    const secondOption = getByTestId("option-1");
    fireEvent.press(firstOption);
    jest.runAllTimers();
    expect(onPressMock).toHaveBeenCalledWith(0);
    fireEvent.press(secondOption);
    jest.runAllTimers();
    expect(onPressMock).toHaveBeenCalledWith(1);
  });

  it("calls the passed onPress prop with correct value when the cancel button is pressed", () => {
    const { getByTestId } = renderWithProviders(
      <ActionSheet
        title="Sweet stinky sheet"
        cancelButtonText="Cancel"
        options={testOptions}
        visible={true}
        onPress={onPressMock}
      />
    );
    const cancelButton = getByTestId("cancel");
    fireEvent.press(cancelButton);
    jest.runAllTimers();
    expect(onPressMock).toHaveBeenCalledWith(-1);
  });

  it("calls the passed onPress prop with correct value when the app is backgrounded or inactive", async () => {
    const { store } = renderWithProviders(
      <ActionSheet
        title="Sweet stinky sheet"
        cancelButtonText="Cancel"
        options={testOptions}
        visible={true}
        onPress={onPressMock}
      />
    );
    jest.runAllTimers();

    act(() => {
      store.dispatch(
        replaceState({
          app: {
            ...store.getState().app,
            status: "background"
          }
        })
      );
    });
    jest.runAllTimers();

    expect(onPressMock).toHaveBeenCalledWith(-1);

    act(() => {
      store.dispatch(
        replaceState({
          app: {
            ...store.getState().app,
            status: "inactive"
          }
        })
      );
    });
    jest.runAllTimers();

    expect(onPressMock).toHaveBeenCalledWith(-1);
    expect(onPressMock).toHaveBeenCalledTimes(2);
  });

  it("calls the passed onPress prop with correct value when the overlay button is pressed", () => {
    const { getByTestId } = renderWithProviders(
      <ActionSheet
        title="Sweet stinky sheet"
        cancelButtonText="Cancel"
        options={testOptions}
        visible={true}
        onPress={onPressMock}
      />
    );
    const overlayButton = getByTestId("overlayButton");
    fireEvent.press(overlayButton);
    jest.runAllTimers();
    expect(onPressMock).toHaveBeenCalledWith(-1);
  });
});
