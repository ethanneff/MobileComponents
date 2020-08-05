import { act } from "@testing-library/react-native";
import React from "react";
import { SinonSandbox, createSandbox } from "sinon";
import * as Analytics from "../../../commons/Analytics";
import Component from "..";
import { getTestProvider } from "../../../commons/Utils/TestMocks/get-test-provider";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import { NotificationErrorType } from "../../Notification/config";

jest.useFakeTimers();
jest.spyOn(Analytics, "injectNavigationTracking");

const prepareNavCtx = () => {
  const ctx = getTestProvider();
  ctx.navigation.state.routeName = "EpicScreen";
  return ctx;
};

describe("Screen Component", () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    (Analytics.injectNavigationTracking as jest.Mock).mockClear();
    sandbox.restore();
  });

  it("renders correctly", () => {
    const { tree } = testRender(<Component testID="screenComp" />);
    const screenComp = tree.root.findAllByProps({ testID: "screenComp" });
    expect(screenComp).toBeTruthy();
  });

  it("renders correctly floating left", () => {
    const { tree } = testRender(
      <Component onLeftPress={() => undefined} floatingNav />
    );
    const navbarComp = tree.root.findByProps({ testID: "navbar" });
    const leftNavbarButtonComp = tree.root.findByProps({
      testID: "leftNavbarButton"
    });
    expect(leftNavbarButtonComp.props.hidden).toBeFalsy();
    expect(navbarComp.props.style[0]).toMatchObject({
      backgroundColor: "transparent",
      position: "absolute",
      top: 0,
      zIndex: 1,
      elevation: 1
    });
  });

  it("renders correctly floating right", () => {
    const { tree } = testRender(
      <Component onLeftPress={() => undefined} floatingNav />
    );
    const navbarComp = tree.root.findByProps({ testID: "navbar" });
    const rightNavbarButtonComp = tree.root.findByProps({
      testID: "rightNavbarButton"
    });
    expect(rightNavbarButtonComp.props.hidden).toBeFalsy();
    expect(navbarComp.props.style[0]).toMatchObject({
      backgroundColor: "transparent",
      position: "absolute",
      top: 0,
      zIndex: 1,
      elevation: 1
    });
  });

  it("renders correctly left", () => {
    const { tree } = testRender(<Component onLeftPress={() => undefined} />);
    const leftNavbarButtonComp = tree.root.findByProps({
      testID: "leftNavbarButton"
    });
    expect(leftNavbarButtonComp.props.hidden).toBeFalsy();
  });

  it("renders correctly right", () => {
    const { tree } = testRender(<Component onLeftPress={() => undefined} />);
    const rightNavbarButtonComp = tree.root.findByProps({
      testID: "rightNavbarButton"
    });
    expect(rightNavbarButtonComp.props.hidden).toBeFalsy();
  });

  it("renders correctly left along with leftText", () => {
    const { tree } = testRender(
      <Component onLeftPress={() => undefined} leftText="left label!" />
    );
    const leftNavbarButtonComp = tree.root.findByProps({
      testID: "leftNavbarButton"
    });
    expect(leftNavbarButtonComp.props.text).toBe("left label!");
  });

  it("renders correctly right along with rightText", () => {
    const { tree } = testRender(
      <Component onLeftPress={() => undefined} rightText="right label!" />
    );
    const rightNavbarButtonComp = tree.root.findByProps({
      testID: "rightNavbarButton"
    });
    expect(rightNavbarButtonComp.props.text).toBe("right label!");
  });

  it("renders correctly left icon", () => {
    const { tree } = testRender(
      <Component leftIcon="check" onLeftPress={() => undefined} />
    );
    const navbarIcon = tree.root.findByProps({
      testID: "navbarIcon"
    });
    expect(navbarIcon.props.name).toBe("check");
  });

  it("renders correctly right icon", () => {
    const { tree } = testRender(
      <Component rightIcon="check" onRightPress={() => undefined} />
    );
    const navbarIcon = tree.root.findByProps({
      testID: "navbarIcon"
    });
    expect(navbarIcon.props.name).toBe("check");
  });

  it("fires tracking event on mount correctly", async () => {
    testRender(<Component />, prepareNavCtx());

    expect(Analytics.injectNavigationTracking).toHaveBeenCalledTimes(1);
  });

  it("fires tracking event on focus/blur correctly", () => {
    const { navigation } = testRender(<Component />, prepareNavCtx());
    act(() => {
      navigation.dispatch("didBlur");
    });
    navigation.isFocused.mockReturnValue(true);
    act(() => {
      navigation.dispatch("didFocus");
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(Analytics.injectNavigationTracking).toHaveBeenCalledTimes(2);
  });

  it("doesn't fire tracking event on mount if isAutomaticTrackingEnabled is false", () => {
    testRender(
      <Component isAutomaticTrackingEnabled={false} />,
      prepareNavCtx()
    );
    expect(Analytics.injectNavigationTracking).toHaveBeenCalledTimes(0);
  });

  it("doesn't fire tracking event on focus/blur if isAutomaticTrackingEnabled is false", async () => {
    const { navigation } = testRender(
      <Component isAutomaticTrackingEnabled={false} />,
      prepareNavCtx()
    );
    act(() => {
      navigation.dispatch("didBlur");
    });
    navigation.isFocused.mockReturnValue(true);
    act(() => {
      jest.runAllTimers();
    });
    expect(Analytics.injectNavigationTracking).toHaveBeenCalledTimes(0);
  });

  it("renders Notification component if notificationError prop is provided", async () => {
    const { tree } = testRender(
      <Component notificationError={NotificationErrorType.Network} />,
      prepareNavCtx()
    );
    const notificationComps = tree.root.findByProps({
      testID: "errorNotification"
    });
    expect(notificationComps).toBeDefined();
  });

  it("doesn't render Notification component if notificationError is undefined", async () => {
    const { tree } = testRender(<Component />, prepareNavCtx());
    const notificationComps = tree.root.findAllByProps({
      testID: "errorNotification"
    });
    expect(notificationComps).toHaveLength(0);
  });
});
