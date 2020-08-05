import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { act } from "react-test-renderer";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import IconComponent from "../../Icon";
import { NotificationErrorType } from "../../Notification/config";
import Text from "../../Text";
import ErrorNotification from "../ErrorNotification";

jest.useFakeTimers();

describe("ErrorNotification component", () => {
  it("renders correctly with NotificationErrorType of None", () => {
    const { tree } = testRender(
      <ErrorNotification notificationErrorType={NotificationErrorType.None} />
    );
    expect(tree).not.toHaveComponentWithType(TouchableWithoutFeedback);
  });

  it("renders correctly with NotificationErrorType of Network and dismisses after timer", () => {
    const { tree } = testRender(
      <ErrorNotification
        notificationErrorType={NotificationErrorType.Network}
      />
    );
    expect(tree).toHaveComponentWithType(TouchableWithoutFeedback);
    expect(tree).toHaveComponentWithType(IconComponent);
    expect(tree).toHaveComponentWithType(Text);
    expect(tree).toHaveComponentWithType(Text);
    const textComp = tree.root.findByType(Text);
    const iconComp = tree.root.findByType(IconComponent);
    expect(textComp.props).toHaveProperty(
      "title",
      "Check your Internet settings"
    );
    expect(iconComp.props).toHaveProperty("name", "wifi-strength-off");
    act(() => {
      jest.runAllTimers();
    });
    expect(tree).not.toHaveComponentWithType(TouchableWithoutFeedback);
  });

  it("renders correctly with NotificationErrorType of Server and dismisses after timer", () => {
    const { tree } = testRender(
      <ErrorNotification notificationErrorType={NotificationErrorType.Server} />
    );
    expect(tree).toHaveComponentWithType(TouchableWithoutFeedback);
    expect(tree).toHaveComponentWithType(IconComponent);
    expect(tree).toHaveComponentWithType(Text);
    const textComp = tree.root.findByType(Text);
    const iconComp = tree.root.findByType(IconComponent);
    expect(textComp.props).toHaveProperty("title", "Network error");
    expect(iconComp.props).toHaveProperty("name", "alert-circle");
    act(() => {
      jest.runAllTimers();
    });
    expect(tree).not.toHaveComponentWithType(TouchableWithoutFeedback);
  });
});
