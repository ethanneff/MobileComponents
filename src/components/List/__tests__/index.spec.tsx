import React from "react";
import { render } from "@testing-library/react-native";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import Component, { ListItem } from "..";

describe("List component", () => {
  const items: ListItem[] = [
    { id: "1", title: "1", onPress: () => undefined },
    { id: "2", title: "2", onPress: () => undefined, accessoryIcon: true },
    { id: "3", title: "3", onPress: () => undefined, icon: "check" },
    { id: "4", title: "4", onPress: () => undefined, subtitle: "test" }
  ];

  const itemsWithDisabledProp: ListItem[] = [
    { id: "1", title: "1", onPress: () => undefined, disabled: true }
  ];

  const listTestID = "listTestId";

  it("renders list and items", () => {
    const { getByTestId } = render(
      <Component items={items} testID={listTestID} />
    );
    expect(getByTestId(listTestID)).toBeTruthy();
    items.forEach(item => {
      expect(getByTestId(item.id)).toBeTruthy();
    });
  });

  it("doesn't render hidden items", () => {
    const hiddenItem = {
      id: "6",
      title: "6",
      onPress: () => undefined,
      hidden: true
    };
    const itemsWithHidden = [hiddenItem, ...items];
    const { getByTestId } = render(
      <Component items={itemsWithHidden} testID={listTestID} />
    );
    expect(getByTestId(listTestID)).toBeTruthy();
    expect(() => getByTestId(hiddenItem.id)).toThrow();
  });

  it("renders nothing on hidden", () => {
    const { getByTestId } = render(
      <Component items={items} testID={listTestID} hidden />
    );
    expect(() => getByTestId(listTestID)).toThrow();
    items.forEach(item => {
      expect(() => getByTestId(item.id)).toThrow();
    });
  });

  it("disables TouchableOpacity when disabled prop is passed", () => {
    const { getByTestId } = render(
      <Component items={itemsWithDisabledProp} testID={listTestID} />
    );
    expect(getByTestId(itemsWithDisabledProp[0].id).getProp("disabled")).toBe(
      true
    );
  });

  it("renders topBorder on first item", () => {
    const { getByTestId } = render(
      <Component items={items} testID={listTestID} topBorder />
    );
    const borderStyle = { borderTopWidth: 1 };
    expect(getByTestId(items[0].id).parentNode.getProp("style")).toMatchObject(
      borderStyle
    );
    expect(
      getByTestId(items[1].id).parentNode.getProp("style")
    ).not.toMatchObject(borderStyle);
  });

  it("renders version view if id is 'version'", () => {
    const itemsWithVersionItem = [
      ...items,
      {
        id: "version",
        title: "App update",
        subtitle: "99.99",
        description: "Update available"
      }
    ];
    const { tree } = testRender(
      <Component items={itemsWithVersionItem} testID={"version"} />
    );
    const versionListItem = tree.root.findByProps({
      testID: "version"
    });

    expect(versionListItem).toBeDefined();
  });
});
