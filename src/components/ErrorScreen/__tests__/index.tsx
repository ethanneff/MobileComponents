import React from "react";
import { act } from "react-test-renderer";
import ErrorScreen from "..";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import { ErrorScreenType, TabType } from "../config";

const mockCallback = jest.fn();

afterEach(() => {
  mockCallback.mockClear();
});

describe("ErrorScreen component", () => {
  it("renders correctly with defaults", () => {
    const { tree } = testRender(
      <ErrorScreen
        errorScreenType={ErrorScreenType.None}
        onPress={mockCallback}
      />
    );
    expect(tree).not.toHaveComponentWithProps({ testID: "errorScreenTab" });
    expect(tree).toHaveComponentWithProps({ testID: "errorScreenContent" });
    expect(tree).toHaveComponentWithProps({ testID: "errorScreenButton" });
  });

  it("renders correctly with tab data when provided", () => {
    const { tree } = testRender(
      <ErrorScreen
        errorScreenType={ErrorScreenType.None}
        onPress={mockCallback}
        tabType={TabType.Groups}
      />
    );
    expect(tree).toHaveComponentWithProps({ testID: "errorScreenTab" });
    expect(tree).toHaveComponentWithProps({ testID: "errorScreenContent" });
    expect(tree).toHaveComponentWithProps({ testID: "errorScreenButton" });
  });

  it("invokes onPress behavior correctly", () => {
    const { press } = testRender(
      <ErrorScreen
        errorScreenType={ErrorScreenType.Network}
        onPress={mockCallback}
      />
    );
    act(() => {
      press("errorScreenButton");
    });
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
