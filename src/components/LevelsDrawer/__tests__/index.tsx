import React from "react";
import { renderWithProviders } from "../../../commons/Utils/TestUtils/react-testing-library";
import LevelsDrawer from "..";

describe("LevelsDrawer", () => {
  it("renders correctly with defaults", () => {
    const { getByTestId } = renderWithProviders(
      <LevelsDrawer
        enableLevels={true}
        levelIndex={1}
        levelPointsEarned={1}
        totalLevelPoints={2}
        onLeftPress={jest.fn()}
      />
    );

    const container = getByTestId("levelsDrawer");
    const icon = getByTestId("levelsDrawerIcon");
    const text = getByTestId("levelsDrawerText");
    const progressBar = getByTestId("progressBar");

    expect(container).toBeDefined();
    expect(icon).toBeDefined();
    expect(text).toBeDefined();
    expect(progressBar).toBeDefined();
  });
});
