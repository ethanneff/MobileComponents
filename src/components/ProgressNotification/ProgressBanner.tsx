import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import { strings } from "../../commons/Locales";
import Theme from "../../commons/Theme";
import GradientBar from "../GradientBar";
import Lottie from "../Lottie";
import Text from "../Text";

const window = Dimensions.get("window");
const isTablet = DeviceInfo.isTablet();
const unlockLottie = require("../../commons/Assets/Exercises/Common/unlock.json");

export interface StateProps {
  upgradedLevel: boolean;
  newPoints: number;
  initialLevel: number;
  currentPoints: number;
  totalPoints: number;
  nextCurrentPoints: number;
  nextTotalPoints: number;
  whatsNewEnabled: boolean;
}

export interface ProgressBannerProps {
  height: number;
  delay?: number;
  onPadlockAnimationFinish?(): void;
}

type Props = StateProps & ProgressBannerProps;

function transformScaleOut(animatedValue: Animated.Value, factor: number) {
  return [
    {
      scaleX: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, factor]
      })
    },
    {
      scaleY: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, factor]
      })
    }
  ];
}

enum GradientPhase {
  fill,
  empty
}

enum Mode {
  initial,
  newPoints,
  unlocked,
  newLevel
}

interface State {
  phase: GradientPhase;
  level: number;
  animateText: boolean;
  currentProgress: number;
  totalLevelPoints: number;
  showLottie: boolean;
  levelUpGradient: boolean;
  mode: Mode;
}

export default class ProgressBanner extends React.PureComponent<Props, State> {
  move = new Animated.Value(0);
  fade = new Animated.Value(0);
  timer1: number | undefined;
  timer2: number | undefined;
  timer3: number | undefined;
  padlockUnlockDuration = 1600;
  unmounted = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      phase: GradientPhase.fill,
      level: props.initialLevel,
      animateText: true,
      currentProgress: props.currentPoints,
      totalLevelPoints: props.totalPoints,
      showLottie: false,
      levelUpGradient: false,
      mode: Mode.initial
    };
  }

  updateMode = () => {
    this.setState({ mode: Mode.newPoints });
  };

  componentDidMount() {
    const {
      delay,
      upgradedLevel,
      totalPoints,
      currentPoints,
      newPoints,
      whatsNewEnabled
    } = this.props;

    this.updateMode();
    this.move.setValue(0);
    this.fade.setValue(0);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.move, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          delay
        }),
        Animated.timing(this.fade, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          delay
        })
      ]),
      Animated.timing(this.fade, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => {
      if (upgradedLevel) {
        this.setState({
          currentProgress: totalPoints,
          mode: Mode.unlocked
        });
        this.timer2 = setTimeout(() => {
          this.handleUnlockedAnimationFinished();
        }, 3200);

        if (whatsNewEnabled) {
          this.timer3 = setTimeout(() => {
            this.handleOnPadlockAnimationFinish();
          }, this.padlockUnlockDuration);
          return;
        }
      } else {
        this.setState({
          currentProgress: currentPoints + newPoints
        });
      }
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
    clearTimeout(this.timer3);
  }

  handleGradientAnimationFinished = () => {
    if (this.state.mode === Mode.unlocked && this.props.upgradedLevel) {
      this.setState({ levelUpGradient: true, showLottie: true });
    }
  };

  handleUnlockedAnimationFinished = () => {
    if (this.unmounted) {
      return;
    }
    this.setState(
      {
        phase: GradientPhase.empty,
        levelUpGradient: false,
        currentProgress: 0,
        totalLevelPoints: this.props.nextTotalPoints,
        animateText: false,
        mode: Mode.newLevel
      },
      () => {
        this.setState({ phase: GradientPhase.fill });
      }
    );

    this.timer1 = setTimeout(() => {
      if (this.unmounted) {
        return;
      }
      this.setState({
        currentProgress: this.props.nextCurrentPoints,
        animateText: true,
        level: this.props.initialLevel + 1
      });
    }, 500);
  };

  animatePoints = () => {
    return {
      transform: transformScaleOut(this.move, 1.1),
      opacity: this.fade
    };
  };

  handleOnPadlockAnimationFinish = () => {
    if (this.props.onPadlockAnimationFinish) {
      this.props.onPadlockAnimationFinish();
    }
  };

  render() {
    const { totalPoints, newPoints, height } = this.props;
    const paddingHorizontal = isTablet ? Theme.padding.p16 : Theme.padding.p10;
    const gradientBarHeight = Theme.padding.p7;
    const styles = StyleSheet.create({
      container: {
        backgroundColor: Theme.color.neutral0,
        height,
        paddingHorizontal,
        paddingTop: isTablet ? Theme.padding.p16 : Theme.padding.p10
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between"
      },
      pointsFraction: {
        flexDirection: "row"
      },
      progressContainer: {
        marginTop: Theme.padding.p3,
        justifyContent: "center",
        alignItems: "center"
      },
      progressOverlay: {
        position: "absolute",
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center"
      }
    });

    const {
      level,
      animateText,
      currentProgress,
      totalLevelPoints,
      phase,
      levelUpGradient,
      showLottie
    } = this.state;

    const newPointsContainerStyles = [
      styles.progressOverlay,
      this.animatePoints()
    ];
    const progress = currentProgress / totalPoints;

    return (
      <View style={styles.container} testID="progressBanner">
        <View style={styles.header}>
          <Text
            h4
            title={`${strings("playlist.level")} ${level}`}
            testID="playlistLevel"
          />
          <View style={styles.pointsFraction}>
            <Text
              h4
              incremental={animateText}
              incrementBy={5}
              title={`${currentProgress}`}
            />
            <Text h4 title={`/${totalLevelPoints}`} />
          </View>
        </View>
        <View style={styles.progressContainer}>
          {phase === GradientPhase.fill ? (
            <GradientBar
              progress={progress}
              color={Theme.color.success}
              borderColor={Theme.color.neutral100}
              unfilledColor={Theme.color.neutral50}
              height={gradientBarHeight}
              width={window.width - 2 * paddingHorizontal}
              borderRadius={100}
              gradient={
                levelUpGradient
                  ? Theme.gradients.levelUp
                  : Theme.gradients.progress
              }
              onAnimationFinished={this.handleGradientAnimationFinished}
            />
          ) : undefined}
          <Animated.View style={newPointsContainerStyles}>
            <Text h1 title={`+${newPoints}`} testID="newPoints" />
          </Animated.View>
          <View style={styles.progressOverlay}>
            <Lottie
              size={Theme.padding.p4}
              hidden={!showLottie}
              source={unlockLottie}
              repeat={false}
              speed={1.5}
            />
          </View>
        </View>
      </View>
    );
  }
}
