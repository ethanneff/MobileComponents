import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";

interface Props {
  hidden: boolean;
  source: string;
  style?: ViewStyle | {};
  autoPlay?: boolean;
  repeat?: boolean;
  size?: number;
  speed?: number;
  onAnimationFinish?: () => void;
}

class Lottie extends React.PureComponent<Props> {
  size = (size: number) =>
    StyleSheet.create({
      container: {
        alignSelf: "center",
        width: `${size}%`
      }
    });

  render() {
    const {
      hidden,
      source,
      style,
      autoPlay = true,
      repeat = true,
      size = 65,
      speed = 1,
      onAnimationFinish
    } = this.props;
    return hidden ? null : (
      <LottieView
        style={[this.size(size).container, style]}
        source={source}
        autoPlay={autoPlay}
        loop={repeat}
        onAnimationFinish={onAnimationFinish}
        speed={speed}
      />
    );
  }
}

export default Lottie;
