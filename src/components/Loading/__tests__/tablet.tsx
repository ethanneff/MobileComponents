import React from "react";
import DeviceInfo from "react-native-device-info";
import Loading from "..";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import Text from "../../Text";

jest.spyOn(DeviceInfo, "isTablet").mockReturnValue(() => true);

describe("Loading Component", () => {
  it("renders correctly", () => {
    const { tree } = testRender(
      <Loading title="hello" subtitle="helloSub" buttonTitle="PressMeeeh" />
    );
    const textComps = tree.root.findAllByType(Text);
    expect(textComps[0].props.title).toBe("hello");
    expect(textComps[0].props.style[0].paddingBottom).toBe(20);
    expect(textComps[1].props.title).toBe("PressMeeeh");
    expect(textComps[2].props.title).toBe("helloSub");
  });
});
