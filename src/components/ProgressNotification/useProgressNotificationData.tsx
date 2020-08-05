import Errors from "../../commons/Errors";
import { ExerciseDefinition } from "../../commons/Models";
import Sentry from "../../commons/Sentry";
import { NormalizedObject } from "../../commons/Store";
import { getNewExerciseDefsForCurrentLevel } from "../../commons/Store/ExerciseDefinition/selectors";
import { getPathwayStream } from "../../commons/Store/Pathway";
import { getLevelConfigurationsForPathway } from "../../commons/Store/PathwayConfiguration/selectors";
import {
  getCurrentLevelIndex,
  getTotalLevelPoints,
  getTotalLevelPointsEarned
} from "../../commons/Store/PathwayPointsEntries";
import { useRootSelector } from "../../commons/Store/selectors";
import {
  getDidLevelUpgrade,
  getLevelIfUpgraded,
  getLevelPointsEarnedIfUpgraded,
  getPreviousPlaylistItemPointsEarned,
  getTotalLevelPointsIfUpgraded
} from "../../commons/Store/selectors/points";
import { getLevelDescriptionByStream } from ".";

interface Props {
  newPoints: number;
  initialLevel: number;
  currentPoints: number;
  totalPoints: number;
  nextCurrentPoints: number;
  nextTotalPoints: number;
  currentUserLevel: number;
  levelDescription: string;
  upgradedLevel: boolean;
  whatsNewEnabled: boolean;
  newExerciseDefs: ReadonlyArray<NormalizedObject<ExerciseDefinition>>;
}

export function useProgressNotificationData(): Props {
  const whatsNewFlagEnabled = useRootSelector(
    state => state.debug.featureFlags.whatsNew
  );
  const upgradedLevel = useRootSelector(getDidLevelUpgrade);
  const whatsNewEnabled = whatsNewFlagEnabled && upgradedLevel;
  const pathwayLevelConfigs = useRootSelector(getLevelConfigurationsForPathway);
  const userLevelIdx = useRootSelector(getCurrentLevelIndex);
  const currentUserLevel = userLevelIdx + 1;
  const currentLevelConfig = pathwayLevelConfigs[userLevelIdx];
  const pathwayStream = useRootSelector(getPathwayStream);
  const levelDescription = getLevelDescriptionByStream(
    pathwayStream,
    currentLevelConfig.description
  );
  const newExerciseDefs = useRootSelector(getNewExerciseDefsForCurrentLevel);

  if (levelDescription === undefined) {
    Sentry.error(
      new Error(
        Errors.UNABLE_TO_FIND_LEVEL_DESCRIPTION_DURING_PROGRESS_NOTIFICATION
      )
    );
  }

  const newPoints = useRootSelector(getPreviousPlaylistItemPointsEarned);
  const initialLevel = useRootSelector(getLevelIfUpgraded) + 1;
  const currentPoints = useRootSelector(getLevelPointsEarnedIfUpgraded);
  const totalPoints = useRootSelector(getTotalLevelPointsIfUpgraded);
  const nextCurrentPoints = useRootSelector(getTotalLevelPointsEarned);
  const nextTotalPoints = useRootSelector(getTotalLevelPoints);

  return {
    newPoints,
    initialLevel,
    currentPoints,
    totalPoints,
    nextCurrentPoints,
    nextTotalPoints,
    currentUserLevel,
    levelDescription: levelDescription || "",
    upgradedLevel,
    whatsNewEnabled,
    newExerciseDefs
  };
}
