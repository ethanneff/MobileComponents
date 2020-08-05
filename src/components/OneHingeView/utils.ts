import { AngleTransformation } from "./interfaces";

/**
 * Returns appropriate angle transforming function
 * depending on the exercise being rendered.
 */
export function getAngleTransformation(transformation: AngleTransformation) {
  switch (transformation) {
    case AngleTransformation.SeatedHamstringStretch:
    case AngleTransformation.Woodpecker:
      return (angle: number) => 360 - angle;
    case AngleTransformation.SideBend:
      return (angle: number) => 270 - angle;
    case AngleTransformation.Clamshell:
      return (angle: number) => 270 + angle;
    case AngleTransformation.SidelyingRotation:
      return (angle: number) => 180 - angle;
    case AngleTransformation.FireHydrant:
    case AngleTransformation.InternalHipRotation:
    case AngleTransformation.ExternalHipRotation:
    case AngleTransformation.SidePlankLeft:
    case AngleTransformation.SidePlankRight:
    case AngleTransformation.SidePlank:
      return (angle: number) => 90 - angle;
  }
}
