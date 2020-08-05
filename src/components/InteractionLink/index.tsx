import React, { memo, useCallback } from "react";
import {
  Linking,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import Text from "../Text";
import {
  InteractionLinkContentType,
  hasInteraction,
  interactionLink
} from "./utils";

interface Props {
  text: string;
  route?: string;
  testID?: string;
  textStyles?: TextStyle;
  containerStyles?: ViewStyle;
  type: InteractionLinkContentType;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: { alignSelf: "flex-start" }
});

export default memo(function InteractionLink({
  text,
  route,
  testID,
  textStyles,
  containerStyles,
  type,
  onPress
}: Props) {
  const nav = useNavigation();
  const navToRoute = useCallback(routeParam => nav.navigate(routeParam), [nav]);
  const disabled = !hasInteraction(type);
  const containerStyle = [styles.container, containerStyles];
  const hitSlop = {
    top: 10,
    bottom: 10,
    left: 0,
    right: 0
  };

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    }
    if (type === "navigate") {
      navToRoute(route);
      return;
    }
    const url = interactionLink(text, type);
    Linking.openURL(url);
  }, [type, text, navToRoute, route, onPress]);

  return disabled ? (
    <View style={containerStyle} testID="contentPlainText">
      <Text
        title={text}
        testID="contentText"
        style={textStyles}
        selectable={type === "email" || type === "phone"}
      />
    </View>
  ) : (
    <TouchableOpacity
      onPress={handlePress}
      testID={testID || "contentButton"}
      style={containerStyle}
      hitSlop={hitSlop}
    >
      <Text
        title={text}
        testID="contentText"
        style={textStyles}
        link
        selectable={type === "email" || type === "phone"}
      />
    </TouchableOpacity>
  );
});
