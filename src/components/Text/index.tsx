import React from "react";
import { Text as Original, StyleSheet, TextStyle } from "react-native";
import AnimateNumber from "../AnimateNumber/";
import Theme from "../../commons/Theme";
import CustomText, { TextBreakStrategy } from "./CustomText";

const boldMarkdown = /^\*[^\n\s]+\*$/g; // https://regex101.com/r/WLPD0v/4
const styles = StyleSheet.create({
  center: {
    textAlign: "center"
  },
  centerVertically: {
    flex: 1,
    textAlignVertical: "center"
  },
  bold: {
    fontFamily: Theme.fontWeight.bold
  },
  notBold: {
    fontFamily: Theme.fontWeight.regular
  },
  clear: {
    color: Theme.color.neutral0
  },
  invisible: {
    color: "transparent"
  }
});

interface Props {
  title?: string;

  bold?: boolean;
  clear?: boolean;
  center?: boolean;
  notBold?: boolean;
  ellipsis?: boolean;
  markdown?: boolean;
  uppercase?: boolean;
  incremental?: boolean;
  centerVertically?: boolean;
  incrementBy?: number;
  numberOfLines?: number;
  style?: TextStyle | {};
  textBreakStrategy?: TextBreakStrategy;

  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  body?: boolean;
  button?: boolean;
  caption?: boolean;
  tab?: boolean;
  overline?: boolean;
  link?: boolean;
  error?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  selectable?: boolean;
  accessibilityLabel?: string;
  accessibilityLiveRegion?: "none" | "polite" | "assertive" | undefined;
  accessibilityHint?: string;
  testID?: string;

  adjustsFontSizeToFit?: boolean;
  allowFontScaling?: boolean;
  minimumFontScale?: number;
  maxFontSizeMultiplier?: number;
}

class Text extends React.PureComponent<Props> {
  getTypography() {
    const {
      h1,
      h2,
      h3,
      h4,
      h5,
      caption,
      tab,
      overline,
      link,
      error,
      button
    } = this.props;
    if (h1) {
      return Theme.fontSize.h1;
    }
    if (h2) {
      return Theme.fontSize.h2;
    }
    if (h3) {
      return Theme.fontSize.h3;
    }
    if (h4) {
      return Theme.fontSize.h4;
    }
    if (h5) {
      return Theme.fontSize.h5;
    }
    if (caption) {
      return Theme.fontSize.caption;
    }
    if (button) {
      return Theme.fontSize.button;
    }
    if (tab) {
      return Theme.fontSize.tab;
    }
    if (overline) {
      return Theme.fontSize.overline;
    }
    if (link) {
      return Theme.fontSize.link;
    }
    if (error) {
      return Theme.fontSize.error;
    }
    return Theme.fontSize.body;
  }

  render() {
    const {
      title,
      bold,
      clear,
      center,
      notBold,
      ellipsis,
      markdown,
      uppercase,
      incremental,
      centerVertically,
      incrementBy = 1,
      numberOfLines = 1,
      style,
      textBreakStrategy,
      overline,
      hidden,
      invisible,
      selectable,
      accessibilityLabel,
      accessibilityLiveRegion,
      accessibilityHint,
      testID,
      adjustsFontSizeToFit,
      allowFontScaling,
      minimumFontScale,
      maxFontSizeMultiplier
    } = this.props;
    const typography = this.getTypography();
    const centered = center ? styles.center : undefined;
    const centeredVertically = centerVertically
      ? styles.centerVertically
      : undefined;
    const bolded = bold ? styles.bold : undefined;
    const notBolded = notBold ? styles.notBold : undefined;
    const cleared = clear ? styles.clear : undefined;
    const invisibleStyle = invisible ? styles.invisible : undefined;
    const formatted =
      uppercase || overline ? (title || "").toUpperCase() : title;
    const empty = title === undefined || title.length === 0;
    const textStyles = [
      typography,
      centered,
      centeredVertically,
      bolded,
      notBolded,
      cleared,
      invisibleStyle,
      style
    ];
    const textProps = {
      ellipsis,
      numberOfLines,
      textStyles,
      accessible: !invisible,
      accessibilityLabel: invisible ? undefined : accessibilityLabel,
      accessibilityLiveRegion: invisible ? "none" : accessibilityLiveRegion,
      accessibilityHint,
      testID,
      formatted,
      textBreakStrategy,
      adjustsFontSizeToFit,
      allowFontScaling,
      minimumFontScale,
      maxFontSizeMultiplier,
      selectable
    };
    if (empty || hidden) {
      return null;
    } // TODO: GOAT-640 remove empty flag
    if (incremental && formatted) {
      return (
        <AnimateNumber
          style={textStyles}
          value={formatted}
          countBy={incrementBy}
          timing="easeIn"
          testID={testID}
        />
      );
    }
    if (markdown && formatted) {
      return (
        <Original style={textStyles}>
          {formatted.split(" ").map((word: string, index: number) => {
            const toBold = !!word.match(boldMarkdown);
            const boldFormat = toBold
              ? word.substring(1, word.length - 1)
              : word;
            return (
              <CustomText
                {...textProps}
                key={`${word}${index}`}
                formatted={`${boldFormat} `}
                bold={toBold}
              />
            );
          })}
        </Original>
      );
    }
    return <CustomText {...textProps} />;
  }
}
export default Text;
