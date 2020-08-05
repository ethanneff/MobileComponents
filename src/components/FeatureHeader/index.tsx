import React, { memo } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import Icon from "../Icon";
import Text from "../Text";

interface Props {
  title: string;
  icon: string;
}

export default memo(function FeatureHeader({ title, icon }: Props) {
  const isTablet = DeviceInfo.isTablet();
  const tabIconSize = isTablet ? Theme.padding.p8 : Theme.padding.p6;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Theme.color.neutral0,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: isTablet ? Theme.padding.p8 : Theme.padding.p4,
      height: isTablet ? Theme.padding.p16 : Theme.padding.p11,
      borderBottomWidth: 1,
      borderColor: Theme.color.neutral100
    },
    text: {
      paddingHorizontal: Theme.padding.p4
    }
  });

  return (
    <SafeAreaView testID="featureHeaderSafeArea">
      <View style={styles.container} testID="featureHeaderContainer">
        <Icon
          testID="featureHeaderIcon"
          name={icon}
          size={tabIconSize}
          color={Theme.color.neutral700}
        />
        <Text
          testID="featureHeaderTitle"
          h3
          title={title}
          style={styles.text}
        />
      </View>
    </SafeAreaView>
  );
});
