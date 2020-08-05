import React from "react";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Event, track } from "../../commons/Analytics";
import { current as guidanceAudio } from "../../commons/Hooks/useGuidanceAudio";
import { DispatchMap } from "../../commons/Store/interfaces";
import { RootState } from "../../commons/Store/reducer";
import { getSensors } from "../../commons/Store/selectors/sensor";
import {
  SensorErrorType,
  SensorStatusType,
  startBluetooth,
  stopBluetooth
} from "../../commons/Store/Sensor";
import { getIsCurrentEtSessionSensorless } from "../../commons/Store/Session/selectors";
import { SensorType } from "../../commons/Utils/SensorConnecting";
import { getBatteryLevel } from "../../containers/SensorConnection/SensorConnectionUtils";

interface StateProps {
  sensors: SensorType[];
  sensorStatus: SensorStatusType;
  sensorError: SensorErrorType;
  requiredSensorCount: number;
  isCurrentEtSessionSensorless: boolean;
}

interface TrackData {
  [key: string]: number | string;
}

type DispatchProps = DispatchMap<{
  startBluetooth: typeof startBluetooth;
  stopBluetooth: typeof stopBluetooth;
}>;

export type SensorInjectedProps = StateProps & DispatchProps;

export default function <P>(
  Component: React.ComponentType<P & SensorInjectedProps>
) {
  type Props = NavigationInjectedProps & SensorInjectedProps;
  class HOC extends React.PureComponent<Props> {
    componentDidUpdate(prevProps: Props) {
      const { navigation, isCurrentEtSessionSensorless } = this.props;
      if (navigation.isFocused() && !isCurrentEtSessionSensorless) {
        this.navigateIfConnectionLost(prevProps);
      }
    }

    navigateIfConnectionLost(prevProps: Props) {
      const { sensorError, navigation, sensorStatus } = this.props;

      if (sensorStatus !== SensorStatusType.Error) {
        return;
      }

      if (
        sensorError === SensorErrorType.None ||
        sensorError === prevProps.sensorError
      ) {
        return;
      }

      const routeName = navigation.state.routeName;
      const sensorConnectionRouteName = "SensorConnection";

      if (routeName === sensorConnectionRouteName) {
        return;
      }

      if (guidanceAudio) {
        guidanceAudio.stop();
      }
      navigation.navigate(sensorConnectionRouteName, {
        previous: routeName
      });

      this.trackDisconnection(routeName);
    }

    trackDisconnection(routeNameDuringDisconnection: string | undefined) {
      const { sensors, requiredSensorCount } = this.props;
      const [sensorOne, sensorTwo] = sensors;

      const batteryLevelSensorOne = getBatteryLevel(sensorOne);
      const batteryLevelSensorTwo = getBatteryLevel(sensorTwo);

      const currentPageProperty =
        routeNameDuringDisconnection !== undefined
          ? routeNameDuringDisconnection
          : "N/A";

      const trackData: TrackData = {
        "Battery level sensor 1 (%)": batteryLevelSensorOne,
        "Battery level sensor 2 (%)": batteryLevelSensorTwo,
        "Current Page": currentPageProperty
      };

      if (requiredSensorCount > 2) {
        const batteryLevelForAdditionalSensors = sensors.reduce(
          (array: TrackData[], sensor) => {
            if (
              sensor.id &&
              sensor.id !== sensorOne.id &&
              sensor.id !== sensorTwo.id
            ) {
              array.push({
                address: sensor.id,
                battery: getBatteryLevel(sensor)
              });
            }
            return array;
          },
          []
        );

        batteryLevelForAdditionalSensors.forEach((sensor, batteryLevel) => {
          if (!sensor) {
            return;
          }
          trackData[`Battery level sensor ${batteryLevel + 3} (%)`] =
            sensor.battery;
        });
      }

      track(Event.SensorConnectionDropped, trackData);
    }

    render() {
      return <Component {...(this.props as any)} />;
    }
  }

  const mapStateToProps = (state: RootState): StateProps => ({
    sensors: getSensors(state),
    sensorStatus: state.sensor.status,
    sensorError: state.sensor.error,
    requiredSensorCount: state.sensorConfig.requiredSensorCount,
    isCurrentEtSessionSensorless: getIsCurrentEtSessionSensorless(state)
  });

  const mapDispatchToProps = { startBluetooth, stopBluetooth };

  return connect(mapStateToProps, mapDispatchToProps)(withNavigation(HOC));
}
