import React, { ReactNode, memo } from "react";
import {
  ScrollViewProperties,
  ScrollView as ScrollViewRef
} from "react-native";
import {
  KeyboardAwareProps,
  KeyboardAwareScrollView
} from "react-native-keyboard-aware-scroll-view";

interface Props extends ScrollViewProperties {
  children: ReactNode;
  innerRef?(ref: ScrollViewRef): void;
}

export default memo(function ScrollView({
  children,
  innerRef,
  ...props
}: Props) {
  const innerRefCallback = innerRef ? (innerRef as unknown) : undefined;
  return (
    <KeyboardAwareScrollView
      enableResetScrollToCoords={false}
      keyboardShouldPersistTaps="handled"
      innerRef={innerRefCallback as KeyboardAwareProps["innerRef"]}
      {...props}
    >
      {children}
    </KeyboardAwareScrollView>
  );
});

export { ScrollViewRef };
