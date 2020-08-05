import React from "react";
import { StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import Button from "../Button";
import { Option } from "../Survey";
import Text from "../Text";

interface Props {
  testID?: string;
  value?: string;
  hidden?: boolean;
  invisible?: boolean;
  alignLeft?: boolean;
  notUppercase?: boolean;
  options: Option[];
  horizontal?: boolean;
  quarter?: boolean;
  minValueText?: string;
  maxValueText?: string;
  noFlex?: boolean;
  disable?: boolean;
  onChange(value: string): void;
}

class Radio extends React.PureComponent<Props> {
  readonly styles = StyleSheet.create({
    flex: {
      flex: 1
    },
    quarter: {
      width: "25%"
    },
    horizontal: {
      flexDirection: "row"
    },
    space: {
      justifyContent: "space-between"
    },
    optionSpace: {
      marginTop: Theme.padding.p2
    },
    subtextSpace: {
      marginTop: Theme.padding.p4
    },
    invisible: {
      opacity: 0
    }
  });
  readonly isTablet = DeviceInfo.isTablet();

  optionChange = (option: Option) => () => this.props.onChange(option.value);

  render() {
    const {
      testID = "radio",
      options,
      value,
      hidden,
      alignLeft,
      notUppercase,
      invisible,
      horizontal,
      quarter,
      minValueText,
      maxValueText,
      noFlex,
      disable
    } = this.props;
    const horizontalTablet = horizontal && (this.isTablet || quarter);
    const containerStyles = [
      horizontalTablet ? this.styles.horizontal : undefined
    ];
    const subtextStyles = [
      this.styles.horizontal,
      this.styles.space,
      minValueText || maxValueText ? this.styles.subtextSpace : undefined
    ];
    const buttonContainerStyles = quarter
      ? this.styles.quarter
      : !noFlex
      ? this.styles.flex
      : undefined;
    const last = options.length - 1;
    return hidden ? null : (
      <View style={invisible && this.styles.invisible}>
        <View style={containerStyles}>
          {options.map((option: Option, index: number) => (
            <Button
              caption
              radio
              radioMiddle={horizontalTablet && index !== 0 && index !== last}
              radioLeft={horizontalTablet && index === 0}
              radioRight={horizontalTablet && index === last}
              testID={`${testID}-${option.value}`}
              key={option.value}
              styleContainer={[
                buttonContainerStyles,
                index !== 0 && !horizontalTablet && this.styles.optionSpace
              ]}
              radioFull={!horizontalTablet}
              radioSelected={option.value === value}
              notBold={option.value !== value}
              title={option.name}
              alignLeft={alignLeft}
              notUppercase={notUppercase}
              onPress={this.optionChange(option)}
              disable={disable}
            />
          ))}
        </View>
        <View style={subtextStyles}>
          <Text
            hidden={!minValueText || !horizontalTablet}
            title={minValueText}
            caption
          />
          <Text
            hidden={!maxValueText || !horizontalTablet}
            title={maxValueText}
            caption
          />
        </View>
      </View>
    );
  }
}

export default Radio;
