import React, { memo } from "react";
import { Path } from "react-native-svg";
import Theme from "../../commons/Theme";

interface Props {
  curveData: string;
}

export default memo(function Curve({ curveData }: Props) {
  return (
    <Path
      d={curveData}
      fill="none"
      stroke={Theme.color.neutral300}
      strokeWidth={27}
    />
  );
});
