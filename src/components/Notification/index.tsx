import React, { PureComponent } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle
} from "react-native";
import Theme from "../../commons/Theme";
import Icon from "../Icon";
import Text from "../Text";
import { strings } from "../../commons/Locales";
import { NotificationErrorType, notificationErrorConfig } from "./config";

interface Props {
  visible?: number;
  closeInterval?: number;
  notificationErrorType: NotificationErrorType;
  testID?: string;
  style?: ViewStyle | {};
  accessible?: boolean;
}

interface State {
  scaleYAnim: Animated.Value;
}

const styles = StyleSheet.create({
  container: {
    height: Theme.padding.p15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.color.notificationBackground,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0,
    ...Theme.shadows.dropShadow
  },
  label: {
    color: Theme.color.error
  },
  icon: {
    padding: Theme.padding.p1,
    marginRight: Theme.padding.p4
  }
});

class Notification extends PureComponent<Props> {
  static defaultProps = {
    visible: 0,
    closeInterval: 9000,
    title: "",
    testID: "notificationDropdown"
  };
  transform: Animated.AnimatedInterpolation;
  state: State = {
    scaleYAnim: new Animated.Value(0)
  };
  timer: ReturnType<typeof setTimeout> | null = null;
  window = Dimensions.get("window");

  constructor(props: Props) {
    super(props);
    this.transform = this.state.scaleYAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-this.window.height, 0]
    });
  }
  componentDidUpdate(prevProps: Props) {
    if (this.props.visible !== prevProps.visible) {
      this.props.visible ? this.show() : this.hide();
    }
  }
  show = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    Animated.sequence([
      Animated.timing(this.state.scaleYAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true
      }),
      Animated.timing(this.state.scaleYAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      })
    ]).start();
    this.timer = setTimeout(() => this.hide(), this.props.closeInterval);
  };
  hide = () => {
    Animated.timing(this.state.scaleYAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true
    }).start();
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };
  render() {
    const style = [
      styles.container,
      { transform: [{ translateY: this.transform }] },
      this.props.style
    ];
    const title =
      notificationErrorConfig[this.props.notificationErrorType].errorMessage;
    const iconName =
      notificationErrorConfig[this.props.notificationErrorType].iconName;
    return (
      <TouchableWithoutFeedback
        onPress={this.hide}
        testID={this.props.testID}
        accessible={this.props.visible === 1}
        accessibilityLabel={strings("globalAccessibility.notification")}
        accessibilityElementsHidden={this.props.visible === 0}
        accessibilityRole="alert"
      >
        <Animated.View
          style={style}
          accessible={this.props.visible === 1}
          accessibilityElementsHidden={this.props.visible === 0}
        >
          <Icon name={iconName} color={Theme.color.error} style={styles.icon} />
          <Text error title={title} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Notification;
