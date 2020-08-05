import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Theme from "../../commons/Theme";
import Text from "../Text";
import { InteractionLinkContent } from "../../components/InteractionLink/utils";
import InteractionLink from "../InteractionLink";

interface Props {
  length: number;
  paragraph: InteractionLinkContent;
  index: number;
}

type Paragraphs = InteractionLinkContent[];

export interface Section {
  title?: string;
  testID?: string;
  paragraphs: Paragraphs;
}

export default memo(function Paragraph({ length, paragraph, index }: Props) {
  const isPlainText =
    paragraph.type !== "email" &&
    paragraph.type !== "phone" &&
    paragraph.type !== "navigate";
  const route =
    paragraph.type === "navigate" && paragraph.route ? paragraph.route : "";
  const styles = StyleSheet.create({
    section: {
      paddingBottom: index !== length - 1 ? Theme.padding.p4 : Theme.padding.p0
    },
    container: { minHeight: Theme.padding.p12 }
  });

  return isPlainText ? (
    <View style={styles.container} testID="plainTextWrap">
      <Text
        title={paragraph.message}
        testID="contentText"
        style={styles.section}
      />
    </View>
  ) : (
    <InteractionLink
      text={paragraph.message}
      type={paragraph.type}
      route={route}
      textStyles={styles.section}
    />
  );
});
