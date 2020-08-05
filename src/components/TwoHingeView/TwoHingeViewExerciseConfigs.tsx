import { DifficultyAdjustmentFactor } from "../../commons/Physio";
import {
  FixedHinge,
  RestPosition,
  TargetZoneLength,
  TargetZonePosition
} from "./Enums";
import { TwoHingeViewExerciseConfig } from "./Interfaces";

const QuadStretch: TwoHingeViewExerciseConfig = {
  fixedHinge: FixedHinge.Top,
  targetPosition: TargetZonePosition.MiddleInner,
  targetLength: TargetZoneLength.Inner,
  fixedPosition: "topMiddle",
  restPosition: RestPosition.MiddleToOuter,
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Negative
};

const LegRaise: TwoHingeViewExerciseConfig = {
  fixedHinge: FixedHinge.Top,
  targetPosition: TargetZonePosition.MiddleGravity,
  targetLength: TargetZoneLength.Inner,
  fixedPosition: "topMiddle",
  restPosition: RestPosition.MiddleToOuter,
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Negative
};

const SeatedLegRaise: TwoHingeViewExerciseConfig = {
  fixedHinge: FixedHinge.Top,
  targetPosition: TargetZonePosition.FixedHingeGravity,
  targetLength: TargetZoneLength.WholeLimb,
  fixedPosition: "centerLeft",
  restPosition: RestPosition.MiddleToOuter,
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
};

const Hamstring: TwoHingeViewExerciseConfig = {
  fixedHinge: FixedHinge.Top,
  targetPosition: TargetZonePosition.FixedHingeGravity,
  targetLength: TargetZoneLength.WholeLimb,
  fixedPosition: "topMiddle",
  restPosition: RestPosition.InnerToOuter,
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
};

const LegDip: TwoHingeViewExerciseConfig = {
  fixedHinge: FixedHinge.Bottom,
  targetPosition: TargetZonePosition.MiddleGravity,
  targetLength: TargetZoneLength.Outer,
  fixedPosition: "bottomMiddle",
  restPosition: RestPosition.MiddleToInner,
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Negative
};

const SittingStanding: TwoHingeViewExerciseConfig = {
  fixedHinge: FixedHinge.Bottom,
  targetPosition: TargetZonePosition.MiddleGravity,
  targetLength: TargetZoneLength.Outer,
  fixedPosition: "bottomMiddle",
  restPosition: RestPosition.MiddleToInner,
  difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
};

type TwoHingeViewExerciseConfigKeys =
  | "QuadStretch"
  | "LegRaise"
  | "SeatedLegRaise"
  | "Hamstring"
  | "LegDip"
  | "SittingStanding";

export type TwoHingeViewExerciseConfigsType = {
  [index in TwoHingeViewExerciseConfigKeys]: TwoHingeViewExerciseConfig;
};

const Configs: TwoHingeViewExerciseConfigsType = {
  QuadStretch,
  LegRaise,
  SeatedLegRaise,
  Hamstring,
  LegDip,
  SittingStanding
};

export default Configs;
