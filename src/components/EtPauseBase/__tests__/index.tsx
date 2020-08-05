import { cleanup, fireEvent, within } from "@testing-library/react-native";
import React from "react";
import DeviceInfo from "react-native-device-info";
import EtPauseBase from "../.";
import Errors from "../../../commons/Errors";
import Sentry from "../../../commons/Sentry";
import { replaceState } from "../../../commons/Store/action";
import {
  createExercise,
  setCurrentExercise
} from "../../../commons/Store/Exercise";
import { createPlaylist } from "../../../commons/Store/Playlist";
import { reconcileSyncDownload } from "../../../commons/Store/Sync";
import { createEtSession } from "../../../commons/Utils/TestMocks/control-playlist";
import { getTestProvider } from "../../../commons/Utils/TestMocks/get-test-provider";
import { renderWithProviders } from "../../../commons/Utils/TestUtils/react-testing-library";
import {
  ARTICLES,
  ET_SESSION,
  ET_SESSION_DEFINITIONS,
  FAKE_SYNC_DOWNLOAD_DATA,
  KNEE_PATHWAY,
  PLAYLISTS
} from "../../../example-data";
import * as sensorSelectors from "../../../commons/Store/Session/selectors";
import { getExerciseDefinitionsForCurrentEtSession } from "../../../commons/Store/ExerciseDefinition/selectors";

const prepareKneeExerciseCtx = ({
  isCurrentEtSessionSensorless = false,
  guidanceCuesEnabled = false,
  isInFTUFlow = false
}) => {
  const ctx = getTestProvider();
  ctx.store.dispatch(
    reconcileSyncDownload({
      ...FAKE_SYNC_DOWNLOAD_DATA,
      articles: ARTICLES,
      exerciseTherapySessionDefinitions: ET_SESSION_DEFINITIONS,
      pathways: [KNEE_PATHWAY],
      exerciseTherapySessions: [ET_SESSION],
      playlists: PLAYLISTS
    })
  );
  ctx.store.dispatch(createPlaylist());
  ctx.store.dispatch(createEtSession("1"));
  ctx.store.dispatch(createExercise());
  const exerciseId = Object.values(ctx.store.getState().exercises)[0].uuid;
  ctx.store.dispatch(setCurrentExercise(exerciseId));
  const state = ctx.store.getState();

  ctx.store.dispatch(
    replaceState({
      debug: {
        ...state.debug,
        featureFlags: {
          ...state.debug.featureFlags,
          guidanceCues: guidanceCuesEnabled
        }
      },
      session: {
        ...state.session,
        isCurrentEtSessionSensorless,
        isInFTUFlow
      },
      etActivity: {
        ...state.etActivity,
        isPaused: true
      }
    })
  );
  ctx.dispatchLog.length = 0;
  return ctx;
};

const isTabletSpy = jest.spyOn(DeviceInfo, "isTablet");
const isNewFtuPersonalizationEnabledSpy = jest.spyOn(
  sensorSelectors,
  "isNewFtuPersonalizationEnabled"
);
const resumeMock = jest.fn();
const restartMock = jest.fn();
const skipMock = jest.fn();
const restartInSensorlessModeMock = jest.fn();

describe("EtPauseBase", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders correctly in sensorful etSession", () => {
    const { getByTestId, queryAllByTestId, store } = renderWithProviders(
      <EtPauseBase
        restart={restartMock}
        restartInSensorlessMode={restartInSensorlessModeMock}
        resume={resumeMock}
        skip={skipMock}
      />,
      prepareKneeExerciseCtx({
        isCurrentEtSessionSensorless: false
      })
    );

    const pauseImage = getByTestId("pauseImage");
    const overlineText = getByTestId("etPauseOverline");
    const exerciseText = getByTestId("etPauseExercise");
    const etPauseControls = getByTestId("etPauseControls");
    const audioFeedbackToggle = getByTestId("audioFeedbackToggle");
    const sensorToggle = getByTestId("sensorToggle");
    const endButton = getByTestId("end");
    const audioGuidanceToggle = queryAllByTestId("audioGuidanceToggle");
    const totalExercises = getExerciseDefinitionsForCurrentEtSession(
      store.getState()
    );

    expect(pauseImage).toBeDefined();
    expect(overlineText.props.children).toBe(
      `EXERCISE 1 OUT OF ${totalExercises!.length}`
    );
    expect(exerciseText.props.children).toBe("Lunge");
    expect(etPauseControls).toBeDefined();
    expect(audioFeedbackToggle).toBeDefined();
    expect(sensorToggle).toBeDefined();
    expect(endButton).toBeDefined();
    expect(audioGuidanceToggle).toHaveLength(0);
  });

  it("renders correctly in sensorless etSession", () => {
    const { queryAllByTestId } = renderWithProviders(
      <EtPauseBase
        restart={restartMock}
        restartInSensorlessMode={restartInSensorlessModeMock}
        resume={resumeMock}
        skip={skipMock}
      />,
      prepareKneeExerciseCtx({ isCurrentEtSessionSensorless: true })
    );

    const sensorToggle = queryAllByTestId("sensorToggle");
    expect(sensorToggle).toHaveLength(0);
  });

  it("renders correctly when audioGuidance is enabled", () => {
    const { getByTestId } = renderWithProviders(
      <EtPauseBase
        restart={restartMock}
        restartInSensorlessMode={restartInSensorlessModeMock}
        resume={resumeMock}
        skip={skipMock}
      />,
      prepareKneeExerciseCtx({ guidanceCuesEnabled: true })
    );
    const audioGuidanceToggle = getByTestId("audioGuidanceToggle");
    expect(audioGuidanceToggle).toBeDefined();
  });

  it("renders correctly when audioGuidance is not enabled", () => {
    const { queryByTestId } = renderWithProviders(
      <EtPauseBase
        restart={restartMock}
        restartInSensorlessMode={restartInSensorlessModeMock}
        resume={resumeMock}
        skip={skipMock}
      />,
      prepareKneeExerciseCtx({ guidanceCuesEnabled: false })
    );
    const audioGuidanceToggle = queryByTestId("audioGuidanceToggle");
    expect(audioGuidanceToggle).toBeNull();
  });

  it("updates the SensorToggle value correctly", () => {
    const { getByTestId } = renderWithProviders(
      <EtPauseBase
        restart={restartMock}
        restartInSensorlessMode={restartInSensorlessModeMock}
        resume={resumeMock}
        skip={skipMock}
      />,
      prepareKneeExerciseCtx({ isCurrentEtSessionSensorless: false })
    );

    const sensorToggle = getByTestId("sensorToggle");

    expect(sensorToggle.props.value).toBe(true);
    fireEvent.valueChange(sensorToggle, false);
    expect(sensorToggle.props.value).toBe(false);
  });

  it("invokes a sentry error when currentExerciseDefinition is undefined", () => {
    const sentryErrorSpy = jest.spyOn(Sentry, "error");
    const ctx = prepareKneeExerciseCtx({});
    const state = ctx.store.getState();
    ctx.store.dispatch(
      replaceState({
        session: {
          ...state.session,
          currentExerciseId: undefined
        }
      })
    );

    renderWithProviders(
      <EtPauseBase
        restart={restartMock}
        restartInSensorlessMode={restartInSensorlessModeMock}
        resume={resumeMock}
        skip={skipMock}
      />,
      ctx
    );

    expect(sentryErrorSpy).toBeCalledWith(
      new Error(Errors.UNABLE_TO_FIND_CURRENT_EXERCISE_DEFINITION_FOR_ET_PAUSE)
    );
  });

  it("renders correct scrollView on tablet", () => {
    isTabletSpy.mockReturnValue(true);
    const { getByTestId } = renderWithProviders(
      <EtPauseBase
        restart={restartMock}
        restartInSensorlessMode={restartInSensorlessModeMock}
        resume={resumeMock}
        skip={skipMock}
      />,
      prepareKneeExerciseCtx({})
    );

    const entireScreenScrollView = within(
      getByTestId("etPauseScreen")
    ).getByTestId("keyboardScroll");
    const tabletScrollView = getByTestId("scrollViewTablet");

    expect(entireScreenScrollView.type).toBe("View");
    expect(tabletScrollView.getProp("scrollEnabled")).toBe(true);
  });

  it("renders correct scrollView on non-tablet", () => {
    isTabletSpy.mockReturnValue(false);
    const { getByTestId } = renderWithProviders(
      <EtPauseBase
        restart={restartMock}
        restartInSensorlessMode={restartInSensorlessModeMock}
        resume={resumeMock}
        skip={skipMock}
      />,
      prepareKneeExerciseCtx({})
    );

    const entireScreenScrollView = within(
      getByTestId("etPauseScreen")
    ).getByTestId("keyboardScroll");
    const tabletScrollView = getByTestId("scrollViewTablet");

    expect(entireScreenScrollView.type).toBe("ScrollView");
    expect(tabletScrollView.getProp("scrollEnabled")).toBe(false);
  });

  it("renders end button when not in FTU flow and in treatment", () => {
    isNewFtuPersonalizationEnabledSpy.mockReturnValue(true);
    const { getByTestId } = renderWithProviders(
      <EtPauseBase
        restart={restartMock}
        restartInSensorlessMode={restartInSensorlessModeMock}
        resume={resumeMock}
        skip={skipMock}
      />,
      prepareKneeExerciseCtx({
        isInFTUFlow: false
      })
    );
    expect(getByTestId("end")).toBeDefined();
  });

  it("does not render end button when in FTU flow and in treatment", () => {
    isNewFtuPersonalizationEnabledSpy.mockReturnValue(true);
    const { queryByTestId } = renderWithProviders(
      <EtPauseBase
        restart={restartMock}
        restartInSensorlessMode={restartInSensorlessModeMock}
        resume={resumeMock}
        skip={skipMock}
      />,
      prepareKneeExerciseCtx({
        isInFTUFlow: true
      })
    );
    expect(queryByTestId("end")).toBeNull();
  });

  it("renders end button when not in FTU flow and not in treatment", () => {
    isNewFtuPersonalizationEnabledSpy.mockReturnValue(false);
    const { queryByTestId } = renderWithProviders(
      <EtPauseBase
        restart={restartMock}
        restartInSensorlessMode={restartInSensorlessModeMock}
        resume={resumeMock}
        skip={skipMock}
      />,
      prepareKneeExerciseCtx({})
    );
    expect(queryByTestId("end")).toBeDefined();
  });
});
