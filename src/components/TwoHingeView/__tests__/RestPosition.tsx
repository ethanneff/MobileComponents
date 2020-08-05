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

const canvasSize = 600;

describe("Rest position visibility", () => {
  const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
    fixedHinge: FixedHinge.Bottom,
    restPosition: RestPosition.MiddleToInner,
    targetPosition: TargetZonePosition.FixedHingeGravity,
    targetLength: TargetZoneLength.Inner,
    fixedPosition: "bottomMiddle",
    difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
  };
  describe("When the rest position is marked as visible", () => {
    it("renders with the rest position ", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={0}
          isRestPositionVisible={true}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe("When the rest position is marked as not visible", () => {
    it("renders without the rest position ", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={0}
          isRestPositionVisible={false}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });
});

describe("When the rest position is Knee/Thigh", () => {
  describe("when the fixed hinge is the Hip", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Top,
      restPosition: RestPosition.MiddleToInner,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.Inner,
      fixedPosition: "topMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    it("shows an error", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={0}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("when the fixed hinge is the Hip with bottomMiddle position", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Bottom,
      restPosition: RestPosition.MiddleToInner,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.Inner,
      fixedPosition: "bottomMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    describe("with Thigh pitch at 0", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 90", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 180", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 270", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });
});

describe("When the rest position is Ankle/Hip", () => {
  describe("when the fixed hinge is the Ankle", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Bottom,
      restPosition: RestPosition.OuterToInner,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "bottomMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    describe("with Thigh pitch at 0", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 90", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 180", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 270", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });
});

describe("When the rest position is Knee/Shank", () => {
  describe("when the fixed hinge is the Ankle", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Bottom,
      restPosition: RestPosition.MiddleToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.Inner,
      fixedPosition: "bottomMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };
    it("shows an error", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={0}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("when the fixed hinge is the Hip", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Top,
      restPosition: RestPosition.MiddleToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.Inner,
      fixedPosition: "topMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    describe("with Thigh pitch at 0", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={0}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 90", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={90}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 180", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={180}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });

    describe("with Thigh pitch at 270", () => {
      it("renders correctly with rest pitch at 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });

      it("renders correctly with rest pitch at 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            pitchInnerLimb={270}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            restAngle={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });
});

describe("When the rest position is Hip/Thigh", () => {
  const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
    fixedHinge: FixedHinge.Top,
    restPosition: RestPosition.InnerToOuter,
    targetPosition: TargetZonePosition.FixedHingeGravity,
    targetLength: TargetZoneLength.Inner,
    fixedPosition: "topMiddle",
    difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
  };

  describe("with Thigh pitch at 0", () => {
    it("renders correctly with rest pitch at 0", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={0}
        />
      );
      expect(tree).toMatchSnapshot();
    });

    it("renders correctly with rest pitch at 90", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={0}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={90}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("with Thigh pitch at 90", () => {
    it("renders correctly with rest pitch at 0", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={90}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={0}
        />
      );
      expect(tree).toMatchSnapshot();
    });

    it("renders correctly with rest pitch at 90", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={90}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={90}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("with Thigh pitch at 180", () => {
    it("renders correctly with rest pitch at 0", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={180}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={0}
        />
      );
      expect(tree).toMatchSnapshot();
    });

    it("renders correctly with rest pitch at 90", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={180}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={90}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe("with Thigh pitch at 270", () => {
    it("renders correctly with rest pitch at 0", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={270}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={0}
        />
      );
      expect(tree).toMatchSnapshot();
    });

    it("renders correctly with rest pitch at 90", () => {
      const { tree } = testRender(
        <TwoHingeView
          canvasSize={canvasSize}
          pitchInnerLimb={270}
          twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
          restAngle={90}
        />
      );
      expect(tree).toMatchSnapshot();
    });
  });
});

describe("when the rest position is a target zone", () => {
  const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
    fixedHinge: FixedHinge.Bottom,
    targetPosition: TargetZonePosition.MiddleGravity,
    targetLength: TargetZoneLength.Outer,
    fixedPosition: "bottomMiddle",
    restPosition: RestPosition.MiddleToInner,
    difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Negative
  };
  const restTargetZone = true;

  it("renders correctly", () => {
    const { tree } = testRender(
      <TwoHingeView
        canvasSize={canvasSize}
        pitchInnerLimb={270}
        twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        restAngle={90}
        isRestTargetZone={restTargetZone}
        isRestPositionVisible={true}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
