import React from "react";
import renderer from "react-test-renderer";
import Component from "..";
import { setE2EModeChange } from "../../../commons/Store/Debug";
import { getTestProvider } from "../../../commons/Utils/TestMocks/get-test-provider";

describe("HiddenButton Component", () => {
  it("renders correctly with defaults", () => {
    const { TestProvider } = getTestProvider();
    const component = renderer.create(
      <TestProvider>
        <Component onPress={jest.fn()} />
      </TestProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders correctly with  props", () => {
    const { TestProvider, store } = getTestProvider();
    store.dispatch(setE2EModeChange(true));
    const component = renderer.create(
      <TestProvider>
        <Component onPress={jest.fn()} testID="123" />
      </TestProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
