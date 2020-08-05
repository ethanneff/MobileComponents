import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import KeepAwake from "react-native-keep-awake";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { injectNavigationTracking } from "../../commons/Analytics";
import Config from "../../commons/Config";
import { injectNavigation } from "../../commons/Store/App";
import { DispatchMap } from "../../commons/Store/interfaces";
import Theme from "../../commons/Theme";
import { NotificationErrorType } from "../Notification/config";
import Notification from "../Notification";
import KeyboardScroll from "./KeyboardScroll";
import Navbar from "./Navbar";

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    elevation: 1
  },
  safe: {
    flex: 1
  },
  background: {
    width: window.width,
    top: 0,
    left: 0,
    position: "absolute"
  },
  backgroundColor: {
    backgroundColor: Theme.color.neutral25,
    flex: 1
  }
});

interface OwnProps {
  style?: ViewStyle | {};
  backgroundImage?: ImageSourcePropType;
  backgroundImageScale?: number;
  statusBar?: StatusBarStyle;
  isScroll?: boolean;
  accessibilityLabel?: string;
  testID?: string;
  leftIcon?: string;
  rightIcon?: string;
  isAutomaticTrackingEnabled?: boolean;
  trackViewedProps?: TrackViewedProps;
  leftHidden?: boolean;
  rightHidden?: boolean;
  floatingNav?: boolean;
  blankNav?: boolean;
  navBackgroundColor?: string;
  noBackgroundColor?: boolean;
  backgroundColor?: boolean;
  rightText?: string;
  leftText?: string;
  keepAwake?: boolean;
  border?: boolean;
  notificationError?: NotificationErrorType;
  notificationErrorCount?: number;
  onLeftPress?(): void;
  onRightPress?(): void;
}

interface TrackViewedProps {
  [key: string]: string | undefined | boolean;
}

type DispatchProps = DispatchMap<{
  injectNavigation: typeof injectNavigation;
}>;

type Props = OwnProps & DispatchProps & NavigationInjectedProps;

export class UnwrappedScreen extends React.PureComponent<Props> {
  public static defaultProps = {
    isAutomaticTrackingEnabled: true
  };

  // workaround for Dimensions.get("window").height returning incorrect value
  readonly androidBottomNavbarHeight =
    Platform.OS === Config.os.android ? Theme.padding.p6 : 0;
  readonly imageResizeMode =
    Platform.OS === Config.os.android ? "stretch" : undefined;
  readonly leftIcon = "arrow-left";
  readonly rightIcon = "close";
  hasFiredViewedEvent = false;
  isJest = process.env.JEST_WORKER_ID;

  didFocusSub = this.props.navigation.addListener("didFocus", () => {
    if (this.props.keepAwake) {
      KeepAwake.activate();
    }
    if (this.hasFiredViewedEvent) {
      return;
    }
    this.trackNavigation(this.props.trackViewedProps);
  });

  didBlurSub = this.props.navigation.addListener("didBlur", () => {
    if (this.props.keepAwake) {
      KeepAwake.deactivate();
    }
    this.hasFiredViewedEvent = false;
  });

  componentDidMount() {
    this.trackNavigation(this.props.trackViewedProps);
    this.props.injectNavigation(this.props.navigation);
  }

  componentWillUnmount() {
    this.didBlurSub.remove();
    this.didFocusSub.remove();
  }

  trackNavigation(properties?: TrackViewedProps) {
    const { isAutomaticTrackingEnabled, navigation } = this.props;
    if (!isAutomaticTrackingEnabled) {
      return;
    }

    const currentScreen = navigation.state.routeName;
    if (!currentScreen) {
      return;
    }

    injectNavigationTracking(currentScreen, { ...properties });
    this.hasFiredViewedEvent = true;
  }

  render() {
    const {
      style,
      onLeftPress,
      onRightPress,
      rightIcon,
      leftIcon,
      rightHidden,
      leftHidden,
      children,
      isScroll,
      backgroundImage,
      accessibilityLabel,
      testID,
      floatingNav,
      blankNav,
      navBackgroundColor,
      noBackgroundColor,
      rightText,
      leftText,
      border,
      statusBar = Platform.OS === Config.os.android
        ? "default"
        : "dark-content",
      notificationError,
      notificationErrorCount = 0
    } = this.props;
    const right = rightIcon ? rightIcon : this.rightIcon;
    const left = leftIcon ? leftIcon : this.leftIcon;

    const backgroundImageStyle = [
      styles.background,
      {
        height: window.height - this.androidBottomNavbarHeight
      }
    ];

    const removeBackgroundColor = backgroundImage || noBackgroundColor;
    const safeAreaStyle = [
      styles.safe,
      {
        backgroundColor: removeBackgroundColor
          ? undefined
          : Theme.color.neutral0
      }
    ];

    return (
      <SafeAreaView
        style={safeAreaStyle}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      >
        {!this.isJest && <StatusBar barStyle={statusBar} />}
        <View style={[styles.container, style]}>
          {notificationError && (
            <Notification
              notificationErrorType={
                notificationError || NotificationErrorType.None
              }
              visible={notificationErrorCount}
              testID="errorNotification"
            />
          )}
          <Navbar
            leftIcon={left}
            rightIcon={right}
            onLeftPress={onLeftPress ? onLeftPress : undefined}
            onRightPress={onRightPress ? onRightPress : undefined}
            rightHidden={rightHidden}
            leftHidden={leftHidden}
            floatingNav={floatingNav}
            blankNav={blankNav}
            navBackgroundColor={navBackgroundColor}
            rightText={rightText}
            leftText={leftText}
            border={border}
          />
          <KeyboardScroll isEnabled={isScroll}>{children}</KeyboardScroll>
        </View>
        {backgroundImage && (
          <Image
            source={backgroundImage}
            style={backgroundImageStyle}
            resizeMode={this.imageResizeMode}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = { injectNavigation };

export default withNavigation(
  connect(null, mapDispatchToProps)(UnwrappedScreen)
);
