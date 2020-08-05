import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Text from "../Text";

interface Props {
  title: string;
  center?: boolean;
  style?: ViewStyle;
}

const ellipsis = ["", ".", ".", "."];
const ellipsisDuration = 400;
const styles = StyleSheet.create({
  center: {
    justifyContent: "center"
  },
  row: {
    flexDirection: "row"
  }
});

export default function (props: Props) {
  const { title, center, style } = props;
  const ellipsisCountdown = useRef(0);
  const containerStyles = [
    styles.row,
    center ? styles.center : undefined,
    style
  ];
  const [ellipsisIndex, setEllipsisIndex] = useState(0);
  const animateTextNextIndex = (index: number) =>
    index >= ellipsis.length - 1 ? 0 : index + 1;
  const animateText = useCallback(() => {
    ellipsisCountdown.current = setTimeout(() => {
      setEllipsisIndex(index => animateTextNextIndex(index));
      animateText();
    }, ellipsisDuration);
  }, []);

  useEffect(() => {
    animateText();
    return () => clearTimeout(ellipsisCountdown.current);
  }, [ellipsisCountdown, animateText]);

  return (
    <View style={containerStyles}>
      <Text title={title} caption center />
      {ellipsis.map((dot, index) => (
        <Text
          key={index}
          title={dot}
          invisible={index > ellipsisIndex}
          caption
          center
        />
      ))}
    </View>
  );
}
