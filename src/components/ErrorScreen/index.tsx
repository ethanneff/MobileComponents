import React from "react";
import { Image, StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import Button from "../Button";
import Icon from "../Icon";
import Screen from "../Screen";
import Text from "../Text";
import {
  ErrorScreenType,
  TabType,
  errorScreenConfig,
  tabsConfig
} from "./config";
import ErrorNotification from "./ErrorNotification";

interface Props {
  errorScreenType: ErrorScreenType;
  tabType?: TabType;
  onPress(): void;
}

const ErrorScreen: React.FC<Props> = props => {
  const isTablet = DeviceInfo.isTablet();
  const tabIconSize = Theme.padding.p9;
  const { errorScreenType, tabType = TabType.None, onPress } = props;
  const { tabName, tabIcon } = tabsConfig[tabType];
  const {
    errorMessage,
    errorSubMessage,
    image,
    notificationError
  } = errorScreenConfig[errorScreenType];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },
    image: {
      width: "100%"
    },
    tabContainer: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      marginTop: Theme.padding.p4,
      marginLeft: Theme.padding.p4
    },
    tabText: {
      paddingLeft: isTablet ? Theme.padding.p7 : Theme.padding.p4
    },
    errorContainer: {
      position: "absolute",
      top: isTablet ? "42%" : "38%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    errorPrimary: {
      paddingTop: Theme.padding.p2
    },
    button: {
      position: "absolute",
      alignSelf: "center",
      bottom: "11%"
    }
  });

  const isButtonHidden = errorScreenType === ErrorScreenType.Server;
  const isTabHidden = tabType !== TabType.None;

  return (
    <Screen testID="errorScreen">
      <ErrorNotification notificationErrorType={notificationError} />
      <View style={styles.container}>
        {isTabHidden && (
          <View style={styles.tabContainer} testID="errorScreenTab">
            <Icon
              name={tabIcon}
              size={tabIconSize}
              color={Theme.color.neutral900}
            />
            <Text h3 title={tabName} style={styles.tabText} />
          </View>
        )}
        <View style={styles.errorContainer} testID="errorScreenContent">
          <Image style={styles.image} source={image} resizeMode="cover" />
          <Text h4 title={errorMessage} style={styles.errorPrimary} />
          <Text body title={errorSubMessage} />
        </View>
        <Button
          hidden={isButtonHidden}
          half
          outline
          title={strings("buttonText.errorRetry")}
          onPress={onPress}
          testID="errorScreenButton"
          styleContainer={styles.button}
        />
      </View>
    </Screen>
  );
};

export default ErrorScreen;
