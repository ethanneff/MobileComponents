import React, { memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Theme from "../../commons/Theme";
import { InteractionLinkContent } from "../InteractionLink/utils";
import Text from "../Text";
import Paragraph, { Section } from "./Paragraph";

interface Props {
  testID?: string;
  sections: Sections;
  style?: ViewStyle;
}

export type Sections = Section[];

export default memo(function ContentText({ testID, sections, style }: Props) {
  const styles = StyleSheet.create({
    container: { padding: Theme.sizing.gutter },
    paragraph: { paddingBottom: Theme.padding.p4 }
  });

  return (
    <View style={[styles.container, style]} testID={testID || "content"}>
      {sections.map((section: Section, sectionIndex: number) => (
        <View key={`${section.title}${sectionIndex}`} style={styles.paragraph}>
          <Text
            title={section.title}
            h4
            testID={`sectionTitle-${section.title}`}
          />
          {section.paragraphs.map(
            (paragraph: InteractionLinkContent, index: number) => (
              <Paragraph
                paragraph={paragraph}
                length={section.paragraphs.length}
                index={index}
                key={`${paragraph.message}${index}`}
              />
            )
          )}
        </View>
      ))}
    </View>
  );
});
