import { render } from "@testing-library/react-native";
import React from "react";
import Curve from "../Curve";

describe("Curve", () => {
  const curveData = `
        M 10 10 
        Q 10 15 10 20
  `;
  it("renders with the correct data", () => {
    const { container } = render(<Curve curveData={curveData} />);
    expect(container).toMatchSnapshot();
  });
});
