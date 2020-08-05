import React from "react";
import { TextInput } from "react-native";
import renderer from "react-test-renderer";
import Input from "..";

describe("input component", () => {
  it("renders correctly with defaults", () => {
    const { root } = renderer.create(
      <Input
        value="example"
        onSubmitEditing={() => undefined}
        onChange={() => undefined}
        testID="input"
      />
    );
    const input = root.findByProps({ testID: "input" });
    expect(input).toBeDefined();
  });

  it("renders correctly without onChange", () => {
    const { root } = renderer.create(
      <Input value="example" onChange={() => undefined} testID="input" />
    );
    const input = root.findByProps({ testID: "input" });
    expect(input).toBeDefined();
  });

  it("renders nothing when invisible", () => {
    const { root } = renderer.create(
      <Input value="example" invisible onChange={() => undefined} />
    );
    const inputContainer = root.findByProps({ testID: "inputContainer" });
    expect(inputContainer.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          opacity: 0
        })
      ])
    );
  });

  it("renders correctly with capitalize", () => {
    const { root } = renderer.create(
      <Input
        value="example"
        capitalized
        onChange={() => undefined}
        testID="input"
      />
    );
    const input = root.findByType(TextInput);
    expect(input.props.autoCapitalize).toBe("sentences");
  });

  it("renders nothing when hidden", () => {
    const { root } = renderer.create(
      <Input value="example" hidden onChange={() => undefined} testID="input" />
    );
    const inputContainer = root.findAllByProps({ testID: "inputContainer" });
    expect(inputContainer).toHaveLength(0);
  });

  it("renders correctly with error", () => {
    const defaultErrorMessage = "This field is required";
    const { root } = renderer.create(
      <Input value="example" error onChange={() => undefined} />
    );
    const errorMessage = root.findByProps({ testID: "inputErrorMessage" });
    expect(errorMessage.props.invisible).toBe(false);
    expect(errorMessage.props.title).toBe(defaultErrorMessage);
  });

  it("renders correctly with alignRight", () => {
    const { root } = renderer.create(
      <Input
        value="example"
        alignRight
        onChange={() => undefined}
        testID="input"
      />
    );
    const input = root.findByType(TextInput);
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          textAlign: "right"
        })
      ])
    );
  });

  it("renders correctly with alignLeft", () => {
    const { root } = renderer.create(
      <Input
        value="example"
        alignLeft
        onChange={() => undefined}
        testID="input"
      />
    );
    const input = root.findByType(TextInput);
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          textAlign: "left"
        })
      ])
    );
  });

  it("renders correctly with secureText", () => {
    const { root } = renderer.create(
      <Input value="example" secureText onChange={() => undefined} />
    );
    const input = root.findByProps({ testID: "InputTextInput" });
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("renders correctly without secureText", () => {
    const { root } = renderer.create(
      <Input value="example" onChange={() => undefined} />
    );
    const input = root.findByProps({ testID: "InputTextInput" });
    expect(input.props.secureTextEntry).toBe(false);
  });

  it("renders eye icon correctly when textContentType is set to 'password'", () => {
    const { root } = renderer.create(
      <Input
        value="example"
        textContentType="password"
        secureText
        onChange={() => undefined}
      />
    );
    const showHideIcon = root.findByProps({ testID: "ShowHideIcon" });
    expect(showHideIcon.props.name).toBe("eye");
  });

  it("sets the autoCorrect to false when textContentType is 'password'", () => {
    const { root } = renderer.create(
      <Input
        value="example"
        textContentType="password"
        onChange={() => undefined}
      />
    );
    const textInput = root.findByProps({ testID: "InputTextInput" });
    expect(textInput.props.autoCorrect).toBe(false);
  });

  it("changes state on focus", () => {
    const component = renderer.create(
      <Input value="example" onChange={() => undefined} />
    );
    component.root.findByType(TextInput).props.onFocus();
    expect(component.root.instance.state.isFocused).toBe(true);
  });

  it("changes state on blur", () => {
    const component = renderer.create(
      <Input value="example" onChange={() => undefined} />
    );
    component.root.findByType(TextInput).props.onBlur();
    expect(component.root.instance.state.isFocused).toBe(false);
  });

  it("passing up props onSubmitEditing", () => {
    const component = renderer.create(
      <Input
        value="example"
        onChange={() => undefined}
        onSubmitEditing={jest.fn()}
      />
    );
    component.root.findByType(TextInput).props.onSubmitEditing();
    expect(component.root.props.onSubmitEditing).toBeCalled();
  });

  it("captures onChange events within the instance method and passes it up to the parent component", () => {
    const testID = "input";
    const callback = jest.fn();
    const component = renderer.create(
      <Input
        testID={testID}
        value="example"
        onChange={callback}
        onSubmitEditing={jest.fn()}
      />
    );
    const input = component.root.findByProps({ testID });
    const onChange = jest.spyOn(component.root.instance, "onChange");
    expect(onChange).not.toBeCalled();
    input.instance.onChange("pow wow");
    expect(onChange).toBeCalled();
    expect(callback).toBeCalled();
  });

  it("captures onChange events within the instance method and does NOT pass it up to the parent component if the regex is incorrect", () => {
    const testID = "input";
    const callback = jest.fn();
    const component = renderer.create(
      <Input
        regex="\d"
        testID={testID}
        value="example"
        onChange={callback}
        onSubmitEditing={jest.fn()}
      />
    );
    const input = component.root.findByProps({ testID });
    const onChange = jest.spyOn(component.root.instance, "onChange");
    expect(onChange).not.toBeCalled();
    input.instance.onChange("pow wow");
    expect(onChange).toBeCalled();
    expect(callback).not.toBeCalled();
  });
});
