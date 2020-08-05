import React, { ReactNode, memo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import ScrollView from "../ScrollView";

interface Props {
  children: ReactNode;
  isEnabled?: boolean;
  contentContainerStyle?: ViewStyle;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default memo(function KeyboardScroll({
  children,
  isEnabled,
  contentContainerStyle
}: Props) {
  return isEnabled ? (
    <ScrollView
      testID="keyboardScroll"
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </ScrollView>
  ) : (
    <View testID="keyboardScroll" style={styles.container}>
      {children}
    </View>
  );
});
