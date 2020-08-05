import React from "react";
import { act } from "react-test-renderer";
import Component from "..";
import { getTestProvider } from "../../../commons/Utils/TestMocks/get-test-provider";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";

describe("Slider Component", () => {
  it("shows the fat slider", () => {
    const callback = jest.fn();
    const Slider = <Component value={1} onChange={callback} />;
    const ctx = getTestProvider();
    const { tree } = testRender(Slider, ctx);
    const newSlider = tree.root.findAllByProps({ testID: "slider-newSlider" });
    expect(newSlider.length).not.toBe(0);
  });

  it("calls onChange callback with value that is changed with the fat slider", () => {
    const callback = jest.fn();
    const Slider = <Component value={1} onChange={callback} />;
    const ctx = getTestProvider();
    const { tree } = testRender(Slider, ctx);
    const slider = tree.root.findByProps({ testID: "slider-newSlider" });
    expect(callback).not.toBeCalled();
    act(() => slider.props.onValueChange(254));
    expect(callback).toBeCalledWith(254);
  });

  it("calls onComplete callback with value that is changed with the fat slider", () => {
    const changeCb = jest.fn();
    const completeCb = jest.fn();
    const Slider = (
      <Component value={1} onChange={changeCb} onComplete={completeCb} />
    );
    const ctx = getTestProvider();
    const { tree } = testRender(Slider, ctx);
    const slider = tree.root.findByProps({ testID: "slider-newSlider" });
    expect(completeCb).not.toBeCalled();
    act(() => slider.props.onSlidingComplete(71));
    expect(completeCb).toBeCalledWith(71);
  });
});
