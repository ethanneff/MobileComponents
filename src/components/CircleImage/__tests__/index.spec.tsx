import { render } from "@testing-library/react-native";
import React from "react";
import CircleImage from "..";

describe("CircleImage", () => {
  it("renders correctly without errors", () => {
    const component = render(
      <CircleImage
        size={100}
        source={require("../../../commons/Assets/Logo/image.png")}
      />
    );
    expect(component).toBeTruthy();
  });

  it("throws due to an invalid source", () => {
    expect(() =>
      render(<CircleImage size={100} source={require("bad source")} />)
    ).toThrow();
  });
});
