import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import Text from "../Text";
import { SurveyInput, SurveyInputItem } from "./Input";
import { SurveyOption } from "./Option";

export interface SurveyItem {
  id: string;
  title: string;
  instructions?: string;
  subtitle?: string;
  optionalWithoutText?: boolean;
  optional?: boolean;
  testID: string;
  type: SurveyInput;
  value: string;
  values?: string[];
  noTitle?: boolean;
  valueHidden?: boolean;
  valuePercent?: boolean;
  horizontal?: boolean;
  quarter?: boolean;
  regex?: string;
  alignLeft?: boolean;
  notUppercase?: boolean;
  previousValue?: string;
  options?: SurveyOption;
  minValue?: number;
  maxValue?: number;
  minValueText?: string;
  maxValueText?: string;
  placeholder?: string;
  error?: boolean;
  hidden?: boolean;
  hasChanged: boolean;
  onChange(value: string): void;
  onPress?(): void;
  onChangeValue?(value: string): void;
}

interface Props {
  item: SurveyItem;
}

export const SurveyItem = memo(function SurveyItemMemo({ item }: Props) {
  const key = "survey.options.";
  const styles = StyleSheet.create({
    item: {
      paddingBottom: Theme.padding.p12
    },
    error: {
      paddingVertical: Theme.padding.p1
    },
    subtitle: {
      paddingTop: Theme.padding.p4
    },
    optional: {
      color: Theme.color.neutral700
    }
  });

  return item.hidden ? null : (
    <View key={item.id} style={styles.item}>
      <Text
        testID={`${item.id}-instructions`}
        markdown
        hidden={!item.instructions}
        h4
        title={item.instructions}
        style={styles.item}
      />
      <Text
        markdown
        h4
        title={item.title}
        hidden={item.noTitle}
        testID={`${item.id}-title`}
      />
      <Text
        testID={`${item.id}-optional`}
        markdown
        hidden={!item.optional}
        caption
        title={strings(`${key}optional`)}
        style={styles.optional}
      />
      <Text
        testID={`${item.id}-subtitle`}
        markdown
        caption
        title={item.subtitle}
        hidden={!item.subtitle}
        style={styles.subtitle}
      />
      <Text
        testID={`${item.id}-error`}
        markdown
        error
        hidden={item.noTitle}
        title={strings("input.error")}
        invisible={!item.error}
        style={styles.error}
      />
      <SurveyInputItem item={item} />
    </View>
  );
});
