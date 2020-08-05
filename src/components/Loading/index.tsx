import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import Button from "../Button";
import Text from "../Text";
import Label from "./Label";
import Loader from "./Loader";

interface Props {
  testID?: string;
  style?: ViewStyle | {};
  title?: string;
  label?: string;
  noLoading?: boolean;
  titleStyle?: ViewStyle | {};
  buttonTitle?: string;
  subtitle?: string;
  hidden?: boolean;
  isCompleted?: boolean;
  notAnimated?: boolean;
  isLoaderHidden?: boolean;
  indeterminate?: boolean;
  percent?: number;
  onButtonPress?(): void;
  onComplete?(): void;
}

interface State {
  finalComplete: boolean;
}

class Loading extends React.PureComponent<Props, State> {
  readonly state = {
    finalComplete: false
  };
  timeout?: number;
  readonly completionDelay = 1000;

  complete = () => {
    this.setState({ finalComplete: false });
  };

  componentDidUpdate() {
    const { isCompleted, percent = 0, onComplete } = this.props;
    const { finalComplete } = this.state;
    const complete = isCompleted || percent >= 1;

    if (finalComplete && !complete) {
      this.complete();
      return;
    }

    if (complete && onComplete && !finalComplete) {
      this.renderLastInterval();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  renderLastInterval() {
    clearTimeout(this.timeout);
    this.setState({ finalComplete: true });
    this.renderCheckMark();
  }

  renderCheckMark() {
    const { onComplete } = this.props;
    this.timeout = setTimeout(() => {
      clearTimeout(this.timeout);
      return onComplete && onComplete();
    }, this.completionDelay);
  }

  render() {
    const isTablet = DeviceInfo.isTablet();
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Theme.sizing.vertical,
        paddingHorizontal: Theme.sizing.horizontal
      },
      title: {
        textAlign: "center",
        paddingBottom: isTablet ? Theme.padding.p5 : Theme.padding.p3
      },
      subtitle: {
        textAlign: "center",
        paddingTop: isTablet ? Theme.padding.p5 : Theme.padding.p3
      },
      button: {
        marginBottom: Theme.padding.p3
      }
    });
    const {
      style,
      title,
      titleStyle,
      buttonTitle = "",
      onButtonPress,
      subtitle,
      hidden,
      isLoaderHidden,
      indeterminate,
      notAnimated,
      label,
      noLoading,
      percent = 0
    } = this.props;
    const { finalComplete } = this.state;
    return hidden ? null : (
      <View style={[styles.container, style]}>
        {label && <Label title={label} />}
        <Text
          h3
          hidden={!title}
          style={[styles.title, titleStyle]}
          title={title}
        />
        <Button
          testID="loadingButton"
          hidden={!buttonTitle}
          half
          title={buttonTitle}
          onPress={onButtonPress}
          styleContainer={styles.button}
        />
        {!noLoading && (
          <Loader
            animated={!notAnimated}
            hidden={!!buttonTitle || isLoaderHidden}
            indeterminate={indeterminate}
            percent={percent}
            finalComplete={finalComplete}
          />
        )}
        <Text
          caption
          hidden={!subtitle}
          style={styles.subtitle}
          title={subtitle}
        />
      </View>
    );
  }
}

export default Loading;
