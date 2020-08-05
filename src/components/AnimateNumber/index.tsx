import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Text, TextStyle } from "react-native";

interface Props {
  value: string;
  countBy?: number;
  timing?: "linear" | "easeOut" | "easeIn";
  interval?: number;
  style?: TextStyle | {};
  testID?: string;
}

const halfRad = Math.PI / 2;
const timingFunctions = {
  linear: (interval: number): number => interval,

  easeOut: (interval: number, progress: number): number =>
    interval * Math.sin(halfRad * progress) * 5,

  easeIn: (interval: number, progress: number): number =>
    interval * Math.sin(halfRad - halfRad * progress) * 5
};

export default memo(function AnimateNumber({
  value,
  timing = "linear",
  countBy = 5,
  interval = 14,
  ...rest
}: Props) {
  const timeout = useRef(0);
  const [state, setState] = useState({
    currentValue: parseInt(value, 10),
    startFrom: parseInt(value, 10),
    endWith: parseInt(value, 10)
  });

  const getProgress = useCallback(
    () =>
      (state.currentValue - state.startFrom) /
      (state.endWith - state.startFrom),
    [state.currentValue, state.startFrom, state.endWith]
  );

  const getTimingFunction = useCallback(
    (timingInterval: number, progress: number) =>
      timingFunctions[timing](timingInterval, progress),
    [timing]
  );

  const startAnimation = useCallback(() => {
    const progress = getProgress();
    timeout.current = setTimeout(() => {
      const newValue = state.currentValue + countBy;

      const hasReachedTheEnd = newValue > state.endWith;
      if (hasReachedTheEnd) {
        setState(prevState => ({
          ...prevState,
          endWith: prevState.currentValue
        }));
        return;
      }

      setState(prevState => ({
        ...prevState,
        currentValue: newValue
      }));
    }, getTimingFunction(interval, progress));
  }, [
    getProgress,
    getTimingFunction,
    countBy,
    state.endWith,
    state.currentValue,
    interval
  ]);

  useEffect(() => {
    startAnimation();
    return () => clearTimeout(timeout.current);
  }, [startAnimation]);

  useEffect(() => {
    const newValue = parseInt(value, 10);
    const hasLevelUpped = newValue < state.endWith;
    if (hasLevelUpped) {
      setState(prevState => ({
        ...prevState,
        startFrom: 0
      }));
      return;
    }

    setState(prevState => ({
      ...prevState,
      endWith: newValue
    }));
  }, [state.endWith, value]);

  return <Text {...rest}>{state.currentValue}</Text>;
});
