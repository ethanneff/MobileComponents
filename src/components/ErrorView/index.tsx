import * as React from "react";
import { StyleSheet, View } from "react-native";
import RNRestart from "react-native-restart";
import Sentry from "../../commons/Sentry";
import Theme from "../../commons/Theme";
import Button from "../Button";
import Icon from "../Icon";
import Text from "../Text";

interface Props {
  error?: Error;
  context?: object;
  children?: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class ErrorView extends React.PureComponent<Props> {
  componentDidMount() {
    const { error, context } = this.props;
    if (!error) {
      return;
    }

    if (context) {
      Sentry.error(error, context);
    } else {
      Sentry.error(error);
    }
  }

  render() {
    const { error } = this.props;
    const {
      children = (
        <>
          {error?.message && <Text title={error.message} />}
          <Button title="RESTART" onPress={() => RNRestart.Restart()} />
        </>
      )
    } = this.props;

    return (
      <View style={styles.container} testID="errorView">
        <Icon name="alert-circle" color={Theme.color.error} />
        {children}
      </View>
    );
  }
}

export default ErrorView;
