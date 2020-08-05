import React from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { InferableComponentEnhancer, connect } from "react-redux";
import { Event, track } from "../../commons/Analytics";
import { current as guidanceAudio } from "../../commons/Hooks/useGuidanceAudio";
import { strings } from "../../commons/Locales";
import { Indication } from "../../commons/Models";
import { stopAudio } from "../../commons/Store/Audio";
import { getIndicationFromCurrentEtSession } from "../../commons/Store/Indication";
import { DispatchMap } from "../../commons/Store/interfaces";
import { navigateOutOfExerciseTherapy } from "../../commons/Store/Playlist";
import { RootState } from "../../commons/Store/reducer";
import { getIsCurrentEtSessionSensorless } from "../../commons/Store/Session/selectors";
import Dialog from "../Dialog";

export enum AndroidBackMode {
  ExerciseTherapyWithoutDialog,
  ExerciseTherapyWithPointsDialog,
  HealthSurveyWithoutDialog
}

interface StateProps {
  currentIndication: Indication | undefined;
  isSensorless: boolean;
}

type DispatchProps = DispatchMap<{
  navigateOutOfExerciseTherapy: typeof navigateOutOfExerciseTherapy;
  stopAudio: typeof stopAudio;
}>;

interface AndroidBackProps {
  navigateHome(): void;
  setNavigateHomeMode(mode: AndroidBackMode): void;
}

export type AndroidBackInjectedProps = DispatchProps & AndroidBackProps;

const withAndroidBack: InferableComponentEnhancer<AndroidBackInjectedProps> = (<
  P extends {}
>(
  Component: React.ComponentType<P & AndroidBackInjectedProps>
) => {
  type Props = NavigationInjectedProps & StateProps & DispatchProps;
  class HOC extends React.PureComponent<Props> {
    mode = AndroidBackMode.ExerciseTherapyWithoutDialog;
    readonly styles = StyleSheet.create({ container: { flex: 1 } });
    readonly state = {
      dialog: false
    };

    componentDidMount() {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.navigateHomeButtonPressed
      );
    }

    componentWillUnmount() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.navigateHomeButtonPressed
      );
    }

    navigateHomeButtonPressed = (): boolean => {
      if (this.mode === AndroidBackMode.ExerciseTherapyWithPointsDialog) {
        this.setState({ dialog: true });
        return true;
      }
      this.navigateOut();
      return true;
    };

    setNavigateHomeMode = (mode: AndroidBackMode) => (this.mode = mode);

    navigateOut = () => {
      switch (this.mode) {
        case AndroidBackMode.ExerciseTherapyWithPointsDialog:
        case AndroidBackMode.ExerciseTherapyWithoutDialog:
          if (guidanceAudio) {
            guidanceAudio.stop();
          }
          this.props.stopAudio();
          this.props.navigateOutOfExerciseTherapy();
          break;
        default:
          this.props.navigation.navigate("Home");
          break;
      }
    };

    handleDialogConfirm = () => {
      this.setState({ dialog: false });
      this.trackDialogAction();
      this.navigateOut();
    };

    handleDialogCancel = () => {
      this.setState({ dialog: false });
      this.trackDialogAction();
    };

    trackDialogAction = (confirm = false) => {
      if (
        this.mode !== AndroidBackMode.ExerciseTherapyWithPointsDialog &&
        this.mode !== AndroidBackMode.ExerciseTherapyWithoutDialog
      ) {
        return;
      }
      const { navigation, currentIndication, isSensorless } = this.props;
      const routeName = navigation.state.routeName;
      const currentPageProperty = routeName ? routeName : "N/A";
      const indicationName = currentIndication
        ? currentIndication.name
        : "No indication";
      const event = confirm
        ? Event.EtSessionQuitDialogConfirmClicked
        : Event.EtSessionQuitDialogCancelClicked;
      track(event, {
        Pathway: indicationName,
        "Current page": currentPageProperty,
        sensorless: isSensorless ? "Yes" : "No"
      });
    };

    render() {
      return (
        <View style={this.styles.container} testID="withAndroidBackHOC">
          <Component
            {...(this.props as any)}
            navigateHome={this.navigateHomeButtonPressed}
            setNavigateHomeMode={this.setNavigateHomeMode}
          />
          <Dialog
            testID="withAndroidBackDialog"
            title={strings("etSessionAlert.title")}
            message={strings("etSessionAlert.body")}
            visible={this.state.dialog}
            confirmButtonTestID="withAndroidBackDialogConfirmButton"
            cancelButtonTestID="withAndroidBackDialogCancelButton"
            onBackgroundPress={this.handleDialogCancel}
            onCancelButtonPress={this.handleDialogCancel}
            onConfirmButtonPress={this.handleDialogConfirm}
          />
        </View>
      );
    }
  }

  const mapStateToProps = (state: RootState): StateProps => ({
    currentIndication: getIndicationFromCurrentEtSession(state),
    isSensorless: getIsCurrentEtSessionSensorless(state)
  });

  const mapDispatchToProps: DispatchProps = {
    navigateOutOfExerciseTherapy,
    stopAudio
  };

  return connect(mapStateToProps, mapDispatchToProps)(withNavigation(HOC));
}) as any;

export default withAndroidBack;
