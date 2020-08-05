import React from "react";
import { StyleSheet, View } from "react-native";
import { Circle } from "react-native-progress";
import Theme from "../../commons/Theme";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});

interface Props {
  color?: string;
  hidden?: boolean;
}

class Spinner extends React.PureComponent<Props> {
  borderWidth = 2;
  size = Theme.padding.p5;
  render() {
    const { color = Theme.color.neutral900, hidden } = this.props;

    if (hidden) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Circle
          borderWidth={this.borderWidth}
          color={color}
          size={this.size}
          indeterminate={true}
        />
      </View>
    );
  }
}

export default Spinner;
