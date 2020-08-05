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
  const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
    fixedHinge: FixedHinge.Top,
    restPosition: RestPosition.InnerToOuter,
    targetPosition: TargetZonePosition.FixedHingeGravity,
    targetLength: TargetZoneLength.Inner,
    fixedPosition: "topMiddle",
    difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
  };

  describe("the Thigh on its own", () => {
    it("renders correctly at 0", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });

    it("renders correctly at 90", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={90}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });

    it("renders correctly at 180", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={180}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });

    it("renders correctly at 270", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={270}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("Thigh and the Shank", () => {
    describe("with Thigh pitch at 0", () => {
      it("renders correctly with shank pitch at 0", () => {
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

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 180", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            pitchOuterLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 270", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            pitchOuterLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 90", () => {
      it("renders correctly with shank pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            pitchOuterLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 180", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            pitchOuterLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 270", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            pitchOuterLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 180", () => {
      it("renders correctly with shank pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            pitchOuterLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 180", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            pitchOuterLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 270", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            pitchOuterLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 270", () => {
      it("renders correctly with shank pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            pitchOuterLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 180", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            pitchOuterLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 270", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            pitchOuterLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });
});

describe("When the fixed hinge is the Ankle", () => {
  const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
    fixedHinge: FixedHinge.Bottom,
    restPosition: RestPosition.MiddleToInner,
    targetPosition: TargetZonePosition.FixedHingeGravity,
    targetLength: TargetZoneLength.Inner,
    fixedPosition: "bottomMiddle",
    difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
  };

  describe("the Thigh on its own", () => {
    it("renders correctly at 0", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });

    it("renders correctly at 90", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={90}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });

    it("renders correctly at 180", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={180}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });

    it("renders correctly at 270", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={270}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("Thigh and the Shank", () => {
    describe("with Thigh pitch at 0", () => {
      it("renders correctly with shank pitch at 0", () => {
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

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 180", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            pitchOuterLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 270", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            pitchOuterLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 90", () => {
      it("renders correctly with shank pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            pitchOuterLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 180", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            pitchOuterLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 270", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            pitchOuterLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 180", () => {
      it("renders correctly with shank pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            pitchOuterLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 180", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            pitchOuterLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 270", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            pitchOuterLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 270", () => {
      it("renders correctly with shank pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            pitchOuterLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 180", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            pitchOuterLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 270", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            pitchOuterLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });
});

describe("When it's a seated exercise and fixed hinge is the Hip", () => {
  const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
    fixedHinge: FixedHinge.Top,
    restPosition: RestPosition.InnerToOuter,
    targetPosition: TargetZonePosition.FixedHingeGravity,
    targetLength: TargetZoneLength.Inner,
    fixedPosition: "centerLeft",
    difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
  };

  describe("Thigh and the Shank", () => {
    describe("with Thigh pitch at 0", () => {
      it("renders correctly with shank pitch at 0", () => {
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

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 90", () => {
      it("renders correctly with shank pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            pitchOuterLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 180", () => {
      it("renders correctly with shank pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            pitchOuterLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 270", () => {
      it("renders correctly with shank pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            pitchOuterLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with shank pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            pitchOuterLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
