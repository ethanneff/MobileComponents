import React from "react";
import OneHingeView from "..";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import OneHingeViewExerciseConfigs from "../OneHingeViewExerciseConfigs";

it("renders correctly with default props", () => {
  const { tree } = testRender(
    <OneHingeView
      oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
      isRestPositionVisible={true}
      target={{
        isTargetZoneVisible: true,
        isInTargetZone: true,
        targetAngle: 0,
        targetAngleTolerance: 0
      }}
      restAngle={0}
      angleChest={0}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("renders correctly with scaledDown prop", () => {
  const { tree } = testRender(
    <OneHingeView
      oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
      isRestPositionVisible={true}
      target={{
        isTargetZoneVisible: true,
        isInTargetZone: true,
        targetAngle: 0,
        targetAngleTolerance: 0
      }}
      restAngle={0}
      angleChest={0}
      scaledDown
    />
  );
  expect(tree).toMatchSnapshot();
});

it("renders correctly with  non-zero errorMargin", () => {
  const { tree } = testRender(
    <OneHingeView
      oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
      isRestPositionVisible={true}
      target={{
        isTargetZoneVisible: true,
        isInTargetZone: true,
        targetAngle: 0,
        targetAngleTolerance: 10
      }}
      restAngle={0}
      angleChest={0}
    />
  );
  expect(tree).toMatchSnapshot();
});

describe("with rest position not visible", () => {
  it("renders with default props", () => {
    const { tree } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={false}
        target={{
          isTargetZoneVisible: true,
          isInTargetZone: true,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={0}
      />
    );
    expect(tree).toMatchSnapshot();
    const line = tree.root.findByProps({
      name: "fixedLimb"
    });
    expect(line).toBeTruthy();
    expect(line.props.x2).toBe(1200);
    expect(line.props.y2).toBe(1110);
  });

  it("renders with a 90 degree angle", () => {
    const { tree } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={false}
        target={{
          isTargetZoneVisible: true,
          isInTargetZone: true,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={90}
      />
    );
    expect(tree).toMatchSnapshot();
    const line = tree.root.findByProps({
      name: "fixedLimb"
    });
    expect(line).toBeTruthy();
    expect(line.props.x2).not.toBe("575");
    expect(line.props.y2).not.toBe("740");
  });

  it("renders correctly with an overflowed angle", () => {
    const { tree: componentWithOverflow } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={false}
        target={{
          isTargetZoneVisible: true,
          isInTargetZone: true,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={360.1}
      />
    );
    const { tree: componentWithoutOverflow } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={false}
        target={{
          isTargetZoneVisible: true,
          isInTargetZone: true,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={0.1}
      />
    );

    const overflowLineX2 = componentWithOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.x2;
    const withoutOverflowLineX2 = componentWithoutOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.x2;
    const overflowLineY2 = componentWithOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.y2;
    const withoutOverflowLineY2 = componentWithoutOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.y2;

    expect(componentWithOverflow).toMatchSnapshot();
    expect(Number(overflowLineX2).toFixed(8)).toEqual(
      Number(withoutOverflowLineX2).toFixed(8)
    );
    expect(Number(overflowLineY2).toFixed(8)).toEqual(
      Number(withoutOverflowLineY2).toFixed(8)
    );
  });
});

describe("with target zone not visible", () => {
  it("renders with default props", () => {
    const { tree } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={true}
        target={{
          isTargetZoneVisible: false,
          isInTargetZone: true,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={0}
      />
    );
    const line = tree.root.findByProps({
      name: "fixedLimb"
    });

    expect(tree).toMatchSnapshot();
    expect(line).toBeTruthy();
    expect(line.props.x2).toBe(1200);
    expect(line.props.y2).toBe(1110);
  });

  it("renders with a 90 degree angle", () => {
    const { tree } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={false}
        target={{
          isTargetZoneVisible: false,
          isInTargetZone: true,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={90}
      />
    );
    const line = tree.root.findByProps({
      name: "fixedLimb"
    });

    expect(tree).toMatchSnapshot();
    expect(line).toBeTruthy();
    expect(line.props.x2).not.toBe(575);
    expect(line.props.y2).not.toBe(450);
  });

  it("renders correctly with an overflowed angle", () => {
    const { tree: componentWithOverflow } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={false}
        target={{
          isTargetZoneVisible: false,
          isInTargetZone: true,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={360.1}
      />
    );
    const { tree: componentWithoutOverflow } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={false}
        target={{
          isTargetZoneVisible: false,
          isInTargetZone: true,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={0.1}
      />
    );

    const overflowLineX2 = componentWithOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.x2;
    const withoutOverflowLineX2 = componentWithoutOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.x2;
    const overflowLineY2 = componentWithOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.y2;
    const withoutOverflowLineY2 = componentWithoutOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.y2;

    expect(componentWithOverflow).toMatchSnapshot();
    expect(Number(overflowLineX2).toFixed(8)).toEqual(
      Number(withoutOverflowLineX2).toFixed(8)
    );
    expect(Number(overflowLineY2).toFixed(8)).toEqual(
      Number(withoutOverflowLineY2).toFixed(8)
    );
  });
});

describe("while outside of target zone", () => {
  it("renders with default props", () => {
    const { tree } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={true}
        target={{
          isTargetZoneVisible: true,
          isInTargetZone: false,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={0}
      />
    );
    const line = tree.root.findByProps({
      name: "fixedLimb"
    });

    expect(tree).toMatchSnapshot();
    expect(line).toBeTruthy();
    expect(line.props.x2).toBe(1200);
  });

  it("renders with a 90 degree angle", () => {
    const { tree } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={false}
        target={{
          isTargetZoneVisible: false,
          isInTargetZone: false,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={90}
      />
    );
    const line = tree.root.findByProps({
      name: "fixedLimb"
    });

    expect(tree).toMatchSnapshot();
    expect(line).toBeTruthy();
    expect(line.props.x2).not.toBe(575);
    expect(line.props.y2).not.toBe(575);
  });

  it("renders correctly with an overflowed angle", () => {
    const { tree: componentWithOverflow } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={false}
        target={{
          isTargetZoneVisible: false,
          isInTargetZone: false,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={360.1}
      />
    );
    const { tree: componentWithoutOverflow } = testRender(
      <OneHingeView
        oneHingeViewExerciseConfig={OneHingeViewExerciseConfigs.Woodpecker}
        isRestPositionVisible={false}
        target={{
          isTargetZoneVisible: false,
          isInTargetZone: false,
          targetAngle: 0,
          targetAngleTolerance: 0
        }}
        restAngle={0}
        angleChest={0.1}
      />
    );

    const overflowLineX2 = componentWithOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.x2;
    const withoutOverflowLineX2 = componentWithoutOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.x2;
    const overflowLineY2 = componentWithOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.y2;
    const withoutOverflowLineY2 = componentWithoutOverflow.root.findByProps({
      name: "fixedLimb"
    }).props.y2;

    expect(componentWithOverflow).toMatchSnapshot();
    expect(Number(overflowLineX2).toFixed(8)).toEqual(
      Number(withoutOverflowLineX2).toFixed(8)
    );
    expect(Number(overflowLineY2).toFixed(8)).toEqual(
      Number(withoutOverflowLineY2).toFixed(8)
    );
  });
});
