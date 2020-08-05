import React from "react";
import { act } from "react-test-renderer";
import * as analyticsUtils from "../../../commons/Analytics";
import { replaceState } from "../../../commons/Store/action";
import {
  getMuteBeep,
  getMuteGuidance
} from "../../../commons/Store/Audio/selectors";
import { getTestProvider } from "../../../commons/Utils/TestMocks/get-test-provider";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import AudioFeedbackToggle from "../AudioFeedbackToggle";

describe("AudioFeedbackToggle", () => {
  it("renders correctly", () => {
    const { tree } = testRender(<AudioFeedbackToggle />);
    const audioFeedbackToggle = tree.root.findByProps({
      testID: "audioFeedbackToggle"
    });
    expect(audioFeedbackToggle.props.title).toBe("Audio feedback");
  });

  it("unmutes feedback correctly", () => {
    const ctx = getTestProvider();
    const state = ctx.store.getState();
    ctx.store.dispatch(
      replaceState({
        audio: {
          ...state.audio,
          muteBeep: true
        }
      })
    );

    const { tree, store } = testRender(<AudioFeedbackToggle />, ctx);
    const audioFeedbackToggle = tree.root.findByProps({
      testID: "audioFeedbackToggle"
    });
    act(() => {
      audioFeedbackToggle.props.onValueChange();
    });
    expect(getMuteGuidance(store.getState())).toBe(false);
  });

  it("mutes feedback correctly", () => {
    const { tree, store } = testRender(<AudioFeedbackToggle />);
    expect(getMuteBeep(store.getState())).toBeFalsy();

    const audioFeedbackToggle = tree.root.findByProps({
      testID: "audioFeedbackToggle"
    });
    act(() => {
      audioFeedbackToggle.props.onValueChange();
    });
    expect(getMuteBeep(store.getState())).toBe(true);
  });

  describe("Mixpanel", () => {
    it("reports correctly to mixpanel when audio feedback toggle is pressed", () => {
      const mixpanel = jest.spyOn(analyticsUtils, "track");
      const { store, tree } = testRender(<AudioFeedbackToggle />);
      expect(getMuteBeep(store.getState())).toBeFalsy();
      const audioFeedbackToggle = tree.root.findByProps({
        testID: "audioFeedbackToggle"
      });
      act(() => {
        audioFeedbackToggle.props.onValueChange();
      });
      expect(mixpanel).toBeCalledWith("Beeps Toggled", { newState: true });

      act(() => {
        audioFeedbackToggle.props.onValueChange();
      });
      expect(mixpanel).toBeCalledWith("Beeps Toggled", {
        newState: false
      });
    });
  });
});
