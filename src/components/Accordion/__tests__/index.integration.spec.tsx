import React from "react";
import { act, fireEvent } from "@testing-library/react-native";
import { renderWithProviders } from "../../../commons/Utils/TestUtils/react-testing-library";
import Accordion from "..";

jest.useFakeTimers();

describe("Accordion integration", () => {
  it("correctly expands", () => {
    const { getAllByTestId, getByText } = renderWithProviders(
      <Accordion
        title={"Title"}
        items={[
          { title: "Item 1", content: "Body" },
          { title: "Item 2", content: "Body" }
        ]}
      />
    );

    const sections = getAllByTestId("accordionTouchable");

    fireEvent.press(sections[0]);
    act(() => {
      jest.runAllTimers();
    });

    expect(getByText("Title")).toBeDefined();
    expect(getByText("Item 1")).toBeDefined();
    expect(getByText("Item 2")).toBeDefined();
  });
});
