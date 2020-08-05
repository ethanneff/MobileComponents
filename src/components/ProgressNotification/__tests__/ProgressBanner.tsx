import React from "react";
import { ReactTestRenderer } from "react-test-renderer";
import sinon, { SinonFakeTimers } from "sinon";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import ProgressBanner from "../ProgressBanner";

const onPadlockAnimationFinish = jest.fn();

describe("ProgressBanner", () => {
  let fakeTimer: SinonFakeTimers;
  let tree: ReactTestRenderer;

  beforeEach(() => {
    fakeTimer = sinon.useFakeTimers();
  });

  afterEach(() => {
    fakeTimer.restore();
    onPadlockAnimationFinish.mockClear();
    tree.unmount();
  });

  it("renders correctly with defaults", () => {
    const renderCtx = testRender(
      <ProgressBanner
        newPoints={2}
        initialLevel={1}
        currentPoints={1}
        totalPoints={2}
        upgradedLevel={false}
        nextCurrentPoints={1}
        nextTotalPoints={2}
        whatsNewEnabled={false}
        height={300}
      />
    );
    tree = renderCtx.tree;
    const progressBanner = tree.root.findByProps({ testID: "progressBanner" });
    expect(progressBanner).toBeDefined();
    const playlistLevelProps = tree.root.findByProps({
      testID: "playlistLevel"
    }).props;
    expect(playlistLevelProps.title).toBe("Level 1");
  });

  it("renders correctly with normal points", () => {
    const renderCtx = testRender(
      <ProgressBanner
        newPoints={20}
        initialLevel={1}
        currentPoints={60}
        totalPoints={100}
        upgradedLevel={false}
        nextCurrentPoints={0}
        nextTotalPoints={200}
        whatsNewEnabled={false}
        height={300}
      />
    );
    tree = renderCtx.tree;
    expect(tree.root.findByProps({ testID: "progressBanner" })).toBeTruthy();
    expect(tree.root.findByProps({ testID: "newPoints" }).props.title).toBe(
      "+20"
    );
  });

  it("renders correctly with zero points", () => {
    const renderCtx = testRender(
      <ProgressBanner
        newPoints={0}
        initialLevel={1}
        currentPoints={0}
        totalPoints={500}
        upgradedLevel={false}
        nextCurrentPoints={0}
        nextTotalPoints={1000}
        whatsNewEnabled={false}
        height={300}
      />
    );
    tree = renderCtx.tree;
    expect(tree.root.findByProps({ testID: "newPoints" }).props.title).toBe(
      "+0"
    );
  });

  it("invokes onPadlockAnimationFinish when whatsNew is enabled and user just leveled up", () => {
    const renderCtx = testRender(
      <ProgressBanner
        newPoints={2}
        initialLevel={1}
        currentPoints={1}
        totalPoints={2}
        upgradedLevel={true}
        nextCurrentPoints={1}
        nextTotalPoints={2}
        whatsNewEnabled={true}
        onPadlockAnimationFinish={onPadlockAnimationFinish}
        height={300}
      />
    );
    tree = renderCtx.tree;
    expect(onPadlockAnimationFinish).not.toHaveBeenCalled();
    fakeTimer.runAll();
    expect(onPadlockAnimationFinish).toHaveBeenCalled();
  });
});
