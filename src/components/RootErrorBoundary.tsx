import React from "react";
import { StyleSheet, View } from "react-native";
import { Event, track } from "../commons/Analytics";
import { strings } from "../commons/Locales";
import { useRootDispatch } from "../commons/Store/selectors";
import { logoutUser } from "../commons/Store/User";
import Theme from "../commons/Theme";
import Button from "./Button";
import ErrorView from "./ErrorView";
import Text from "./Text";

interface State {
  error?: Error;
}
interface Props {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  error: {
    marginBottom: Theme.padding.p3
  },
  view: {
    marginHorizontal: Theme.padding.p2
  }
});

export default class RootErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    track(Event.AppFatalErrorViewed, {
      errorReason: error
    });
  }

  state: State = {};

  public render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <ErrorView error={error}>
          <View style={styles.view}>
            <Text title={strings("account.rootErrorMessage")} center />
            <Text title={error.message} error center style={styles.error} />
            <LogoutButton onClick={() => this.setState({ error: undefined })} />
          </View>
        </ErrorView>
      );
    }
    return <>{children}</>;
  }
}

interface LogoutButtonProps {
  onClick(): void;
}
function LogoutButton({ onClick }: LogoutButtonProps) {
  const dispatch = useRootDispatch();

  const handleOnPress = () => {
    dispatch(logoutUser());
    onClick();
  };

  return <Button title={strings("account.signOut")} onPress={handleOnPress} />;
}
