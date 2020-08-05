import { AngleTransformation } from "../interfaces";
import { getAngleTransformation } from "../utils";

describe(getAngleTransformation, () => {
  it("returns correct angle transformation function for SLVB", () => {
    const transform = getAngleTransformation(AngleTransformation.Woodpecker);

    expect(transform(0)).toBe(360);
    expect(transform(60)).toBe(300);
    expect(transform(180)).toBe(180);
    expect(transform(300)).toBe(60);
    expect(transform(400)).toBe(-40);
  });

  it("returns correct angle transformation function for SLVB_R", () => {
    const transform = getAngleTransformation(AngleTransformation.SideBend);

    expect(transform(0)).toBe(270);
    expect(transform(60)).toBe(210);
    expect(transform(180)).toBe(90);
    expect(transform(300)).toBe(-30);
    expect(transform(360)).toBe(-90);
    expect(transform(400)).toBe(-130);
  });

  it("returns correct angle transformation function for SLH", () => {
    const transform = getAngleTransformation(AngleTransformation.SidePlankLeft);

    expect(transform(0)).toBe(90);
    expect(transform(180)).toBe(-90);
    expect(transform(300)).toBe(-210);
    expect(transform(360)).toBe(-270);
    expect(transform(400)).toBe(-310);
  });

  it("returns correct angle transformation function for SLH_R", () => {
    const transform = getAngleTransformation(
      AngleTransformation.SidePlankRight
    );

    expect(transform(0)).toBe(90);
    expect(transform(180)).toBe(-90);

    expect(transform(300)).toBe(-210);
    expect(transform(360)).toBe(-270);
    expect(transform(400)).toBe(-310);
  });

  it("returns correct angle transformation function for Fire Hydrant", () => {
    const transform = getAngleTransformation(AngleTransformation.FireHydrant);

    expect(transform(0)).toBe(90);
    expect(transform(180)).toBe(-90);

    expect(transform(300)).toBe(-210);
    expect(transform(360)).toBe(-270);
    expect(transform(400)).toBe(-310);
  });

  it("returns correct angle transformation function for Internal Hip Rotation", () => {
    const transform = getAngleTransformation(
      AngleTransformation.InternalHipRotation
    );

    expect(transform(0)).toBe(90);
    expect(transform(180)).toBe(-90);

    expect(transform(300)).toBe(-210);
    expect(transform(360)).toBe(-270);
    expect(transform(400)).toBe(-310);
  });

  it("returns correct angle transformation function for External Hip Rotation", () => {
    const transform = getAngleTransformation(
      AngleTransformation.ExternalHipRotation
    );

    expect(transform(0)).toBe(90);
    expect(transform(180)).toBe(-90);

    expect(transform(300)).toBe(-210);
    expect(transform(360)).toBe(-270);
    expect(transform(400)).toBe(-310);
  });

  it("returns correct angle transformation function for Clamshell (with roll value)", () => {
    const transform = getAngleTransformation(AngleTransformation.Clamshell);

    expect(transform(0)).toBe(270);
    expect(transform(90)).toBe(360);
    expect(transform(-90)).toBe(180);
    expect(transform(45)).toBe(315);
    expect(transform(-45)).toBe(225);
  });
});
