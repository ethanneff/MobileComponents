import React, { memo } from "react";
import CheckBox from "../CheckBox";
import Dropdown from "../Dropdown";
import TextInput, { KeyboardType } from "../Input";
import Radio from "../Radio";
import Slider from "../Slider";
import { SurveyItem } from "./Item";
import { getSurveyOptions } from "./Option";

export type SurveyInput =
  | "Dropdown"
  | "Radio"
  | "Slider"
  | "Textarea"
  | "Numeric"
  | "Checkbox";

interface Props {
  item: SurveyItem;
}

export const SurveyInputItem = memo(function SurveyInputItemMemo({
  item
}: Props) {
  const onSliderChange = (value: number) => item.onChange(String(value));

  switch (item.type) {
    case "Checkbox":
      return (
        <CheckBox
          title={item.title}
          testID={item.testID}
          checked={item.value === "1"}
          onChange={checked => item.onChange(checked ? "1" : "0")}
        />
      );
    case "Radio":
      return (
        <Radio
          testID={item.testID}
          horizontal={item.horizontal}
          quarter={item.quarter}
          value={item.value}
          options={getSurveyOptions(item.options)}
          onChange={item.onChange}
          alignLeft={item.alignLeft}
          notUppercase={item.notUppercase}
          minValueText={item.minValueText}
          maxValueText={item.maxValueText}
        />
      );
    case "Textarea":
      return (
        <TextInput
          accessibilityLabel={item.title}
          testID={item.testID}
          hidden={item.hidden}
          multiline
          error={item.error}
          errorMessage="" // TODO: GOAT-671 remove once sign in error states are fixed
          value={item.value}
          placeholder={item.placeholder}
          onChange={item.onChange}
        />
      );
    case "Numeric":
      return (
        <TextInput
          accessibilityLabel={item.title}
          testID={item.testID}
          selectTextOnFocus
          keyboardType={KeyboardType.Numeric}
          placeholder={item.placeholder}
          onChange={item.onChange}
          errorMessage="" // TODO: GOAT-671 remove once sign in error states are fixed
          value={item.value}
          regex={item.regex}
          quarter
        />
      );
    case "Slider":
      return (
        <Slider
          testID={item.testID}
          previousValue={Number(item.previousValue)}
          valuePercent={item.valuePercent}
          value={Number(item.value)}
          valueHidden={item.valueHidden}
          onChange={onSliderChange}
          maxValue={item.maxValue}
          minValueText={item.minValueText}
          maxValueText={item.maxValueText}
        />
      );
    case "Dropdown":
      return (
        <Dropdown
          testID={item.testID}
          hidden={item.hidden}
          placeholder={item.placeholder}
          values={item.values}
          onPress={item.onPress}
          onChangeValue={item.onChangeValue}
        />
      );
    default:
      return null;
  }
});
