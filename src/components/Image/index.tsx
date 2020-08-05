import React from "react";
import { Image, ImageProps } from "react-native";
import { SvgProps } from "react-native-svg";

export default function ImageWrapper(props: ImageProps) {
  if (typeof props.source === "function") {
    const Element = props.source as React.FC<SvgProps>;
    return <Element {...props} />;
  }
  return <Image {...props} />;
}
