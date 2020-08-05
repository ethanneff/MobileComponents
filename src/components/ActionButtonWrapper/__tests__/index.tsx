import React from "react";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import * as DeviceInfoUtils from "../../../commons/Utils/DeviceInfo";
import Theme from "../../../commons/Theme";
import ActionButtonWrapper from "..";
import Button from "../../Button";

const getDeviceSizeSpy = jest.spyOn(DeviceInfoUtils, "getDeviceSize");

describe("ActionButtonWrapper Component", () => {
  describe("on tablet", () => {
    beforeEach(() => getDeviceSizeSpy.mockReturnValue("tablet"));
    afterEach(() => jest.clearAllMocks());

    it("renders correctly", () => {
      const {
        tree: { root }
      } = testRender(
        <ActionButtonWrapper>
          <Button title="SAVE" />
          <Button title="CANCEL" />
        </ActionButtonWrapper>
      );

      const primaryButton = root.findByProps({ title: "SAVE" });
      const secondaryButton = root.findByProps({ title: "CANCEL" });
      const containerStyles = root.findByProps({ testID: "buttonBarWrapper" })
        .props.style[2];
      const secondaryBtnWrapper = root.findByProps({
        testID: "secondaryButtonWrapper"
      });
      const secondaryButtonRightMargin =
        secondaryBtnWrapper.props.style[1].marginRight;

      expect(primaryButton).toBeDefined();
      expect(secondaryButton).toBeDefined();
      expect(containerStyles).toStrictEqual({
        flexDirection: "row-reverse",
        height: Theme.padding.p30,
        padding: Theme.padding.p8
      });
      expect(secondaryButtonRightMargin).toBe(Theme.padding.p6);
    });
  });

  describe("on mobile", () => {
    beforeEach(() => getDeviceSizeSpy.mockReturnValue("mobile"));
    afterEach(() => jest.clearAllMocks());

    it("renders correctly", () => {
      const {
        tree: { root }
      } = testRender(
        <ActionButtonWrapper>
          <Button title="SAVE" />
          <Button title="CANCEL" />
        </ActionButtonWrapper>
      );

      const primaryButton = root.findByProps({ title: "SAVE" });
      const secondaryButton = root.findByProps({ title: "CANCEL" });
      const containerStyles = root.findByProps({ testID: "buttonBarWrapper" })
        .props.style[2];
      const secondaryBtnWrapper = root.findByProps({
        testID: "secondaryButtonWrapper"
      });
      const secondaryButtonRightMargin =
        secondaryBtnWrapper.props.style[1].marginRight;

      expect(primaryButton).toBeDefined();
      expect(secondaryButton).toBeDefined();
      expect(containerStyles).toStrictEqual({
        flexDirection: "column",
        paddingVertical: Theme.padding.p4
      });
      expect(secondaryButtonRightMargin).toBe(Theme.padding.p0);
    });
  });

  describe("on small", () => {
    beforeEach(() => getDeviceSizeSpy.mockReturnValue("small"));
    afterEach(() => jest.clearAllMocks());

    it("renders correctly", () => {
      const {
        tree: { root }
      } = testRender(
        <ActionButtonWrapper>
          <Button title="SAVE" />
          <Button title="CANCEL" />
        </ActionButtonWrapper>
      );

      const primaryButton = root.findByProps({ title: "SAVE" });
      const secondaryButton = root.findByProps({ title: "CANCEL" });
      const containerStyles = root.findByProps({ testID: "buttonBarWrapper" })
        .props.style[2];
      const secondaryBtnWrapper = root.findByProps({
        testID: "secondaryButtonWrapper"
      });
      const secondaryButtonMargin = secondaryBtnWrapper.props.style[1];

      expect(primaryButton).toBeDefined();
      expect(secondaryButton).toBeDefined();
      expect(containerStyles).toStrictEqual({
        paddingVertical: Theme.padding.p3
      });
      expect(secondaryButtonMargin).toStrictEqual({
        marginTop: Theme.padding.p3,
        marginRight: Theme.padding.p0
      });
    });
  });
});
