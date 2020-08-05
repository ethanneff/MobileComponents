import React from "react";
import Notification from "..";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import Icon from "../../../components/Icon";
import Text from "../../Text";
import { NotificationErrorType } from "../config";

describe("Notification Component", () => {
  it("renders correctly", () => {
    const { tree } = testRender(
      <Notification
        notificationErrorType={NotificationErrorType.Server}
        testID="notification"
      />
    );
    expect(tree).toHaveComponentWithProps({ testID: "notification" });
    expect(tree).toHaveComponentWithType(Icon);
    expect(tree).toHaveComponentWithType(Text);
    const textComp = tree.root.findByType(Text);
    const iconComp = tree.root.findByType(Icon);
    expect(textComp.props).toHaveProperty("title", "Network error");
    expect(iconComp.props).toHaveProperty("name", "alert-circle");
  });
});
