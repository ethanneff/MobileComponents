import React from "react";
import renderer, { ReactTestRenderer, act } from "react-test-renderer";
import { Store } from "redux";
import withSensors, { SensorInjectedProps } from "..";
import { Event, track } from "../../../commons/Analytics";
import { RootAction } from "../../../commons/Store/action";
import { ActionType } from "../../../commons/Store/ActionType";
import { RootState } from "../../../commons/Store/reducer";
import {
  SensorErrorType,
  updateCharacteristic
} from "../../../commons/Store/Sensor";
import { setRequiredSensors } from "../../../commons/Store/SensorConfig/actions";
import { setCurrentEtSession } from "../../../commons/Store/Session";
import { reconcileSyncDownload } from "../../../commons/Store/Sync";
import { MockNavigation } from "../../../commons/Utils/TestMocks";
import { getTestProvider } from "../../../commons/Utils/TestMocks/get-test-provider";
import { updateSensor } from "../../../commons/Utils/TestUtils/sensors";
import Text from "../../../components/Text";
import {
  ET_SESSIONS,
  ET_SESSION_DEFINITIONS,
  FAKE_SYNC_DOWNLOAD_DATA,
  PATHWAYS
} from "../../../example-data";

jest.mock("../../../commons/Analytics", () =>
  Object.assign(require.requireActual("../../../commons/Analytics"), {
    track: jest.fn()
  })
);

describe("WithSensors Component", () => {
  let mockNavigation: MockNavigation;
  let store: Store<RootState, RootAction>;
  let dom: ReactTestRenderer;

  beforeEach(() => {
    const { TestProvider, navigation, store: testStore } = getTestProvider();
    mockNavigation = navigation;
    store = testStore;

    act(() => {
      store.dispatch(
        reconcileSyncDownload({
          ...FAKE_SYNC_DOWNLOAD_DATA,
          exerciseTherapySessions: ET_SESSIONS,
          pathways: PATHWAYS,
          exerciseTherapySessionDefinitions: ET_SESSION_DEFINITIONS
        })
      );

      store.dispatch(setCurrentEtSession(ET_SESSIONS[0].uuid));

      updateSensor(store, "sensorOne", {
        roll: 0,
        pitch: 0,
        lastNotification: 0
      });
      updateSensor(store, "sensorTwo", {
        roll: 0,
        pitch: 0,
        lastNotification: 0
      });
    });

    const TestView: React.SFC<SensorInjectedProps> = props => (
      <Text title={JSON.stringify(props)} />
    );
    const WrappedComponent = withSensors(TestView);
    act(() => {
      dom = renderer.create(
        <TestProvider>
          <WrappedComponent />
        </TestProvider>
      );
    });
  });

  it("renders correctly", () => {
    const props = JSON.parse(dom.root.findByType(Text).props.title);

    expect(props).toMatchObject({
      sensors: [
        {
          id: "sensorOne",
          pitch: 0
        },
        {
          id: "sensorTwo",
          pitch: 0
        }
      ]
    });
  });

  describe("when a sensor error is triggered", () => {
    beforeEach(() => {
      mockNavigation.isFocused = jest
        .fn<typeof mockNavigation.isFocused>()
        .mockImplementation(() => true);
    });

    it("navigates to SensorConnection", () => {
      act(() => {
        store.dispatch({
          type: ActionType.SENSOR_ERROR,
          payload: SensorErrorType.Sensor
        });
      });

      expect(mockNavigation.navigate.mock.calls.length).toBe(1);
      expect(mockNavigation.navigate.mock.calls[0][0]).toBe("SensorConnection");
    });

    it("navigates to SensorConnection with the current screen as parameter", () => {
      mockNavigation.state.routeName = "Current screen";
      act(() => {
        store.dispatch({
          type: ActionType.SENSOR_ERROR,
          payload: SensorErrorType.Sensor
        });
      });

      expect(mockNavigation.navigate.mock.calls.length).toBe(1);
      expect(mockNavigation.navigate.mock.calls[0][0]).toBe("SensorConnection");
      expect(mockNavigation.navigate.mock.calls[0][1]).toEqual({
        previous: "Current screen"
      });
    });

    it("does not navigate to SensorConnection if the same error is triggered", () => {
      act(() => {
        store.dispatch({
          type: ActionType.SENSOR_ERROR,
          payload: SensorErrorType.Sensor
        });
      });

      expect(mockNavigation.navigate.mock.calls.length).toBe(1);
      expect(mockNavigation.navigate.mock.calls[0][0]).toBe("SensorConnection");
      act(() => {
        store.dispatch({
          type: ActionType.SENSOR_ERROR,
          payload: SensorErrorType.Sensor
        });
      });

      expect(mockNavigation.navigate.mock.calls.length).toBe(1);
      expect(mockNavigation.navigate.mock.calls[0][0]).toBe("SensorConnection");
    });

    it("does not navigate to SensorConnection if the it's already on SensorConnection", () => {
      act(() => {
        store.dispatch({
          type: ActionType.SENSOR_ERROR,
          payload: SensorErrorType.Sensor
        });
      });

      expect(mockNavigation.navigate.mock.calls.length).toBe(1);
      expect(mockNavigation.navigate.mock.calls[0][0]).toBe("SensorConnection");

      mockNavigation.state.routeName = "SensorConnection";
      act(() => {
        store.dispatch({
          type: ActionType.SENSOR_ERROR,
          payload: SensorErrorType.Bluetooth
        });
      });

      expect(mockNavigation.navigate.mock.calls.length).toBe(1);
      expect(mockNavigation.navigate.mock.calls[0][0]).toBe("SensorConnection");
    });

    it("if withSensors is not in focus, does not navigate to SensorConnection", () => {
      mockNavigation.isFocused = jest
        .fn<typeof mockNavigation.isFocused>()
        .mockImplementation(() => false);

      act(() => {
        store.dispatch({
          type: ActionType.SENSOR_ERROR,
          payload: SensorErrorType.Sensor
        });
      });

      expect(mockNavigation.navigate.mock.calls.length).toBe(0);
    });

    it("calls the track method for SensorConnectionDropped", () => {
      mockNavigation.state.routeName = "CalibrationPage";

      act(() => {
        store.dispatch(
          updateCharacteristic({
            id: "sensorOne",
            val: { battery: 99 }
          })
        );
      });

      act(() => {
        store.dispatch(
          updateCharacteristic({
            id: "sensorTwo",
            val: { battery: 99 }
          })
        );
      });

      act(() => {
        store.dispatch({
          type: ActionType.SENSOR_ERROR,
          payload: SensorErrorType.Disconnection
        });
      });

      expect(track).toBeCalledWith(Event.SensorConnectionDropped, {
        "Battery level sensor 1 (%)": 99,
        "Battery level sensor 2 (%)": 99,
        "Current Page": "CalibrationPage"
      });
    });

    it("calls the track method for SensorConnectionDropped if requiredSensor === 3", () => {
      mockNavigation.state.routeName = "CalibrationPage";

      const sensorState = store.getState().sensor;
      const sensorOne = {
        id: "sensorOne",
        battery: 99,
        lastNotification: 0
      };
      const sensorTwo = {
        id: "sensorTwo",
        battery: 99,
        lastNotification: 0
      };
      const sensorThree = {
        id: "sensorThree",
        battery: 99,
        lastNotification: 0
      };
      sensorState.sensors = {
        sensorOne,
        sensorTwo,
        sensorThree
      };

      act(() => {
        store.dispatch(setRequiredSensors(3));
        store.dispatch({
          type: ActionType.SENSOR_ERROR,
          payload: SensorErrorType.Disconnection
        });
        store.dispatch(setRequiredSensors(3));
      });

      expect(track).toBeCalledWith(Event.SensorConnectionDropped, {
        "Battery level sensor 1 (%)": 99,
        "Battery level sensor 2 (%)": 99,
        "Battery level sensor 3 (%)": 99,
        "Current Page": "CalibrationPage"
      });
    });
  });
});
