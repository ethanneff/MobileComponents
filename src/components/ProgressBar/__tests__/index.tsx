import React from "react";
import { renderWithProviders } from "../../../commons/Utils/TestUtils/react-testing-library";

import ProgressBar from "../";

describe("ProgressBar", () => {
  it("renders correctly with defaults", () => {
    const { getByTestId } = renderWithProviders(
      <ProgressBar color={"black"} current={2} total={10} />
    );

    const container = getByTestId("progressBar");
    const gradientBar = getByTestId("gradientBar");
    const points = getByTestId("progressBarPoints");

    expect(container).toBeDefined();
    expect(gradientBar).toBeDefined();
    expect(points).toBeDefined();
  });
});
