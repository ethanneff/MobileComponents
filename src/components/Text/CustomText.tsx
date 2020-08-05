import React, { memo } from "react";
import {
  Text as Original,
  StyleSheet,
  TextInputAndroidProps,
  TextStyle
} from "react-native";
import Theme from "../../commons/Theme";

export type TextBreakStrategy = TextInputAndroidProps["textBreakStrategy"];

const styles = StyleSheet.create({
  bold: {
    fontFamily: Theme.fontWeight.bold
  }
});

interface Props {
  bold?: boolean;
  ellipsis?: boolean;
  selectable?: boolean;
  allowFontScaling?: boolean;
  accessible?: boolean;
  adjustsFontSizeToFit?: boolean;
  accessibilityLabel?: string;
  accessibilityLiveRegion?: "none" | "polite" | "assertive" | undefined;
  accessibilityHint?: string;
  testID?: string;
  formatted?: string;
  numberOfLines: number;
  minimumFontScale?: number;
  maxFontSizeMultiplier?: number;
  textStyles: TextStyle | {};
  textBreakStrategy?: TextBreakStrategy;
}

export default memo(function CustomText({
  bold,
  ellipsis,
  selectable,
  allowFontScaling = true,
  adjustsFontSizeToFit,
  accessible,
  accessibilityLabel,
  accessibilityLiveRegion,
  accessibilityHint,
  testID,
  formatted,
  numberOfLines,
  minimumFontScale,
  maxFontSizeMultiplier,
  textStyles,
  textBreakStrategy = "simple"
}: Props) {
  return (
    <Original
      ellipsizeMode={ellipsis ? "tail" : undefined}
      numberOfLines={ellipsis ? numberOfLines : undefined}
      style={[textStyles, bold ? styles.bold : undefined]}
      textBreakStrategy={textBreakStrategy}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityLiveRegion={accessibilityLiveRegion}
      accessibilityHint={accessibilityHint}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      allowFontScaling={allowFontScaling}
      minimumFontScale={minimumFontScale}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      selectable={selectable}
    >
      {formatted}
    </Original>
  );
});
