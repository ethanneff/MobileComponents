import React from "react";
import renderer from "react-test-renderer";
import Component from "..";

describe("Header Component", () => {
  it("renders correctly h1", () => {
    const component = renderer
      .create(<Component h1="I am a Header" />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  it("renders correctly overline", () => {
    const component = renderer
      .create(<Component overline="I am a Header" />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  it("renders correctly h2", () => {
    const component = renderer
      .create(<Component h2="I am a Header" />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  it("renders correctly h3", () => {
    const component = renderer
      .create(<Component h3="I am a Header" />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  it("renders correctly caption", () => {
    const component = renderer
      .create(<Component caption="I am a Header" />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  it("renders correctly notCentered", () => {
    const component = renderer
      .create(<Component notCentered h1="I am a Header" />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  it("renders correctly flexible", () => {
    const component = renderer
      .create(<Component flexible h1="I am a Header" />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
