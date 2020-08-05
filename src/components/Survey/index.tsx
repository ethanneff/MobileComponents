import React, { memo, useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { strings } from "../../commons/Locales";
import {
  getCurrentHealthSurveyCount,
  getCurrentHealthSurveyIndex,
  useRootSelector
} from "../../commons/Store/selectors";
import Theme from "../../commons/Theme";
import Button from "../Button";
import Text from "../Text";
import { SurveyItem } from "./Item";
import { Option, SurveyOption } from "./Option";

export interface SurveyLocale {
  title: string;
  subtitle?: string;
  description?: string;
  items: Array<{
    title: string;
    subtitle?: string;
    instructions?: string;
    min?: string;
    max?: string;
    placeholder?: string;
  }>;
}

interface Props {
  title: string;
  caption?: string;
  subtitle?: string;
  description?: string;
  items: SurveyItem[];
  testID?: string;
  onRef?(ref: FlatList<SurveyItem>): void;
  onSubmit(): void;
}

const Survey = memo(function SurveyMemo({
  title,
  caption,
  subtitle,
  description,
  items,
  testID,
  onRef,
  onSubmit
}: Props) {
  const count = useRootSelector(getCurrentHealthSurveyCount);
  const index = useRootSelector(getCurrentHealthSurveyIndex);
  const styles = StyleSheet.create({
    gutter: {
      paddingHorizontal: Theme.sizing.gutter
    },
    submit: {
      marginBottom: Theme.padding.p8
    },
    description: {
      marginTop: Theme.padding.p2,
      marginBottom: Theme.padding.p8
    },
    subtitle: {
      paddingBottom: description ? Theme.padding.p4 : Theme.padding.p10
    },
    caption: {
      paddingBottom: Theme.padding.p2
    },
    title: {
      paddingBottom: Theme.padding.p2
    }
  });

  const captionText = strings("survey.caption", {
    currentPage: index + 1,
    totalPages: count
  });
  const submitText = strings("buttonText.save");

  const keyExtractor = useCallback((item: SurveyItem) => item.id, []);

  const renderItem = useCallback(({ item }) => <SurveyItem item={item} />, []);

  return (
    <FlatList
      testID={testID}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.gutter}
      ref={onRef}
      initialNumToRender={20}
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={
        <>
          <Text
            title={caption || captionText}
            caption
            testID="surveyCaption"
            invisible={!(caption || captionText)}
            style={styles.caption}
          />
          <Text title={title} h2 testID="surveyTitle" style={styles.title} />
          {subtitle && (
            <Text
              h4
              title={subtitle}
              style={styles.subtitle}
              testID="surveySubtitle"
            />
          )}
          {description && (
            <Text
              title={description}
              style={styles.description}
              caption
              testID="surveyDescription"
            />
          )}
        </>
      }
      ListFooterComponent={
        <Button
          testID={`${testID}-submit`}
          styleContainer={styles.submit}
          half
          title={submitText}
          onPress={onSubmit}
        />
      }
    />
  );
});

export { SurveyOption, SurveyItem, Survey, Option };
