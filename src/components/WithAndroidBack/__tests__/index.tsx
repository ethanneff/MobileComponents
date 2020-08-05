import React from "react";
import { act } from "@testing-library/react-native";
import { SinonSandbox, SinonSpy, createSandbox } from "sinon";
import withAndroidBack, { AndroidBackInjectedProps, AndroidBackMode } from "..";
import * as analytics from "../../../commons/Analytics";
import { setCurrentEtSessionToSensorless } from "../../../commons/Store/Session";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import Text from "../../Text";

describe("withAndroidBack Container", () => {
  const TestView: React.SFC<AndroidBackInjectedProps> = props => (
    <Text title={JSON.stringify(props)} testID="wrappedText" />
  );
  const WrappedComponent = withAndroidBack(TestView);
  let sandbox: SinonSandbox;
  let mixpanelSpy: SinonSpy;

  beforeEach(() => {
    sandbox = createSandbox();
    mixpanelSpy = sandbox.spy(analytics, "track");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("renders correctly", () => {
    const { tree } = testRender(<WrappedComponent />);
    const hoc = tree.root.findByProps({ testID: "withAndroidBackHOC" });
    const dialog = tree.root.findByProps({ testID: "withAndroidBackDialog" });
    const wrappedText = tree.root.findByProps({ testID: "wrappedText" });

    expect(hoc).toBeDefined();
    expect(dialog).toBeDefined();
    expect(wrappedText).toBeDefined();
  });

  it("does NOT navigate out and closes the dialog on the cancellation dialog press", () => {
    const { tree } = testRender(<WrappedComponent />);
    const hoc = tree.root.findByProps({ testID: "withAndroidBackHOC" }).parent;
    if (!hoc) {
      throw new Error(":(");
    }
    const trackDialogAction = jest.spyOn(hoc.instance, "trackDialogAction");
    expect(hoc.instance.state.dialog).toBeFalsy();
    hoc.instance.handleDialogCancel();
    expect(hoc.instance.state.dialog).toBeFalsy();
    expect(trackDialogAction).toHaveBeenCalled();
  });

  it("navigates out on the confirmation dialog press", () => {
    const { tree } = testRender(<WrappedComponent />);
    const hoc = tree.root.findByProps({ testID: "withAndroidBackHOC" }).parent;
    if (!hoc) {
      throw new Error(":(");
    }
    const trackDialogAction = jest.spyOn(hoc.instance, "trackDialogAction");
    const navigateOut = jest.spyOn(hoc.instance, "navigateOut");
    expect(hoc.instance.state.dialog).toBeFalsy();
    hoc.instance.handleDialogConfirm();
    expect(hoc.instance.state.dialog).toBeFalsy();
    expect(trackDialogAction).toHaveBeenCalled();
    expect(navigateOut).toHaveBeenCalled();
  });

  it("is able set the hoc mode", () => {
    const { tree } = testRender(<WrappedComponent />);
    const mode = AndroidBackMode.HealthSurveyWithoutDialog;
    const hoc = tree.root.findByProps({ testID: "withAndroidBackHOC" }).parent;
    if (!hoc) {
      throw new Error(":(");
    }
    expect(hoc.instance.state.dialog).toBeFalsy();
    expect(hoc.instance.mode).not.toBe(mode);
    hoc.instance.setNavigateHomeMode(mode);
    expect(hoc.instance.mode).toBe(mode);
  });

  it("shows a dialog when mode is AndroidBackMode.ExerciseTherapyWithPointsDialog", () => {
    const { tree } = testRender(<WrappedComponent />);
    const mode = AndroidBackMode.ExerciseTherapyWithPointsDialog;
    const hoc = tree.root.findByProps({ testID: "withAndroidBackHOC" }).parent;
    if (!hoc) {
      throw new Error(":(");
    }
    const navigateOut = jest.spyOn(hoc.instance, "navigateOut");
    hoc.instance.setNavigateHomeMode(mode);
    expect(hoc.instance.mode).toBe(mode);
    expect(hoc.instance.state.dialog).toBeFalsy();
    hoc.instance.navigateHomeButtonPressed();
    expect(navigateOut).not.toHaveBeenCalled();
    expect(hoc.instance.state.dialog).toBeTruthy();
  });

  it("navigates out without showing a dialog when mode is NOT AndroidBackMode.ExerciseTherapyWithPointsDialog", () => {
    const { tree } = testRender(<WrappedComponent />);
    const mode = AndroidBackMode.HealthSurveyWithoutDialog;
    const hoc = tree.root.findByProps({ testID: "withAndroidBackHOC" }).parent;
    if (!hoc) {
      throw new Error(":(");
    }
    const navigateOut = jest.spyOn(hoc.instance, "navigateOut");
    hoc.instance.navigateHomeButtonPressed();
    expect(hoc.instance.mode).not.toBe(mode);
    expect(navigateOut).toHaveBeenCalled();
  });

  it("calls navigateOutOfArticleReader action creator when mode is ExerciseTherapyWithPointsDialog", () => {
    const { tree, navigation } = testRender(<WrappedComponent />);
    const mode = AndroidBackMode.ExerciseTherapyWithPointsDialog;
    const hoc = tree.root.findByProps({ testID: "withAndroidBackHOC" }).parent;
    if (!hoc) {
      throw new Error(":(");
    }
    hoc.instance.setNavigateHomeMode(mode);
    expect(hoc.instance.mode).toBe(mode);
    hoc.instance.navigateOut();
    expect(navigation.navigate).toBeCalledWith("Home");
  });

  it("tracks dialog close from ET Flow with dialog false", () => {
    const { tree } = testRender(<WrappedComponent />);
    const mode = AndroidBackMode.ExerciseTherapyWithPointsDialog;
    const hoc = tree.root.findByProps({ testID: "withAndroidBackHOC" }).parent;
    if (!hoc) {
      throw new Error(":(");
    }
    hoc.instance.setNavigateHomeMode(mode);
    expect(hoc.instance.mode).toBe(mode);
    hoc.instance.trackDialogAction(false);
    expect(mixpanelSpy.lastCall.args).toEqual([
      "EtSession Quit Dialog Cancel Clicked",
      {
        "Current page": "N/A",
        Pathway: "No indication",
        sensorless: "No"
      }
    ]);
  });

  it("tracks dialog confirm from ET Flow with dialog true", () => {
    const { tree } = testRender(<WrappedComponent />);
    const mode = AndroidBackMode.ExerciseTherapyWithoutDialog;
    const hoc = tree.root.findByProps({ testID: "withAndroidBackHOC" }).parent;
    if (!hoc) {
      throw new Error(":(");
    }
    hoc.instance.setNavigateHomeMode(mode);
    expect(hoc.instance.mode).toBe(mode);
    hoc.instance.trackDialogAction(true);
    expect(mixpanelSpy.lastCall.args).toEqual([
      "EtSession Quit Dialog Confirm Clicked",
      {
        "Current page": "N/A",
        Pathway: "No indication",
        sensorless: "No"
      }
    ]);
  });

  it("tracks dialog confirm from ET Flow during a Sensorless EtSession", () => {
    const { tree, store } = testRender(<WrappedComponent />);
    act(() => {
      store.dispatch(setCurrentEtSessionToSensorless());
    });
    const mode = AndroidBackMode.ExerciseTherapyWithoutDialog;
    const hoc = tree.root.findByProps({ testID: "withAndroidBackHOC" }).parent;
    expect(hoc).not.toBeUndefined();
    hoc!.instance.setNavigateHomeMode(mode);
    expect(hoc!.instance.mode).toBe(mode);
    hoc!.instance.trackDialogAction(true);
    expect(mixpanelSpy.lastCall.args).toEqual([
      "EtSession Quit Dialog Confirm Clicked",
      {
        "Current page": "N/A",
        Pathway: "No indication",
        sensorless: "Yes"
      }
    ]);
  });

  it("does NOT track when NOT in ET Flow", () => {
    const { tree } = testRender(<WrappedComponent />);
    const mode = AndroidBackMode.HealthSurveyWithoutDialog;
    const hoc = tree.root.findByProps({ testID: "withAndroidBackHOC" }).parent;
    if (!hoc) {
      throw new Error(":(");
    }
    hoc.instance.setNavigateHomeMode(mode);
    expect(hoc.instance.mode).toBe(mode);
    hoc.instance.trackDialogAction(false);
    expect(mixpanelSpy.lastCall).toBeFalsy();
  });
});
