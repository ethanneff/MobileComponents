import React from "react";
import renderer from "react-test-renderer";
import Component from "..";
import Theme from "../../../commons/Theme";

describe("Icon Component", () => {
  it("renders correctly", () => {
    const component = renderer.create(<Component name={"account"} />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it("renders correctly without defaults", () => {
    const component = renderer
      .create(
        <Component name={"account"} size={1} color={Theme.color.success} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  it("renders correctly with badge", () => {
    const badge = 20;
    const component = renderer
      .create(
        <Component name={"account"} badge={badge} color={Theme.color.success} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("renders correctly with large badge", () => {
    const badge = 200;
    const component = renderer
      .create(
        <Component name={"account"} badge={badge} color={Theme.color.success} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("renders correctly when hidden", () => {
    const badge = 200;
    const component = renderer
      .create(
        <Component
          hidden
          name={"account"}
          badge={badge}
          color={Theme.color.success}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
