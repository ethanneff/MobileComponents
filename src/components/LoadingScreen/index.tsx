import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import Screen from "../Screen";
import Text from "../Text";

interface Props {
  noBackgroundColor?: boolean;
}

export default memo(function LoadingScreen({ noBackgroundColor }: Props) {
  const styles = StyleSheet.create({
    container: {
      height: "100%",
      justifyContent: "center",
      alignSelf: "center"
    },
    indicatorContainer: {
      height: Theme.padding.p12
    }
  });

  return (
    <Screen
      testID="loadingScreen"
      isAutomaticTrackingEnabled={false}
      noBackgroundColor={noBackgroundColor}
    >
      <View style={styles.container}>
        <View style={styles.indicatorContainer}>
          <UIActivityIndicator
            color={Theme.color.neutral700}
            count={Theme.padding.p3}
            size={Theme.padding.p8}
          />
        </View>
        <Text caption title={strings("loadingScreen.loading")} />
      </View>
    </Screen>
  );
});
