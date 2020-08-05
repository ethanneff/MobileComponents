import React from "react";
import DeviceInfo from "react-native-device-info";
import renderer, { act } from "react-test-renderer";
import Component from "..";

jest.useFakeTimers();
describe("Text Component", () => {
  it("renders on mobile", () => {
    const component = renderer.create(<Component title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders on tablet", () => {
    jest.spyOn(DeviceInfo, "isTablet").mockReturnValue(() => true);
    const component = renderer.create(<Component title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders centered", () => {
    const component = renderer.create(<Component center title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders centerVertically", () => {
    const component = renderer.create(
      <Component centerVertically title="test" />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders h1", () => {
    const component = renderer.create(<Component h1 title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders h2", () => {
    const component = renderer.create(<Component h2 title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders h3", () => {
    const component = renderer.create(<Component h3 title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders h4", () => {
    const component = renderer.create(<Component h4 title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders h5", () => {
    const component = renderer.create(<Component h5 title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders body", () => {
    const component = renderer.create(<Component body title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders link", () => {
    const component = renderer.create(<Component link title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders error", () => {
    const component = renderer.create(<Component error title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders button", () => {
    const component = renderer.create(<Component button title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders clear", () => {
    const component = renderer.create(<Component clear title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders bold", () => {
    const component = renderer.create(<Component bold title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders uppercase", () => {
    const component = renderer.create(<Component uppercase title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders uppercase without title", () => {
    const component = renderer.create(<Component uppercase title="" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders ellipsis", () => {
    const component = renderer.create(<Component ellipsis title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders ellipsis numberOfLines", () => {
    const component = renderer.create(
      <Component ellipsis numberOfLines={2} title="test" />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders caption", () => {
    const component = renderer.create(<Component caption title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders tab", () => {
    const component = renderer.create(<Component tab title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders overline", () => {
    const component = renderer.create(<Component overline title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders as expected when hidden", () => {
    const component = renderer.create(<Component hidden title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders as expected when invisible", () => {
    const component = renderer.create(<Component invisible title="test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders notBold", () => {
    const component = renderer.create(<Component title="test" notBold />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders markdown", () => {
    const component = renderer.create(
      <Component title="normal *bold*" markdown />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders incremental", () => {
    const component = renderer.create(
      <Component title="44" incremental incrementBy={2} />
    );
    act(() => {
      jest.runAllTimers();
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
  it("renders incremental with props", () => {
    const component = renderer.create(
      <Component title="44" incremental incrementBy={2} />
    );
    act(() => {
      jest.runAllTimers();
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
