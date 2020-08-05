import React from "react";
import TwoHingeView from "..";
import { DifficultyAdjustmentFactor } from "../../../commons/Physio";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import {
  FixedHinge,
  RestPosition,
  TargetZoneLength,
  TargetZonePosition
} from "../Enums";
import { TwoHingeViewExerciseConfig } from "../Interfaces";

// Disable no-magic number rule
/* tslint:disable:no-magic-numbers */

const canvasSize = 600;

describe("When the fixed hinge is the Hip", () => {
  const fixedHinge = FixedHinge.Top;
  describe("When the fixedHingePosition is TopMiddle", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "topMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is TopLeft", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "topLeft",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is TopRight", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "topRight",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is CenterLeft", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "centerLeft",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is CenterRight", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "centerRight",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is BottomMiddle", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "bottomMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is BottomLeft", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "bottomLeft",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is BottomRight", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "bottomRight",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });
});

describe("When the fixed hinge is the Ankle", () => {
  const fixedHinge = FixedHinge.Bottom;
  describe("When the fixedHingePosition is TopMiddle", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.MiddleToInner,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "topMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is TopLeft", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.MiddleToInner,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "topLeft",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is TopRight", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.MiddleToInner,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "topRight",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is CenterLeft", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.MiddleToInner,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "centerLeft",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is CenterRight", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.MiddleToInner,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "centerRight",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is BottomMiddle", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.MiddleToInner,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "bottomMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("When the fixedHingePosition is BottomRight", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge,
      restPosition: RestPosition.MiddleToInner,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "bottomRight",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("renders correctly", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          pitchOuterLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
