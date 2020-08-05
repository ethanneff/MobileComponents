import {
  RendererViewConfig,
  ViewExerciseConfig
} from "../../commons/Physio/SupportedExercises";
import { HingeGridPosition } from "../HingeView/HingeGrid";

export interface OneHingeViewExerciseConfig extends ViewExerciseConfig {
  fixedPosition: HingeGridPosition;
  angleTransformation: AngleTransformation;
}

export enum AngleTransformation {
  Woodpecker,
  SideBend,
  SidePlankLeft,
  SidePlankRight,
  FireHydrant,
  InternalHipRotation,
  ExternalHipRotation,
  Clamshell,
  SidelyingRotation,
  SidePlank,
  SeatedHamstringStretch
}

export function isOneHingeViewConfig(
  c: RendererViewConfig
): c is OneHingeViewExerciseConfig {
  return (c as OneHingeViewExerciseConfig).fixedPosition !== undefined;
}
