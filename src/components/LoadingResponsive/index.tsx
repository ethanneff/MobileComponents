import React from "react";
import { StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import Theme from "../../commons/Theme";
import Loader from "../Loading/Loader";
import Text from "../Text";

interface Props {
  testID?: string;
  title?: string;
  isCompleted?: boolean;
  isLoaderHidden?: boolean;
  indeterminate?: boolean;
  percent?: number;
  onComplete?(): void;
}

interface State {
  finalComplete: boolean;
}

const isTablet = DeviceInfo.isTablet();
class LoadingResponsive extends React.PureComponent<Props, State> {
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
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center"
      },
      title: {
        textAlign: "center",
        paddingHorizontal: Theme.padding.p5
      },
      loader: {
        paddingTop: isTablet ? Theme.padding.p9 : Theme.padding.p6
      }
    });
    const { title, isLoaderHidden, indeterminate, percent = 0 } = this.props;
    const { finalComplete } = this.state;
    return (
      <View style={styles.container}>
        <Text h3 hidden={!title} style={styles.title} title={title} />
        <Loader
          hidden={isLoaderHidden}
          indeterminate={indeterminate}
          percent={percent}
          finalComplete={finalComplete}
          style={styles.loader}
        />
      </View>
    );
  }
}

export default LoadingResponsive;
