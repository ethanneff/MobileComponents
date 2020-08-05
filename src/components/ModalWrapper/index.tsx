import React, { memo } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import ScrollView from "../ScrollView";

interface Props {
  testID?: string;
  maxHeight?: number;
  maxWidth?: number;
  onBackgroundPress?(): void;
}
const ModalWrapper: React.FC<Props> = memo(function ModalWrapperMemo({
  testID,
  onBackgroundPress,
  children,
  maxWidth = 536,
  maxHeight = 500
}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    overlay: {
      flex: 1,
      width: "100%",
      backgroundColor: Theme.color.overlay
    },
    modal: {
      position: "absolute",
      backgroundColor: Theme.color.neutral0,
      borderRadius: Theme.padding.p3,
      margin: Theme.padding.p8,
      width: DeviceInfo.isTablet() ? "100%" : "90%",
      maxWidth,
      maxHeight,
      overflow: "hidden",
      ...Theme.shadows.dropShadow
    }
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={onBackgroundPress}
    >
      <View style={styles.container}>
        <TouchableOpacity
          testID={testID}
          activeOpacity={1}
          onPress={onBackgroundPress}
          style={styles.overlay}
        />
        <View style={styles.modal} testID="modal">
          <ScrollView>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
});

export default ModalWrapper;
