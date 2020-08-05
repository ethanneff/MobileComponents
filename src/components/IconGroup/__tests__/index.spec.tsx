import { render } from "@testing-library/react-native";
import React from "react";
import IconGroup from "..";
import Certification from "../../commons/Assets/CoachProfile/certified.svg";

describe(IconGroup, () => {
  it("renders correctly without errors", () => {
    const component = render(
      <IconGroup
        items={[
          {
            label: "First item",
            icon: Certification
          },
          {
            label: "Second item",
            icon: Certification
          }
        ]}
      />
    );

    expect(component).toBeTruthy();
    expect(component.getByText("First item")).toBeTruthy();
    expect(component.getByText("Second item")).toBeTruthy();
  });

  it("doesn't break when passed no items", () => {
    const component = render(<IconGroup items={[]} />);

    expect(component).toBeTruthy();
  });

  it("throws an error when passed an invalid image source", () => {
    expect(() =>
      render(
        <IconGroup
          items={[
            {
              label: "First item",
              icon: require("bad path")
            },
            {
              label: "Second item",
              icon: require("../../../commons/Assets/Logo/image.png")
            }
          ]}
        />
      )
    ).toThrow();
  });
});
