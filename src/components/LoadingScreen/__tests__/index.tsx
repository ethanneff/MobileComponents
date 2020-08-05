import React from "react";
import { UIActivityIndicator } from "react-native-indicators";
import LoadingScreen from "..";
import Theme from "../../../commons/Theme";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import Text from "../../Text";

describe("LoadingScreen component", () => {
  it("renders correctly", () => {
    const { tree } = testRender(<LoadingScreen />);
    const textComp = tree.root.findByType(Text);
    const activityComp = tree.root.findByType(UIActivityIndicator);
    expect(textComp.props).toHaveProperty("title", "Loading");
    expect(activityComp.props).toMatchObject({
      color: Theme.color.neutral700,
      count: Theme.padding.p3,
      size: Theme.padding.p8
    });
  });
});
