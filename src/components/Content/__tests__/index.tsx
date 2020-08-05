import React from "react";
import Component, { Sections } from "..";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";

describe("Content component", () => {
  const sections: Sections = [
    {
      title: "normal",
      paragraphs: [{ message: "basic" }, { message: "influencer" }]
    },
    {
      paragraphs: [{ message: "no title" }, { message: "multiple paragraphs" }]
    },
    { title: "no paragraphs", paragraphs: [] },
    {
      title: "phone example",
      paragraphs: [{ message: "et phone home", type: "phone" }]
    },
    {
      title: "email example",
      paragraphs: [{ message: "you got mail", type: "email" }]
    },
    {
      title: "navigate example",
      paragraphs: [
        {
          message: "navigating like ships in the night",
          type: "navigate",
          route: "capeHorn"
        }
      ]
    }
  ];

  it("renders correctly", () => {
    const { tree } = testRender(
      <Component sections={sections} testID="hello" />
    );
    expect(tree.root.findByProps({ testID: "hello" })).toBeDefined();
    expect(
      tree.root.findByProps({ testID: "sectionTitle-normal" })
    ).toBeDefined();
  });
});
