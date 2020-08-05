import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleSheet,
  View
} from "react-native";
import LinearGradient, {
  LinearGradientProps
} from "react-native-linear-gradient";
import Theme from "../../commons/Theme";

const INDETERMINATE_WIDTH_FACTOR = 0.3;
const BAR_WIDTH_ZERO_POSITION =
  INDETERMINATE_WIDTH_FACTOR / (1 + INDETERMINATE_WIDTH_FACTOR);

interface Props {
  animated?: boolean;
  borderColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  color?: string;
  height?: number;
  indeterminate?: boolean;
  indeterminateAnimationDuration?: number;
  onAnimationFinished?: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  progress?: number;
  style?: any;
  unfilledColor?: string;
  width?: number;
  gradient?: LinearGradientProps;
}

export default memo(function GradientBar({
  animated = true,
  borderColor = Theme.color.neutral100,
  borderRadius = 4,
  borderWidth = 1,
  color = "rgba(0,122,255,1)",
  height = 6,
  indeterminate = false,
  indeterminateAnimationDuration = 1000,
  progress = 0,
  unfilledColor = Theme.color.neutral50,
  width = 150,
  gradient = Theme.gradients.progress,
  onLayout,
  onAnimationFinished,
  style
}: Props) {
  const progressAnimationValue = Math.min(Math.max(progress, 0), 1) || 0;
  const [progressAnimation] = useState(
    new Animated.Value(progressAnimationValue)
  );
  const [animationValue] = useState(
    new Animated.Value(BAR_WIDTH_ZERO_POSITION)
  );
  const [stateWidth, setStateWidth] = useState(0);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (!width) {
        setStateWidth(event.nativeEvent.layout.width);
      }
      if (onLayout) {
        onLayout(event);
      }
    },
    [onLayout, width]
  );

  const animate = useCallback(() => {
    animationValue.setValue(0);
    Animated.timing(animationValue, {
      toValue: 1,
      duration: indeterminateAnimationDuration,
      easing: Easing.linear,
      isInteraction: false,
      useNativeDriver: true
    }).start(endState => {
      if (endState.finished) {
        animate();
      }
    });
  }, [animationValue, indeterminateAnimationDuration]);

  useEffect(() => {
    if (indeterminate) {
      animate();
      return;
    }

    Animated.spring(animationValue, {
      toValue: BAR_WIDTH_ZERO_POSITION,
      useNativeDriver: true
    }).start();
  }, [animate, animationValue, indeterminate]);

  useEffect(() => {
    const newProgressAnimationValue = indeterminate
      ? INDETERMINATE_WIDTH_FACTOR
      : Math.min(Math.max(progress, 0), 1);

    if (!animated) {
      progressAnimation.setValue(newProgressAnimationValue);
      return;
    }

    Animated.spring(progressAnimation, {
      bounciness: 0,
      toValue: progress,
      useNativeDriver: true
    }).start(() => {
      if (onAnimationFinished) {
        onAnimationFinished();
      }
    });
  }, [
    animated,
    indeterminate,
    progress,
    progressAnimation,
    onAnimationFinished
  ]);

  const innerWidth = Math.max(0, width ?? stateWidth) - borderWidth * 2;
  const styles = StyleSheet.create({
    container: {
      width,
      borderWidth,
      borderColor: borderColor || color,
      borderRadius,
      overflow: "hidden",
      backgroundColor: unfilledColor
    },
    progress: {
      backgroundColor: unfilledColor,
      borderRadius: 0,
      height
    }
  });
  const animatedViewStyles = [
    styles.progress,
    {
      transform: [
        {
          translateX: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [innerWidth * -INDETERMINATE_WIDTH_FACTOR, innerWidth]
          })
        },
        {
          translateX: progressAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, innerWidth + 2]
          })
        }
      ]
    }
  ];

  const containerStyles = [styles.container, style];

  const gradientStyle = gradient
    ? gradient
    : { colors: Theme.gradients.progress.colors };

  return (
    <View onLayout={handleLayout} style={containerStyles} testID="gradientBar">
      <LinearGradient {...gradientStyle} testID="gradient">
        <Animated.View
          style={animatedViewStyles}
          testID="gradientBarAnimatedView"
        />
      </LinearGradient>
    </View>
  );
});
