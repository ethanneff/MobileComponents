import React from "react";
import InteractionLink from "..";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";

describe("InteractionLink", () => {
  const phoneTypeInteractionLink = (
    <InteractionLink text="123456789" type="phone" />
  );
  const emailTypeInteractionLink = (
    <InteractionLink text="gaben@valvesoftware.com" type="email" />
  );
  const navigateTypeInteractionLink = (
    <InteractionLink text="gaben@valvesoftware.com" type="navigate" route="" />
  );
  const textTypeInteractionLink = (
    <InteractionLink text="123456789" type="text" />
  );

  it("enable button if phone, email, text or navigate", () => {
    const phoneType = testRender(phoneTypeInteractionLink);
    const emailType = testRender(emailTypeInteractionLink);
    const navigateType = testRender(navigateTypeInteractionLink);
    const textType = testRender(textTypeInteractionLink);

    expect(
      phoneType.tree.root.findByProps({ testID: "contentButton" })
    ).toBeTruthy();
    expect(
      emailType.tree.root.findByProps({ testID: "contentButton" })
    ).toBeTruthy();
    expect(
      navigateType.tree.root.findByProps({ testID: "contentButton" })
    ).toBeTruthy();
    expect(
      textType.tree.root.findByProps({ testID: "contentPlainText" })
    ).toBeTruthy();
  });

  it("copy/paste is enabled for phone and email text", () => {
    const phoneType = testRender(phoneTypeInteractionLink);
    const emailType = testRender(emailTypeInteractionLink);

    expect(
      phoneType.tree.root.findByProps({ testID: "contentButton" }).props
        .children.props.selectable
    ).toBeTruthy();
    expect(
      emailType.tree.root.findByProps({ testID: "contentButton" }).props
        .children.props.selectable
    ).toBeTruthy();
  });

  it("copy/paste is not enabled for navigate", () => {
    const navigateType = testRender(navigateTypeInteractionLink);

    expect(
      navigateType.tree.root.findByProps({ testID: "contentButton" }).props
        .children.props.selectable
    ).toBeFalsy();
  });
});
