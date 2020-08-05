import React from "react";
import { Text } from "react-native";
import Utils from "../../commons/Utils";

interface State {
  error?: Error;
}

/* istanbul ignore next */
export class TestErrorBoundary extends React.Component<{}, State> {
  static errorLog: Error[] = [];

  static clearErrors() {
    this.errorLog.length = 0;
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  state: State = {};

  componentDidCatch = (error: Error) => {
    Utils.error(error);
    TestErrorBoundary.errorLog.push(error);
  };

  render() {
    return this.state.error ? (
      <Text>{this.state.error.message}</Text>
    ) : (
      this.props.children
    );
  }
}
