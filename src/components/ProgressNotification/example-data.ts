import { ExerciseDefinition } from "../../commons/Models";
import { NormalizedObject } from "../../commons/Store";

export const NORMALIZED_KNEE_EXTENSION: NormalizedObject<ExerciseDefinition> = {
  __typename: "ExerciseDefinition",
  id: "2",
  motions: [],
  pointsPerRep: 5,
  repetitionCount: 5,
  requirements: ["chair"],
  routine: "knee-extension",
  startAngle: 90,
  multipleLimb: true
};

export const NORMALIZED_SIDE_LUNGE: NormalizedObject<ExerciseDefinition> = {
  id: "7",
  motions: [],
  pointsPerRep: 5,
  repetitionCount: 5,
  requirements: [],
  routine: "side-lunge",
  startAngle: 90,
  multipleLimb: false
};

export const normalizedExerciseDefsArray: ReadonlyArray<NormalizedObject<
  ExerciseDefinition
>> = [NORMALIZED_SIDE_LUNGE, NORMALIZED_KNEE_EXTENSION];
