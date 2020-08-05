import React from "react";
import { Image } from "react-native";
import { act } from "react-test-renderer";
import SummaryList, { SummaryListItem } from "..";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";

const summaryListItems: SummaryListItem[] = [
  {
    title: "Exercise therapy",
    count: 1
  },
  {
    title: "Log your health",
    count: 1
  },
  {
    title: "Education",
    count: 1
  }
];

jest.useFakeTimers();
describe("SummaryList", () => {
  it("renders SummaryList correctly", () => {
    const { tree } = testRender(<SummaryList items={summaryListItems} />);
    const summaryListProps = tree.root.findByType(SummaryList).props;
    expect(summaryListProps.items).toEqual(summaryListItems);
  });

  it("renders SummaryList with icons correctly", () => {
    const { tree } = testRender(
      <SummaryList items={summaryListItems} currentIndex={2} />
    );
    act(() => {
      jest.runAllTimers();
    });
    const checkIconComponents = tree.root.findAllByType(Image);
    expect(checkIconComponents).toHaveLength(2);
  });
});
