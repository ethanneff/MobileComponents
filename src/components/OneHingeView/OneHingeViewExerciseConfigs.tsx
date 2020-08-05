import { DifficultyAdjustmentFactor } from "../../commons/Physio";
import { AngleTransformation, OneHingeViewExerciseConfig } from "./interfaces";

const Woodpecker: OneHingeViewExerciseConfig = {
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive,
  fixedPosition: "bottomMiddle",
  angleTransformation: AngleTransformation.Woodpecker
};

const SidePlankLeft: OneHingeViewExerciseConfig = {
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive,
  fixedPosition: "topLeft",
  angleTransformation: AngleTransformation.SidePlankLeft
};

const SidePlankRight: OneHingeViewExerciseConfig = {
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Negative,
  fixedPosition: "topRight",
  angleTransformation: AngleTransformation.SidePlankRight
};

const SideBend: OneHingeViewExerciseConfig = {
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive,
  fixedPosition: "bottomMiddle",
  angleTransformation: AngleTransformation.SideBend
};

type OneHingeViewExerciseConfigKeys =
  | "Woodpecker"
  | "SidePlankLeft"
  | "SidePlankRight"
  | "SideBend";

export type OneHingeViewExerciseConfigsType = {
  [index in OneHingeViewExerciseConfigKeys]: OneHingeViewExerciseConfig;
};

const Configs: OneHingeViewExerciseConfigsType = {
  Woodpecker,
  SidePlankLeft,
  SidePlankRight,
  SideBend
};

export default Configs;
