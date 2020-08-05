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
import { Target, TwoHingeViewExerciseConfig } from "../Interfaces";

const canvasSize = 600;

describe("The Target Zone", () => {
  it("does not not render when it's hidden", () => {
    const target: Target = {
      targetAngle: 0,
      targetAngleTolerance: 10,
      isTargetZoneVisible: false,
      isInTargetZone: false
    };
    const { tree } = testRender(
      <TwoHingeView canvasSize={canvasSize} target={target} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("render when it's visible", () => {
    const target: Target = {
      targetAngle: 0,
      targetAngleTolerance: 10,
      isTargetZoneVisible: true,
      isInTargetZone: false
    };
    const { tree } = testRender(
      <TwoHingeView canvasSize={canvasSize} target={target} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when the user out of the targetZone", () => {
    const target: Target = {
      targetAngle: 0,
      targetAngleTolerance: 10,
      isTargetZoneVisible: true,
      isInTargetZone: false
    };
    const { tree } = testRender(
      <TwoHingeView canvasSize={canvasSize} target={target} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when the user is in the targetZone", () => {
    const target: Target = {
      targetAngle: 0,
      targetAngleTolerance: 10,
      isTargetZoneVisible: true,
      isInTargetZone: true
    };
    const { tree } = testRender(
      <TwoHingeView canvasSize={canvasSize} target={target} />
    );
    expect(tree).toMatchSnapshot();
  });

  describe("when fixed hinge is Hip, its position is Knee/Gravity", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Top,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.MiddleGravity,
      targetLength: TargetZoneLength.Inner,
      fixedPosition: "topMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    describe("when the target pitch is 0", () => {
      const target: Target = {
        targetAngle: 0,
        targetAngleTolerance: 10,
        isTargetZoneVisible: true,
        isInTargetZone: false
      };
      it("renders correctly when thigh pitch is 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });
      it("renders correctly when thigh pitch is 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
    describe("when the target pitch is 90", () => {
      const target: Target = {
        targetAngle: 90,
        targetAngleTolerance: 10,
        isTargetZoneVisible: true,
        isInTargetZone: false
      };
      it("renders correctly when thigh pitch is 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });
      it("renders correctly when thigh pitch is 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe("when fixed hinge is Ankle, its position is Knee/Gravity", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Bottom,
      restPosition: RestPosition.MiddleToInner,
      targetPosition: TargetZonePosition.MiddleGravity,
      targetLength: TargetZoneLength.Outer,
      fixedPosition: "bottomMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    describe("when the target pitch is 0", () => {
      const target: Target = {
        targetAngle: 0,
        targetAngleTolerance: 10,
        isTargetZoneVisible: true,
        isInTargetZone: false
      };
      it("renders correctly when shank pitch is 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchOuterLimb={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });
      it("renders correctly when shank pitch is 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchOuterLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
    describe("when the target pitch is 90", () => {
      const target: Target = {
        targetAngle: 90,
        targetAngleTolerance: 10,
        isTargetZoneVisible: true,
        isInTargetZone: false
      };
      it("renders correctly when shank pitch is 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchOuterLimb={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });
      it("renders correctly when shank pitch is 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchOuterLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe("when fixed hinge is Ankle, its position is Ankle/Gravity", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Bottom,
      restPosition: RestPosition.OuterToInner,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "bottomMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    describe("when the target pitch is 0", () => {
      const target: Target = {
        targetAngle: 0,
        targetAngleTolerance: 10,
        isTargetZoneVisible: true,
        isInTargetZone: false
      };
      it("renders correctly when thigh pitch is 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });
      it("renders correctly when thigh pitch is 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
    describe("when the target pitch is 90", () => {
      const target: Target = {
        targetAngle: 90,
        targetAngleTolerance: 10,
        isTargetZoneVisible: true,
        isInTargetZone: false
      };
      it("renders correctly when thigh pitch is 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });
      it("renders correctly when thigh pitch is 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe("when fixed hinge is Hip, its position is Hip/Gravity", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Top,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.Outer,
      fixedPosition: "topMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    describe("when the target pitch is 0", () => {
      const target: Target = {
        targetAngle: 0,
        targetAngleTolerance: 10,
        isTargetZoneVisible: true,
        isInTargetZone: false
      };
      it("renders correctly when thigh pitch is 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });
      it("renders correctly when thigh pitch is 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
    describe("when the target pitch is 90", () => {
      const target: Target = {
        targetAngle: 90,
        targetAngleTolerance: 10,
        isTargetZoneVisible: true,
        isInTargetZone: false
      };
      it("renders correctly when thigh pitch is 0", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={0}
          />
        );
        expect(tree).toMatchSnapshot();
      });
      it("renders correctly when thigh pitch is 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe("when fixed hinge is Hip, its position is Knee/Thigh", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Top,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.MiddleInner,
      targetLength: TargetZoneLength.Inner,
      fixedPosition: "topMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };

    describe("when the target pitch is 0", () => {
      const target: Target = {
        targetAngle: 0,
        targetAngleTolerance: 10,
        isTargetZoneVisible: true,
        isInTargetZone: false
      };
      it("renders correctly when thigh pitch is 0 and shank pitch 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={0}
            pitchOuterLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
      it("renders correctly when thigh pitch is 90 and shank pitch 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={90}
            pitchOuterLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
    describe("when the target pitch is 90", () => {
      const target: Target = {
        targetAngle: 90,
        targetAngleTolerance: 10,
        isTargetZoneVisible: true,
        isInTargetZone: false
      };
      it("renders correctly when thigh pitch is 0 and shank pitch 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={0}
            pitchOuterLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
      it("renders correctly when thigh pitch is 90 and shank pitch 90", () => {
        const { tree } = testRender(
          <TwoHingeView
            canvasSize={canvasSize}
            twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
            target={target}
            pitchInnerLimb={90}
            pitchOuterLimb={90}
          />
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });

  it("renders correctly with target length as Shank", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Top,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.MiddleGravity,
      targetLength: TargetZoneLength.Inner,
      fixedPosition: "topMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };
    const target: Target = {
      targetAngle: 180,
      targetAngleTolerance: 10,
      isTargetZoneVisible: true,
      isInTargetZone: false
    };
    const { tree } = testRender(
      <TwoHingeView
        canvasSize={canvasSize}
        twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        target={target}
        pitchInnerLimb={90}
        pitchOuterLimb={90}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with target length as Thigh", () => {
    const exerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Top,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.Outer,
      fixedPosition: "topMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };
    const target: Target = {
      targetAngle: 180,
      targetAngleTolerance: 10,
      isTargetZoneVisible: true,
      isInTargetZone: false
    };
    const { tree } = testRender(
      <TwoHingeView
        canvasSize={canvasSize}
        twoHingeViewExerciseConfig={exerciseConfig}
        target={target}
        pitchInnerLimb={90}
        pitchOuterLimb={90}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with target length as Leg", () => {
    const twoHingeViewExerciseConfig: TwoHingeViewExerciseConfig = {
      fixedHinge: FixedHinge.Top,
      restPosition: RestPosition.InnerToOuter,
      targetPosition: TargetZonePosition.FixedHingeGravity,
      targetLength: TargetZoneLength.WholeLimb,
      fixedPosition: "topMiddle",
      difficultyAdjustmentFactor: DifficultyAdjustmentFactor.Positive
    };
    const target: Target = {
      targetAngle: 0,
      targetAngleTolerance: 10,
      isTargetZoneVisible: true,
      isInTargetZone: false
    };
    const { tree } = testRender(
      <TwoHingeView
        canvasSize={canvasSize}
        twoHingeViewExerciseConfig={twoHingeViewExerciseConfig}
        target={target}
        pitchInnerLimb={90}
        pitchOuterLimb={90}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
