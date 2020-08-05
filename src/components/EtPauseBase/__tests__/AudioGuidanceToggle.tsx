import React from "react";
import { act } from "react-test-renderer";
import * as analyticsUtils from "../../../commons/Analytics";
import { replaceState } from "../../../commons/Store/action";
import { getMuteGuidance } from "../../../commons/Store/Audio/selectors";
import { getTestProvider } from "../../../commons/Utils/TestMocks/get-test-provider";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import AudioGuidanceToggle from "../AudioGuidanceToggle";

describe("AudioGuidanceToggle", () => {
  it("renders correctly", () => {
    const { tree } = testRender(<AudioGuidanceToggle />);
    const audioGuidanceToggle = tree.root.findByProps({
      testID: "audioGuidanceToggle"
    });
    expect(audioGuidanceToggle.props.title).toBe("Verbal cues");
  });

  it("unmutes guidance correctly", () => {
    const ctx = getTestProvider();
    const state = ctx.store.getState();
    ctx.store.dispatch(
      replaceState({
        audio: {
          ...state.audio,
          muteGuidance: true
        }
      })
    );

    const { tree, store } = testRender(<AudioGuidanceToggle />, ctx);
    const audioGuidanceToggle = tree.root.findByProps({
      testID: "audioGuidanceToggle"
    });
    act(() => {
      audioGuidanceToggle.props.onValueChange();
    });
    expect(getMuteGuidance(store.getState())).toBe(false);
  });

  it("mutes guidance correctly", () => {
    const { tree, store } = testRender(<AudioGuidanceToggle />);
    expect(getMuteGuidance(store.getState())).toBeFalsy();

    const audioGuidanceToggle = tree.root.findByProps({
      testID: "audioGuidanceToggle"
    });
    act(() => {
      audioGuidanceToggle.props.onValueChange();
    });
    expect(getMuteGuidance(store.getState())).toBe(true);
  });

  describe("Mixpanel", () => {
    it("reports correctly to mixpanel when audio guidance toggle is pressed", () => {
      const mixpanel = jest.spyOn(analyticsUtils, "track");
      const { store, tree } = testRender(<AudioGuidanceToggle />);
      expect(getMuteGuidance(store.getState())).toBeFalsy();
      const audioGuidanceToggle = tree.root.findByProps({
        testID: "audioGuidanceToggle"
      });
      act(() => {
        audioGuidanceToggle.props.onValueChange();
      });
      expect(mixpanel).toBeCalledWith("Audio Cues Toggled", { newState: true });

      act(() => {
        audioGuidanceToggle.props.onValueChange();
      });
      expect(mixpanel).toBeCalledWith("Audio Cues Toggled", {
        newState: false
      });
    });
  });
});
