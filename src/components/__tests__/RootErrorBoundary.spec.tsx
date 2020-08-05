import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { strings } from "../../commons/Locales";
import * as selectors from "../../commons/Store/selectors";
import { logoutUser } from "../../commons/Store/User";
import RootErrorBoundary from "../RootErrorBoundary";

const ERROR_MESSAGE = "TEST-500 Error";
function ErrorComponent(): JSX.Element {
  throw new Error(ERROR_MESSAGE);
}

describe(RootErrorBoundary, () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
    jest.spyOn(selectors, "useRootDispatch").mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("prints the given error message", () => {
    const { findByText } = render(
      <RootErrorBoundary>
        <ErrorComponent />
      </RootErrorBoundary>
    );
    expect(findByText(ERROR_MESSAGE)).toBeTruthy();
  });

  it("logs out the user when sign out is pressed", () => {
    const { getByText } = render(
      <RootErrorBoundary>
        <ErrorComponent />
      </RootErrorBoundary>
    );

    const signoutButton = getByText(strings("account.signOut").toUpperCase());
    fireEvent.press(signoutButton);

    expect(mockDispatch).toHaveBeenCalledWith(logoutUser());
  });
});
