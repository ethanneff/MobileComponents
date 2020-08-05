import React from "react";
import renderer from "react-test-renderer";
import Component from "..";

jest.mock("react-native-device-info", () => ({
  isTablet: jest.fn(() => true)
}));

describe("Button Component", () => {
  it("renders correctly with title", () => {
    const dom = renderer
      .create(<Component title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with icon", () => {
    const dom = renderer
      .create(<Component icon="check" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with icon title", () => {
    const dom = renderer
      .create(
        <Component icon="check" title="press" onPress={() => undefined} />
      )
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with loading", () => {
    const dom = renderer
      .create(<Component loading title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with secondary", () => {
    const dom = renderer
      .create(<Component secondary title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with primary", () => {
    const dom = renderer
      .create(<Component primary title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with background", () => {
    const dom = renderer
      .create(<Component background title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with half", () => {
    const dom = renderer
      .create(<Component half title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with disable", () => {
    const dom = renderer
      .create(<Component disable title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with nonFlex", () => {
    const dom = renderer
      .create(<Component nonFlex title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with clear", () => {
    const dom = renderer
      .create(<Component clear title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with circle", () => {
    const dom = renderer
      .create(<Component circle title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with fabCircle", () => {
    const dom = renderer
      .create(<Component fabCircle title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with bold", () => {
    const dom = renderer
      .create(<Component notBold title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
  it("renders correctly with nonflex", () => {
    const dom = renderer
      .create(<Component nonFlex title="press" onPress={() => undefined} />)
      .toJSON();
    expect(dom).toMatchSnapshot();
  });
});
