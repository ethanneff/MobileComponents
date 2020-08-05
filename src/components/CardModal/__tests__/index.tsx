import React from "react";
import DeviceInfo from "react-native-device-info";
import LinearGradient from "react-native-linear-gradient";
import { act } from "react-test-renderer";
import { CardModal } from "..";
import {
  Context,
  testRender
} from "../../../commons/Utils/TestMocks/test-render";
import { SummaryListItem } from "../../SummaryList";
import { OutlineFadeIcon } from "../../SummaryList/OutlineFadeIcon";
import { Card } from "../Card";

const mockGestureResponderEvent = {
  stopPropagation: jest.fn()
};

describe("CardModal Component", () => {
  const onPressHandler = jest.fn();
  const onBackgroundPressHandler = jest.fn();

  afterEach(() => {
    onPressHandler.mockClear();
    onBackgroundPressHandler.mockClear();
  });

  const ftuSummaryList: SummaryListItem[] = [
    {
      title: "Awesome task number One",
      count: 1
    },
    {
      title: "Awesome task number Two",
      count: 1
    }
  ];

  it("renders correctly without gradient", () => {
    const { tree } = testRender(
      <CardModal
        title="Setup"
        titleCaption="3 Min"
        summaryItems={ftuSummaryList}
      />
    );
    const cardComponentProps = tree.root.findByType(Card).props;
    expect(cardComponentProps.title).toBe("Setup");
    const gradients = tree.root.findAllByType(LinearGradient);
    expect(gradients).toHaveLength(0);
  });

  it("renders correctly without gradient on tablet", () => {
    jest.spyOn(DeviceInfo, "isTablet").mockReturnValue(() => true);
    const { tree } = testRender(
      <CardModal
        title="Setup"
        titleCaption="3 Min"
        summaryItems={ftuSummaryList}
      />
    );
    const gradients = tree.root.findAllByType(LinearGradient);
    expect(gradients).toHaveLength(0);
  });

  it("renders correctly with gradient", () => {
    const { tree } = testRender(
      <CardModal
        gradient
        title="Setup"
        titleCaption="3 Min"
        summaryItems={ftuSummaryList}
      />
    );
    expect(tree).toHaveComponentWithType(LinearGradient);
  });

  it("runs the onPress handler when the button is pressed", () => {
    const ctx = testRender(
      <CardModal
        gradient
        title="Setup"
        titleCaption="3 Min"
        summaryItems={ftuSummaryList}
        onPress={onPressHandler}
      />
    );
    act(() => {
      ctx.press("cardModalButton");
    });
    expect(onPressHandler).toHaveBeenCalledTimes(1);
  });

  describe("when passed an onBackgroundPress handler", () => {
    let ctx: Context;
    beforeEach(() => {
      act(() => {
        ctx = testRender(
          <CardModal
            gradient
            title="Setup"
            titleCaption="3 Min"
            summaryItems={ftuSummaryList}
            onBackgroundPress={onBackgroundPressHandler}
          />
        );
        ctx.wait();
      });
    });

    afterEach(() => {
      if (ctx) {
        ctx.unmount();
      }
    });

    it("ignores presses inside the modal", () => {
      const modal = ctx.tree.root.findByProps({
        testID: "cardModalContainer"
      });
      act(() => {
        modal.props.onPress(mockGestureResponderEvent);
      });
      expect(onBackgroundPressHandler).not.toHaveBeenCalled();
    });

    it("acts on presses outside the modal", () => {
      act(() => {
        ctx.press("cardModalNegativeSpace");
      });
      expect(onBackgroundPressHandler).toHaveBeenCalledTimes(1);
    });
  });

  it("shows the correct amount of completed items", () => {
    const ctx = testRender(
      <CardModal
        gradient
        title="Setup"
        titleCaption="3 Min"
        summaryItems={ftuSummaryList}
        completedItemsCount={1}
      />
    );
    const iconsArray = ctx.tree.root.findAllByType(OutlineFadeIcon);
    expect(iconsArray).toHaveLength(2);
    expect(iconsArray[0].props.showIcon).toBe(true);
    expect(iconsArray[1].props.showIcon).toBe(false);
  });

  it("shows all items as being completed", () => {
    const ctx = testRender(
      <CardModal
        gradient
        title="Setup"
        titleCaption="3 Min"
        summaryItems={ftuSummaryList}
        completedItemsCount={2}
      />
    );
    const iconsArray = ctx.tree.root.findAllByType(OutlineFadeIcon);
    expect(iconsArray).toHaveLength(2);
    expect(iconsArray[0].props.showIcon).toBe(true);
    expect(iconsArray[1].props.showIcon).toBe(true);
  });

  it("shows all items as not being completed", () => {
    const ctx = testRender(
      <CardModal
        gradient
        title="Setup"
        titleCaption="3 Min"
        summaryItems={ftuSummaryList}
      />
    );
    const iconsArray = ctx.tree.root.findAllByType(OutlineFadeIcon);
    expect(iconsArray).toHaveLength(2);
    expect(iconsArray[0].props.showIcon).toBe(false);
    expect(iconsArray[1].props.showIcon).toBe(false);
  });
});
