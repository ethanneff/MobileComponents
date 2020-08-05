import React from "react";
import { SinonSpy, spy } from "sinon";
import { act } from "@testing-library/react-native";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import { renderWithProviders } from "../../../commons/Utils/TestUtils/react-testing-library";
import * as updateSelectors from "../../../commons/Store/ControlledUpdate/selectors";
import * as analyticsUtils from "../../../commons/Analytics";
import AppVersionItem from "../AppVersionItem";
import Button from "../../Button";

const item = {
  id: "version",
  title: "App update",
  subtitle: "99.99",
  description: "Update available"
};

let mixpanelSpy: SinonSpy;

describe("AppVersionItem", () => {
  describe("with a new release", () => {
    beforeEach(() => {
      jest
        .spyOn(updateSelectors, "getShouldRenderUpdateAvailableLink")
        .mockReturnValue(true);
    });

    afterEach(() => jest.clearAllMocks());

    it("renders the 'Update available' link when an update is available", () => {
      const {
        tree: { root }
      } = testRender(<AppVersionItem item={item} style={{}} />);
      const updateLink = root.findByType(Button);

      expect(updateLink).toBeDefined();
      expect(
        updateLink.findByProps({ title: "Update available" })
      ).toBeDefined();
    });

    it("should navigate to the UpdateDetails screen on press", () => {
      const { queryByTestId, navigation } = renderWithProviders(
        <AppVersionItem item={item} style={{}} />
      );
      const updateLink = queryByTestId("versionItemDescription");

      act(() => updateLink?.props.onPress());

      expect(navigation.navigate).toHaveBeenCalledWith("UpdateDetails");
    });

    it("sends a mixpanel event on press", () => {
      mixpanelSpy = spy(analyticsUtils, "track");
      const linkEvent =
        analyticsUtils.Event.ControlledUpdateDetailsViewedFromAccount;
      const { queryByTestId } = renderWithProviders(
        <AppVersionItem item={item} style={{}} />
      );
      const updateLink = queryByTestId("versionItemDescription");

      act(() => updateLink?.props.onPress());

      expect(mixpanelSpy.lastCall.args[0]).toEqual(linkEvent);
    });
  });

  describe("without a new release", () => {
    beforeEach(() => {
      jest
        .spyOn(updateSelectors, "getShouldRenderUpdateAvailableLink")
        .mockReturnValue(false);
    });

    afterEach(() => jest.clearAllMocks());

    it("should return null if getShould RenderUpdateAvailableLink selector is false", () => {
      const { queryByLabelText } = renderWithProviders(
        <AppVersionItem item={item} style={{}} />
      );
      const updateLink = queryByLabelText("App update available");

      expect(updateLink).toBeNull();
    });
  });
});
