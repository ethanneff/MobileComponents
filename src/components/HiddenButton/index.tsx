import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { RootState } from "../../commons/Store/reducer";

interface StateProps {
  e2eMode: boolean;
}

interface ExternalProps {
  testID?: string;
  onPress: () => void;
}

type Props = ExternalProps & StateProps;
const styles = StyleSheet.create({ button: { height: 2, width: 2 } });

class HiddenButton extends React.PureComponent<Props> {
  render() {
    const { onPress, testID, e2eMode } = this.props;
    if (!e2eMode) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        testID={testID}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  e2eMode: state.debug.e2eMode
});

export default connect(mapStateToProps)(HiddenButton);
