import React from "react";
import { act } from "react-test-renderer";
import Dialog from "..";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import SensorlessDialog from "../SensorlessDialog";

describe("SensorlessDialog", () => {
  it("sets the skip modal functionality correctly", () => {
    const { store, tree } = testRender(
      <SensorlessDialog
        visible={true}
        isMidWorkout={true}
        onCancel={() => true}
        onConfirm={() => true}
      />
    );

    const dialog = tree.root.findByType(Dialog);
    const checkbox = tree.root.findByProps({ testID: "skipModalCheckbox" });

    act(() => {
      checkbox.props.onChange();
      dialog.props.onConfirmButtonPress();
    });

    expect(store.getState().session.shouldSkipSensorlessModal).toBe(true);
  });
});
