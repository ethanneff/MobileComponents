import { render } from "@testing-library/react-native";
import React from "react";
import Accordion from "..";

describe(Accordion, () => {
  it("renders correctly without errors", () => {
    const { getByText } = render(
      <Accordion
        title={"Title"}
        items={[
          { title: "Item 1", content: "Body" },
          { title: "Item 2", content: "Body" }
        ]}
      />
    );

    expect(getByText("Title")).toBeTruthy();
    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
  });
});
