import React from "react";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import { OutlineFadeIcon } from "../OutlineFadeIcon";

jest.useFakeTimers();
describe("OutlineFadeIcon", () => {
  it("renders correctly with check Icon", () => {
    const { tree } = testRender(<OutlineFadeIcon index={0} showIcon={true} />);
    expect(tree).toHaveComponentWithType(OutlineFadeIcon);
    const checkIcon = tree.root.findByProps({ testID: "checkIcon" });
    expect(checkIcon).toBeTruthy();
  });

  it("renders correctly with outline only", () => {
    const { tree } = testRender(<OutlineFadeIcon index={0} showIcon={false} />);
    expect(tree).toHaveComponentWithType(OutlineFadeIcon);
    const checkIconComps = tree.root.findAllByProps({ testID: "checkIcon" });
    expect(checkIconComps).toHaveLength(0);
  });
});
