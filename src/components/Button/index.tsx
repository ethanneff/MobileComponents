import React from "react";
import {
  AccessibilityState,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import Content from "./Content";
import Spinner from "./Spinner";

const isTablet = DeviceInfo.isTablet();

interface Props {
  title?: string;
  icon?: string;
  accessibilityState?: AccessibilityState;
  accessibilityHint?: string;
  accessibilityLabel?: string;
  testID?: string;
  link?: boolean;
  primary?: boolean;
  secondary?: boolean;
  outline?: boolean;
  dottedOutline?: boolean;
  background?: boolean;
  radio?: boolean;
  radioLeft?: boolean;
  radioRight?: boolean;
  radioMiddle?: boolean;
  radioFull?: boolean;
  radioSelected?: boolean;
  transparent?: boolean;
  loading?: boolean;
  half?: boolean;
  disable?: boolean;
  nonFlex?: boolean;
  clear?: boolean;
  circle?: boolean;
  fabCircle?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  notBold?: boolean;
  notUppercase?: boolean;
  alignLeft?: boolean;
  alignRight?: boolean;
  dropShadow?: boolean;
  caption?: boolean;
  deviceIsTablet?: boolean;

  styleContainer?: ViewStyle | {};
  styleIcon?: ViewStyle | {};
  styleContent?: TextStyle | {};
  styleIconSize?: number;
  styleIconColor?: string;
  styleSpinnerColor?: string;
  onPress?(): void;
}

const styles = StyleSheet.create({
  disabled: {
    opacity: Theme.sizing.disabledOpacity
  },
  nonFlex: {
    alignSelf: "center"
  },
  outline: {
    borderColor: Theme.color.neutral700,
    borderWidth: 1,
    borderRadius: Theme.sizing.borderRadius,
    backgroundColor: Theme.color.neutral0
  },
  dottedOutline: {
    borderColor: Theme.color.neutral100,
    borderWidth: 1,
    borderRadius: Theme.sizing.borderRadius,
    backgroundColor: Theme.color.neutral25,
    borderStyle: "dotted"
  },
  link: {
    backgroundColor: "transparent",
    padding: 0
  },
  primary: {
    backgroundColor: Theme.color.primary200,
    borderColor: Theme.color.primary200
  },
  secondary: {
    backgroundColor: Theme.color.neutral50,
    borderColor: Theme.color.neutral50
  },
  background: {
    backgroundColor: Theme.color.neutral0,
    borderColor: Theme.color.neutral0
  },
  transparent: {
    backgroundColor: "transparent"
  },
  fabCircle: {
    width: Theme.padding.p16,
    height: Theme.padding.p16,
    borderRadius: Theme.padding.p12
  },
  invisible: {
    opacity: 0
  },
  radio: {
    borderRadius: 6,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Theme.color.neutral100,
    backgroundColor: Theme.color.neutral50
  },
  radioLeft: {
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
    padding: Theme.padding.p3
  },
  radioRight: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftWidth: 0,
    padding: Theme.padding.p3
  },
  radioMiddle: {
    borderLeftWidth: 0,
    borderRadius: 0,
    padding: Theme.padding.p3
  },
  radioSelected: {
    backgroundColor: Theme.color.primary200
  }
});

class Button extends React.PureComponent<Props> {
  getTypography() {
    const {
      link,
      secondary,
      background,
      outline,
      dottedOutline,
      radioLeft,
      radioMiddle,
      radioRight,
      radioFull,
      transparent
    } = this.props;

    if (radioFull) {
      return undefined;
    }
    if (radioLeft) {
      return styles.radioLeft;
    }
    if (radioMiddle) {
      return styles.radioMiddle;
    }
    if (radioRight) {
      return styles.radioRight;
    }
    if (link) {
      return styles.link;
    }
    if (secondary) {
      return styles.secondary;
    }
    if (outline) {
      return styles.outline;
    }
    if (dottedOutline) {
      return styles.dottedOutline;
    }
    if (background) {
      return styles.background;
    }
    if (transparent) {
      return styles.transparent;
    }
    return styles.primary;
  }

  render() {
    const {
      onPress,
      title,
      icon,
      styleContainer,
      styleIcon,
      styleIconSize,
      styleIconColor,
      styleSpinnerColor = Theme.color.neutral900,
      styleContent,
      nonFlex,
      loading,
      disable,
      clear,
      half,
      notBold,
      alignLeft,
      alignRight,
      circle,
      fabCircle,
      accessibilityLabel,
      accessibilityHint,
      accessibilityState,
      testID,
      hidden,
      link,
      invisible,
      notUppercase,
      radioSelected,
      dropShadow,
      radio,
      caption,
      deviceIsTablet = isTablet
    } = this.props;

    const accessibilityRole = link ? "link" : "button";

    const deviceStyles = StyleSheet.create({
      half: {
        alignSelf: "center",
        width: deviceIsTablet ? "60%" : "80%"
      },
      container: {
        justifyContent: "center",
        borderRadius: Theme.sizing.borderRadius,
        padding: deviceIsTablet ? Theme.padding.p4 : Theme.padding.p3
      },
      circle: {
        borderRadius: Theme.padding.p20,
        width: deviceIsTablet ? Theme.padding.p16 : Theme.padding.p14,
        height: deviceIsTablet ? Theme.padding.p16 : Theme.padding.p14
      }
    });

    const groupStyling = [
      deviceStyles.container,
      radio ? styles.radio : undefined,
      this.getTypography(),
      radioSelected ? styles.radioSelected : undefined,
      nonFlex ? styles.nonFlex : undefined,
      half ? deviceStyles.half : undefined,
      disable ? styles.disabled : undefined,
      circle ? deviceStyles.circle : undefined,
      fabCircle ? styles.fabCircle : undefined,
      invisible ? styles.invisible : undefined,
      dropShadow ? Theme.shadows.dropShadow : undefined,
      styleContainer
    ];

    const activeOpacity = disable
      ? Theme.sizing.disabledOpacity
      : Theme.sizing.activeOpacity;
    return hidden ? null : (
      <TouchableOpacity
        style={groupStyling}
        disabled={disable}
        onPress={!disable ? onPress : undefined}
        activeOpacity={activeOpacity}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole={accessibilityRole}
        accessibilityState={accessibilityState}
      >
        <Spinner hidden={!loading} color={styleSpinnerColor} />
        <Content
          caption={caption}
          link={link}
          hidden={loading}
          clear={clear}
          title={title}
          icon={icon}
          bold={!notBold}
          alignRight={alignRight}
          alignLeft={alignLeft}
          uppercase={!notUppercase}
          iconSize={styleIconSize}
          iconColor={styleIconColor}
          styleContent={styleContent}
          styleIcon={styleIcon}
        />
      </TouchableOpacity>
    );
  }
}

export default Button;
