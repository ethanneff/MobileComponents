import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { strings } from "../../commons/Locales";
import { DispatchMap } from "../../commons/Store/interfaces";
import { setSkipSensorlessModal } from "../../commons/Store/Session";
import Theme from "../../commons/Theme";
import CheckBox from "../CheckBox";
import Dialog from "../Dialog";
import Text from "../Text";

const styles = StyleSheet.create({
  midWorkoutText: {
    paddingTop: Theme.padding.p7
  },
  skipCheckbox: {
    paddingTop: Theme.padding.p14,
    paddingBottom: Theme.padding.p6
  }
});

type DispatchProps = DispatchMap<{
  setSkipSensorlessModal: typeof setSkipSensorlessModal;
}>;

interface OwnProps {
  visible: boolean;
  isMidWorkout?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

interface State {
  doNotShowMeThisAgain: boolean;
}

type Props = OwnProps & DispatchProps;

export class SensorlessDialog extends React.PureComponent<Props, State> {
  state: State = {
    doNotShowMeThisAgain: true
  };

  onDoNotShowMeAgainChange = () => {
    this.setState({ doNotShowMeThisAgain: !this.state.doNotShowMeThisAgain });
  };

  onConfirmPress = () => {
    this.props.onConfirm();
    if (this.state.doNotShowMeThisAgain) {
      this.props.setSkipSensorlessModal();
    }
  };

  render() {
    const { visible, isMidWorkout, onCancel } = this.props;
    const title = isMidWorkout
      ? strings("sensorlessModal.midWorkout.title")
      : strings("sensorlessModal.firstTimeUse.title");
    const message = isMidWorkout
      ? strings("sensorlessModal.midWorkout.message")
      : strings("sensorlessModal.firstTimeUse.message");
    const confirmText = strings("sensorlessModal.confirm");
    const cancelText = strings("sensorlessModal.cancel");

    return visible ? (
      <Dialog
        visible={visible}
        title={title}
        message={message}
        onCancelButtonPress={onCancel}
        onConfirmButtonPress={this.onConfirmPress}
        onBackgroundPress={onCancel}
        confirmButtonTestID="confirmSensorless"
        confirmButtonText={confirmText}
        cancelButtonTestID="cancelSensorless"
        cancelButtonText={cancelText}
        rightPrimary
        testID="sensorlessDialog"
      >
        {isMidWorkout ? (
          <Text
            style={styles.midWorkoutText}
            title={strings("sensorlessModal.midWorkout.subtitle")}
          />
        ) : null}
        <CheckBox
          title={strings("sensorlessModal.skip")}
          checked={this.state.doNotShowMeThisAgain}
          onChange={this.onDoNotShowMeAgainChange}
          style={styles.skipCheckbox}
          testID="skipModalCheckbox"
        />
      </Dialog>
    ) : null;
  }
}

const mapDispatchToProps: DispatchProps = {
  setSkipSensorlessModal
};

export default connect(null, mapDispatchToProps)(SensorlessDialog);
