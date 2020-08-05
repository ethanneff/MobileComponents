import React, { MutableRefObject } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import Icon from "../Icon";
import Text from "../Text";

const isTablet = DeviceInfo.isTablet();
const styles = StyleSheet.create({
  label: {
    width: "100%",
    paddingLeft: Theme.padding.p1,
    paddingBottom: Theme.padding.p1
  },
  input: {
    borderWidth: 2,
    lineHeight: undefined,
    borderColor: Theme.color.neutral100,
    borderRadius: Theme.sizing.inputBorderRadius,
    padding: isTablet ? Theme.padding.p4 : Theme.padding.p3,
    backgroundColor: Theme.color.neutral0,
    minHeight: isTablet ? Theme.padding.p15 : Theme.padding.p12
  },
  container: {
    width: "100%",
    alignSelf: "center"
  },
  header: {
    paddingVertical: Theme.padding.p2
  },
  error: {
    borderColor: Theme.color.error
  },
  alignRight: {
    textAlign: "right"
  },
  alignLeft: {
    textAlign: "left"
  },
  headerDisabled: {
    opacity: Theme.sizing.disabledOpacity
  },
  disabled: {
    color: Theme.color.neutral100
  },
  borderFocus: {
    borderBottomWidth: 2,
    borderColor: Theme.color.primary200
  },
  invisible: {
    opacity: 0
  },
  quarter: {
    width: "25%"
  },
  multiline: {
    textAlignVertical: "top",
    height: Theme.padding.p39
  },
  passwordContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  passwordError: {
    flexBasis: "100%"
  },
  passwordInput: {
    flex: 1,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  disabledIcon: {
    opacity: 0.2
  },
  showHidePassword: {
    display: "flex",
    paddingRight: 12,
    paddingLeft: 7,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: Theme.color.neutral0,
    borderColor: Theme.color.neutral100,
    borderWidth: 2,
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderTopRightRadius: Theme.padding.p2,
    borderBottomRightRadius: Theme.padding.p2
  }
});

export enum KeyboardType {
  Default = "default",
  Number = "number-pad",
  Decimal = "decimal-pad",
  Numeric = "numeric",
  Email = "email-address",
  Phone = "phone-pad"
}

export enum ReturnKeyType {
  Done = "done",
  Go = "go",
  Next = "next",
  Search = "search",
  Send = "send"
}

type TextContentType = "none" | "username" | "password";

interface Props {
  accessibilityLabel?: string;
  testID?: string;
  value: string;
  placeholder?: string;
  label?: string;

  alignRight?: boolean;
  alignLeft?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  blurOnSubmit?: boolean;
  autoCorrect?: boolean;
  capitalized?: boolean;
  secureText?: boolean;
  isDisableFullscreenUI?: boolean;
  quarter?: boolean;
  regex?: string;
  autoFocus?: boolean;
  maxLength?: number;
  textContentType?: TextContentType;

  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyType;

  containerStyle?: ViewStyle | {};
  inputStyle?: ViewStyle | {};

  error?: boolean;
  errorMessage?: string;
  errorHint?: string;
  reference?: MutableRefObject<TextInput | null>;

  onChange(value: string): void;
  onSubmitEditing?(): void;
  onEndEditing?(): void;
}

interface State {
  isFocused: boolean;
  secureTextEntry: boolean;
  showHideIcon: string;
}

class Input extends React.PureComponent<Props, State> {
  state = {
    isFocused: false,
    secureTextEntry: this.props.secureText || false,
    showHideIcon: "eye"
  };

  changeFocusStateBlur = () => {
    this.setState({ isFocused: false });
  };

  changeFocusStateFocus = () => {
    this.setState({ isFocused: true });
  };

  onChange = (val: string) => {
    const { onChange, regex } = this.props;
    if (regex && !RegExp(regex).test(val)) {
      return;
    }
    onChange(val);
  };

  toggleShowHidePassword = () => {
    const showHideIcon = this.state.secureTextEntry ? "eye-off" : "eye";

    this.setState(prevState => ({
      secureTextEntry: !prevState.secureTextEntry,
      showHideIcon
    }));
  };

  render() {
    const {
      containerStyle,
      accessibilityLabel = strings("globalAccessibility.input"),
      testID = "InputTextInput",
      hidden,
      alignRight,
      alignLeft,
      capitalized,
      editable = true,
      placeholder = "placeholder",
      multiline,
      numberOfLines,
      autoCorrect,
      quarter,
      inputStyle,
      keyboardType,
      returnKeyType = ReturnKeyType.Done,
      value,
      selectTextOnFocus,
      error,
      reference,
      blurOnSubmit = true,
      isDisableFullscreenUI = true,
      errorMessage = strings("input.error"),
      errorHint = strings("globalAccessibility.inputErrorMessageHint"),
      onSubmitEditing,
      onEndEditing,
      textContentType = "none",
      invisible,
      autoFocus,
      maxLength,
      label
    } = this.props;
    const { isFocused, secureTextEntry, showHideIcon } = this.state;
    const isPasswordType = textContentType === "password";

    const errorStyles = [isPasswordType ? styles.passwordError : undefined];
    const inputStyles = [
      Theme.fontSize.body,
      styles.input,
      alignRight ? styles.alignRight : undefined,
      alignLeft ? styles.alignLeft : undefined,
      isFocused ? styles.borderFocus : undefined,
      quarter ? styles.quarter : undefined,
      error ? styles.error : undefined,
      !editable ? styles.disabled : undefined,
      multiline ? styles.multiline : undefined,
      isPasswordType ? styles.passwordInput : undefined,
      inputStyle
    ];
    const containerStyles = [
      styles.container,
      invisible ? styles.invisible : undefined,
      isPasswordType ? styles.passwordContainer : undefined,
      containerStyle
    ];
    const disabledIcon = [!editable ? styles.disabledIcon : undefined];
    const showHidePasswordStyles = [
      styles.showHidePassword,
      isFocused ? styles.borderFocus : undefined,
      error ? styles.error : undefined
    ];

    return hidden ? null : (
      <View style={containerStyles} testID="inputContainer">
        <Text h5 title={label} style={styles.label} />
        <TextInput
          textContentType={textContentType}
          testID={testID}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={!error ? undefined : errorHint}
          disableFullscreenUI={isDisableFullscreenUI}
          underlineColorAndroid="transparent"
          selectTextOnFocus={selectTextOnFocus}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoCapitalize={capitalized ? "sentences" : "none"}
          editable={editable}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          selectionColor={Theme.color.primary200}
          placeholder={placeholder}
          placeholderTextColor={Theme.color.neutral300}
          autoCorrect={isPasswordType ? false : autoCorrect}
          onFocus={this.changeFocusStateFocus}
          onBlur={this.changeFocusStateBlur}
          style={inputStyles}
          ref={reference}
          blurOnSubmit={blurOnSubmit}
          value={value}
          returnKeyType={returnKeyType}
          onChangeText={this.onChange}
          onSubmitEditing={onSubmitEditing}
          onEndEditing={onEndEditing}
          autoFocus={autoFocus}
          maxLength={maxLength}
        />
        {isPasswordType && (
          <TouchableOpacity
            onPress={this.toggleShowHidePassword}
            style={showHidePasswordStyles}
            activeOpacity={1}
            disabled={!editable}
          >
            <Icon
              name={showHideIcon}
              style={disabledIcon}
              testID="ShowHideIcon"
              accessibilityRole="imagebutton"
              accessibilityLabel={
                showHideIcon === "eye"
                  ? strings("login.accessibility.showPasswordButton")
                  : strings("login.accessibility.hidePasswordButton")
              }
            />
          </TouchableOpacity>
        )}
        <Text
          invisible={!error || errorMessage.length === 0}
          title={errorMessage}
          error
          accessibilityLabel={strings("globalAccessibility.inputErrorMessage")}
          testID="inputErrorMessage"
          style={errorStyles}
        />
      </View>
    );
  }
}

export default Input;
