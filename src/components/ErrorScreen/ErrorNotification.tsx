import React, { useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from "react-native";
import useTimeoutFn from "react-use/lib/useTimeoutFn";
import Theme from "../../commons/Theme";
import Icon from "../Icon";
import {
  NotificationErrorType,
  notificationErrorConfig
} from "../Notification/config";
import Text from "../Text";

interface Props {
  notificationErrorType: NotificationErrorType;
  style?: ViewStyle | {};
}

const closeInterval = 9000;

const styles = StyleSheet.create({
  container: {
    height: Theme.padding.p15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.color.notificationBackground,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0,
    ...Theme.shadows.dropShadow
  },
  icon: {
    padding: Theme.padding.p1,
    marginRight: Theme.padding.p4
  }
});

function ErrorNotification({ notificationErrorType, style }: Props) {
  const [visible, setVisible] = useState(true);
  const [cancel] = useTimeoutFn(() => setVisible(false), closeInterval);
  const containerStyles = [styles.container, style];
  const title = notificationErrorConfig[notificationErrorType].errorMessage;
  const iconName = notificationErrorConfig[notificationErrorType].iconName;
  const hidden =
    notificationErrorType === NotificationErrorType.None || visible === false;

  const hideNotice = () => {
    cancel();
    setVisible(false);
  };

  if (hidden) {
    cancel();
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={hideNotice}>
      <View style={containerStyles}>
        <Icon name={iconName} color={Theme.color.error} style={styles.icon} />
        <Text error title={title} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ErrorNotification;
