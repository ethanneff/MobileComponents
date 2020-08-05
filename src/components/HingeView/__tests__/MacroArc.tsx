import { render } from "@testing-library/react-native";
import React from "react";
import MacroArc from "../MacroArc";

describe("MacroCurve", () => {
  it("renders with the correct data", () => {
    const { container } = render(
      <MacroArc
        startAngle={90}
        endAngle={0}
        centerX={800}
        centerY={500}
        limbLength={50}
        scaledDown={false}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
