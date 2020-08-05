import { cleanup, render } from "@testing-library/react-native";
import React from "react";
import FeatureHeader from "../index";

describe("<FeatureHeader />", () => {
  afterEach(cleanup);

  it("renders correctly", () => {
    const { getByTestId } = render(
      <FeatureHeader title="Feature Header" icon="account-multiple" />
    );

    const safeArea = getByTestId("featureHeaderSafeArea");
    const icon = getByTestId("featureHeaderIcon");
    const title = getByTestId("featureHeaderTitle");
    expect(safeArea).toBeDefined();
    expect(icon).toBeDefined();
    expect(title).toBeDefined();
    expect(title.children[0]).toBe("Feature Header");
  });
});
