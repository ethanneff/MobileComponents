import React from "react";
import { Image, ImageSourcePropType, ImageStyle } from "react-native";

interface Props {
  source: ImageSourcePropType;
  size: number;
  style?: ImageStyle;
  testID?: string;
}

const CircleImageForwardRef = React.forwardRef(function CircleImage(
  { source, size, style, testID }: Props,
  ref: React.Ref<Image>
) {
  return (
    <Image
      ref={ref}
      testID={testID}
      source={source}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          ...style
        }
      ]}
    />
  );
});

export default CircleImageForwardRef;
