import { cleanup, fireEvent } from "@testing-library/react-native";
import React from "react";
import * as analyticsUtils from "../../../commons/Analytics";
import * as guidanceAudioHooks from "../../../commons/Hooks/useGuidanceAudio";
import { replaceState } from "../../../commons/Store/action";
import { ActionType } from "../../../commons/Store/ActionType";
import {
  createExercise,
  setCurrentExercise
} from "../../../commons/Store/Exercise";
import * as exerciseActivityStateActions from "../../../commons/Store/ExerciseActivityState/actions";
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
import PauseControls from "../PauseControls";

const restartMock = jest.fn();
const restartInSensorlessModeMock = jest.fn();
const skipMock = jest.fn();
const resumeMock = jest.fn();
const audioGuidanceStopMock = jest.fn();
const useGuidanceAudioSpy = jest.spyOn(guidanceAudioHooks, "useGuidanceAudio");
const mixPanelSpy = jest.spyOn(analyticsUtils, "track");

const prepareKneeExerciseCtx = ({ isCurrentEtSessionSensorless = false }) => {
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
      session: {
        ...state.session,
        isCurrentEtSessionSensorless
      }
    })
  );
  ctx.dispatchLog.length = 0;
  return ctx;
};

describe("<PauseControls />", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("renders correctly", () => {
    const { getByTestId } = renderWithProviders(
      <PauseControls
        restart={restartMock}
        sensorfulToggle={false}
        restartInSensorlessMode={restartInSensorlessModeMock}
        skip={skipMock}
        resume={resumeMock}
      />
    );

    const restartButton = getByTestId("restart");
    const playButton = getByTestId("play");
    const skipButton = getByTestId("skip");

    expect(restartButton).toBeDefined();
    expect(playButton).toBeDefined();
    expect(skipButton).toBeDefined();
  });
});

describe("<PauseControls /> in Sensorful ET Session", () => {
  beforeEach(() => {
    useGuidanceAudioSpy.mockReturnValue({
      stop: audioGuidanceStopMock
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("behaves correctly when the resume button is pressed", () => {
    const { getByTestId, navigation } = renderWithProviders(
      <PauseControls
        restart={restartMock}
        sensorfulToggle={true}
        restartInSensorlessMode={restartInSensorlessModeMock}
        skip={skipMock}
        resume={resumeMock}
      />,
      prepareKneeExerciseCtx({ isCurrentEtSessionSensorless: false })
    );

    const resumeButton = getByTestId("play");
    fireEvent.press(resumeButton);
    expect(navigation.goBack).toHaveBeenCalled();
    expect(resumeMock).toHaveBeenCalled();
  });

  it("behaves correctly and transitions to sensorless when the resume button is pressed", () => {
    const { getByTestId } = renderWithProviders(
      <PauseControls
        restart={restartMock}
        sensorfulToggle={false}
        restartInSensorlessMode={restartInSensorlessModeMock}
        skip={skipMock}
        resume={resumeMock}
      />,
      prepareKneeExerciseCtx({ isCurrentEtSessionSensorless: false })
    );

    const resumeButton = getByTestId("play");
    fireEvent.press(resumeButton);

    expect(audioGuidanceStopMock).toHaveBeenCalled();
    expect(mixPanelSpy).toHaveBeenLastCalledWith(
      "Switch to Sensorless Mid-Workout Button Clicked",
      {
        "Current Page": "ET Activity",
        Exercise: "lunge"
      }
    );
    expect(restartInSensorlessModeMock).toHaveBeenCalled();
  });

  it("behaves correctly and transitions to sensorless when the restart button is pressed", () => {
    const { getByTestId } = renderWithProviders(
      <PauseControls
        restart={restartMock}
        sensorfulToggle={false}
        restartInSensorlessMode={restartInSensorlessModeMock}
        skip={skipMock}
        resume={resumeMock}
      />,
      prepareKneeExerciseCtx({ isCurrentEtSessionSensorless: false })
    );

    const restartButton = getByTestId("restart");
    fireEvent.press(restartButton);

    expect(audioGuidanceStopMock).toHaveBeenCalled();
    expect(mixPanelSpy).toHaveBeenLastCalledWith(
      "Switch to Sensorless Mid-Workout Button Clicked",
      {
        "Current Page": "ET Activity",
        Exercise: "lunge"
      }
    );
    expect(restartInSensorlessModeMock).toHaveBeenCalled();
  });

  it("behaves correctly when the skip button is pressed", () => {
    const skipExerciseActionSpy = jest.spyOn(
      exerciseActivityStateActions,
      "setCurrentExerciseAsSkipped"
    );

    const expectedSkipAction = {
      type: ActionType.MOTION_ADVANCED
    };

    const { getByTestId, dispatchLog } = renderWithProviders(
      <PauseControls
        restart={restartMock}
        sensorfulToggle={true}
        restartInSensorlessMode={restartInSensorlessModeMock}
        skip={skipMock}
        resume={resumeMock}
      />,
      prepareKneeExerciseCtx({ isCurrentEtSessionSensorless: false })
    );

    const skipButton = getByTestId("skip");
    fireEvent.press(skipButton);

    expect(audioGuidanceStopMock).toHaveBeenCalled();
    expect(skipExerciseActionSpy).toHaveBeenCalled();
    expect(dispatchLog).toEqual(
      expect.arrayContaining([expect.objectContaining(expectedSkipAction)])
    );
    expect(skipMock).toHaveBeenCalled();
  });

  it("behaves correctly when the restart button is pressed", () => {
    const { getByTestId } = renderWithProviders(
      <PauseControls
        restart={restartMock}
        sensorfulToggle={true}
        restartInSensorlessMode={restartInSensorlessModeMock}
        skip={skipMock}
        resume={resumeMock}
      />,
      prepareKneeExerciseCtx({ isCurrentEtSessionSensorless: false })
    );

    const restartButton = getByTestId("restart");
    fireEvent.press(restartButton);

    expect(audioGuidanceStopMock).toHaveBeenCalled();
    expect(restartMock).toHaveBeenCalled();
  });

  it("behaves correctly and transitions to sensorless when the restart button is pressed on knee", () => {
    const { getByTestId } = renderWithProviders(
      <PauseControls
        restart={restartMock}
        sensorfulToggle={false}
        restartInSensorlessMode={restartInSensorlessModeMock}
        skip={skipMock}
        resume={resumeMock}
      />,
      prepareKneeExerciseCtx({ isCurrentEtSessionSensorless: false })
    );

    const restartButton = getByTestId("restart");
    fireEvent.press(restartButton);

    expect(audioGuidanceStopMock).toHaveBeenCalled();
    expect(restartInSensorlessModeMock).toHaveBeenCalled();
  });
});

describe("<PauseControls /> in Sensorless ET Session", () => {
  beforeEach(() => {
    useGuidanceAudioSpy.mockReturnValue({
      stop: audioGuidanceStopMock
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("behaves correctly when the resume button is pressed", () => {
    const { getByTestId, navigation } = renderWithProviders(
      <PauseControls
        restart={restartMock}
        sensorfulToggle={false}
        restartInSensorlessMode={restartInSensorlessModeMock}
        skip={skipMock}
        resume={resumeMock}
      />,
      prepareKneeExerciseCtx({ isCurrentEtSessionSensorless: true })
    );

    const resumeButton = getByTestId("play");
    fireEvent.press(resumeButton);

    expect(navigation.goBack).toHaveBeenCalled();
    expect(resumeMock).toHaveBeenCalled();
  });

  it("behaves correctly when the restart button is pressed", () => {
    const { getByTestId } = renderWithProviders(
      <PauseControls
        restart={restartMock}
        sensorfulToggle={false}
        restartInSensorlessMode={restartInSensorlessModeMock}
        skip={skipMock}
        resume={resumeMock}
      />,
      prepareKneeExerciseCtx({ isCurrentEtSessionSensorless: true })
    );

    const restartButton = getByTestId("restart");
    fireEvent.press(restartButton);

    expect(audioGuidanceStopMock).toHaveBeenCalled();
    expect(restartMock).toHaveBeenCalled();
  });

  it("behaves correctly when the skip button is pressed", () => {
    const skipExerciseActionSpy = jest.spyOn(
      exerciseActivityStateActions,
      "setCurrentExerciseAsSkipped"
    );

    const expectedSkipAction = {
      type: ActionType.MOTION_ADVANCED
    };

    const { getByTestId, dispatchLog } = renderWithProviders(
      <PauseControls
        restart={restartMock}
        sensorfulToggle={false}
        restartInSensorlessMode={restartInSensorlessModeMock}
        skip={skipMock}
        resume={resumeMock}
      />,
      prepareKneeExerciseCtx({ isCurrentEtSessionSensorless: true })
    );

    const skipButton = getByTestId("skip");
    fireEvent.press(skipButton);

    expect(audioGuidanceStopMock).toHaveBeenCalled();
    expect(skipExerciseActionSpy).toHaveBeenCalled();
    expect(dispatchLog).toEqual(
      expect.arrayContaining([expect.objectContaining(expectedSkipAction)])
    );
    expect(skipMock).toHaveBeenCalled();
  });
});
