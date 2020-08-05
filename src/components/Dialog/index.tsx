import React, { ReactChild } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import Button from "../Button";
import Text from "../Text";

const isTablet = DeviceInfo.isTablet();

interface Props {
  testID?: string;
  visible?: boolean;
  title?: string;
  titleCenter?: boolean;
  message?: string;
  alert?: boolean;
  neutral?: boolean;
  rightPrimary?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  component?: ReactChild;
  confirmButtonTestID?: string;
  cancelButtonTestID?: string;
  deviceIsTablet?: boolean;
  onConfirmButtonPress?(): void;
  onCancelButtonPress?(): void;
  onBackgroundPress?(): void;
}

const styles = StyleSheet.create({
  buttonGroup: {
    paddingTop: Theme.padding.p8,
    flexDirection: "row",
    justifyContent: "center"
  },
  mobileButtonGroup: {
    paddingTop: Theme.padding.p8,
    flexDirection: "column",
    justifyContent: "center"
  },
  alert: { display: "none" },
  title: { paddingBottom: Theme.padding.p3 },
  cancel: { flex: 1, marginRight: Theme.padding.p2 },
  confirm: { flex: 1, marginLeft: Theme.padding.p2 },
  mobileGroupPadding: {
    marginBottom: Theme.padding.p4
  },
  tabletButton: {
    width: "60%",
    alignSelf: "center"
  },
  mobileButton: {
    width: "100%",
    alignSelf: "center"
  }
});

function ButtonsForTablet(props: Props) {
  const {
    onCancelButtonPress,
    onConfirmButtonPress,
    confirmButtonTestID = "dialogConfirmButton",
    cancelButtonTestID = "dialogCancelButton",
    confirmButtonText = strings("buttonText.yes"),
    cancelButtonText = strings("buttonText.no"),
    rightPrimary,
    alert,
    neutral,
    deviceIsTablet = isTablet
  } = props;
  const buttonStyles = [
    deviceIsTablet ? styles.buttonGroup : styles.mobileButtonGroup,
    alert ? styles.alert : undefined
  ];
  const twoButtons = !!onConfirmButtonPress && !!onCancelButtonPress;
  const cancelButtonStyle = [twoButtons ? styles.cancel : styles.tabletButton];
  const confirmButtonStyle = [
    twoButtons ? styles.confirm : styles.tabletButton
  ];
  const rightSecondary = neutral ? true : rightPrimary;
  const leftSecondary = neutral ? true : !rightPrimary;

  return (
    <View style={buttonStyles}>
      <Button
        hidden={!onCancelButtonPress}
        title={cancelButtonText}
        onPress={onCancelButtonPress}
        styleContainer={cancelButtonStyle}
        secondary={rightSecondary}
        testID={cancelButtonTestID}
      />
      <Button
        nonFlex
        hidden={!onConfirmButtonPress}
        title={confirmButtonText}
        onPress={onConfirmButtonPress}
        styleContainer={confirmButtonStyle}
        secondary={leftSecondary}
        testID={confirmButtonTestID}
      />
    </View>
  );
}

function ButtonsForMobile(props: Props) {
  const {
    onCancelButtonPress,
    onConfirmButtonPress,
    confirmButtonTestID = "dialogConfirmButton",
    cancelButtonTestID = "dialogCancelButton",
    confirmButtonText = strings("buttonText.yes"),
    cancelButtonText = strings("buttonText.no"),
    rightPrimary,
    alert,
    neutral
  } = props;
  const buttonStyles = [
    styles.mobileButtonGroup,
    alert ? styles.alert : undefined
  ];
  const twoButtons = !!onConfirmButtonPress && !!onCancelButtonPress;
  const cancelButtonStyle = [
    twoButtons ? styles.mobileGroupPadding : styles.mobileButton
  ];
  const confirmButtonStyle = styles.mobileButton;
  const rightSecondary = neutral ? true : rightPrimary;
  const leftSecondary = neutral ? true : !rightPrimary;

  return (
    <View style={buttonStyles}>
      <Button
        hidden={!onConfirmButtonPress}
        title={confirmButtonText}
        onPress={onConfirmButtonPress}
        styleContainer={cancelButtonStyle}
        secondary={leftSecondary}
        testID={confirmButtonTestID}
      />
      <Button
        hidden={!onCancelButtonPress}
        title={cancelButtonText}
        onPress={onCancelButtonPress}
        styleContainer={confirmButtonStyle}
        secondary={rightSecondary}
        testID={cancelButtonTestID}
      />
    </View>
  );
}

class Dialog extends React.PureComponent<Props> {
  readonly styles = StyleSheet.create({
    overlay: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: Theme.padding.p4,
      backgroundColor: Theme.color.overlay
    },
    modal: {
      backgroundColor: Theme.color.neutral0,
      borderRadius: Theme.sizing.borderRadius,
      padding: isTablet ? Theme.padding.p8 : Theme.padding.p4,
      maxWidth: 500,
      width: "80%",
      ...Theme.shadows.dropShadow
    },
    title: { paddingBottom: Theme.padding.p3 }
  });

  readonly alertTimeoutTime = 3000;
  alertTimeout?: number;

  componentDidUpdate(prevProps: Props) {
    const { alert, visible } = this.props;
    if (prevProps.visible !== visible && alert && visible) {
      this.disappearAlert();
    }
    if (prevProps.visible !== visible && !visible) {
      this.clearTimeouts();
    }
  }

  componentWillUnmount() {
    this.clearTimeouts();
  }

  disappearAlert = () => {
    this.alertTimeout = setTimeout(() => {
      const { onCancelButtonPress } = this.props;
      if (onCancelButtonPress) {
        onCancelButtonPress();
      }
      this.clearTimeouts();
    }, this.alertTimeoutTime);
  };

  clearTimeouts = () => {
    clearTimeout(this.alertTimeout);
  };

  render() {
    const {
      onCancelButtonPress,
      onBackgroundPress,
      message,
      title,
      titleCenter,
      visible,
      testID,
      children,
      deviceIsTablet = isTablet
    } = this.props;
    return (
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={onCancelButtonPress}
      >
        <TouchableWithoutFeedback testID={testID} onPress={onBackgroundPress}>
          <View style={this.styles.overlay}>
            <TouchableWithoutFeedback onPress={undefined}>
              <View style={this.styles.modal}>
                <Text
                  title={title}
                  h3
                  style={this.styles.title}
                  center={titleCenter}
                />
                <Text title={message} />
                {children}
                {deviceIsTablet ? (
                  <ButtonsForTablet {...this.props} />
                ) : (
                  <ButtonsForMobile {...this.props} />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
export default Dialog;
