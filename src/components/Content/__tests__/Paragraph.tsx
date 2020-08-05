import React from "react";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import Paragraph from "../Paragraph";

describe("Paragraph component", () => {
  it("renders text as text when type is not phone, email or navigate", () => {
    const noTypeParagraph = (
      <Paragraph
        paragraph={{ message: "hello world" }}
        length={20}
        index={18}
      />
    );
    const noType = testRender(noTypeParagraph);

    expect(
      noType.tree.root.findByProps({ testID: "plainTextWrap" })
    ).toBeTruthy();
  });

  it("enable button if phone, email, or navigate", () => {
    const phoneTypeParagraph = (
      <Paragraph
        paragraph={{ message: "hello world", type: "phone" }}
        length={20}
        index={18}
      />
    );
    const emailTypeParagraph = (
      <Paragraph
        paragraph={{ message: "hello world", type: "email" }}
        length={20}
        index={18}
      />
    );
    const navigateTypeParagraph = (
      <Paragraph
        paragraph={{
          message: "hello world",
          type: "navigate",
          route: "someRoute"
        }}
        length={20}
        index={18}
      />
    );

    const phoneType = testRender(phoneTypeParagraph);
    const emailType = testRender(emailTypeParagraph);
    const navigateType = testRender(navigateTypeParagraph);

    expect(
      phoneType.tree.root.findByProps({ testID: "contentButton" })
    ).toBeTruthy();
    expect(
      emailType.tree.root.findByProps({ testID: "contentButton" })
    ).toBeTruthy();
    expect(
      navigateType.tree.root.findByProps({ testID: "contentButton" })
    ).toBeTruthy();
  });

  it("color text if button is enabled", () => {
    const yesColor1Paragraph = (
      <Paragraph
        paragraph={{ message: "hello world", type: "phone" }}
        length={20}
        index={18}
      />
    );
    const yesColor2Paragraph = (
      <Paragraph
        paragraph={{
          message: "hello world",
          type: "navigate",
          route: "someRoute"
        }}
        length={20}
        index={18}
      />
    );
    const noColorParagraph = (
      <Paragraph
        paragraph={{ message: "hello world", type: "text" }}
        length={20}
        index={18}
      />
    );

    const yesColor1 = testRender(yesColor1Paragraph);
    const yesColor2 = testRender(yesColor2Paragraph);
    const noColor = testRender(noColorParagraph);

    expect(
      yesColor1.tree.root.findByProps({ testID: "contentText" }).props.link
    ).toBe(true);
    expect(
      yesColor2.tree.root.findByProps({ testID: "contentText" }).props.link
    ).toBe(true);
    expect(
      noColor.tree.root.findByProps({ testID: "contentText" }).props.link
    ).toBe(undefined);
  });
});
