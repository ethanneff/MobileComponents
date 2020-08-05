import React from "react";
import { act } from "react-test-renderer";
import * as EtActions from "../../../commons/Store/ExerciseActivityState/actions";
import { setPause } from "../../../commons/Store/ExerciseActivityState/actions";
import { testRender } from "../../../commons/Utils/TestMocks/test-render";
import EndButton from "../EndButton";

describe("EndButton", () => {
  it("shows the exit session dialog when pressed", () => {
    const { store, press, tree } = testRender(<EndButton />);

    act(() => {
      store.dispatch(setPause(true));
      press("end");
    });

    const dialog = tree.root.findByProps({ testID: "endSessionDialog" });

    expect(dialog).toBeTruthy();
  });

  it("hides exit dialog when you press the cancel button", () => {
    const { store, press, tree } = testRender(<EndButton />);

    act(() => {
      store.dispatch(setPause(true));
      press("end");
    });

    act(() => {
      press("endSessionCancel");
    });

    expect(tree).not.toHaveComponentWithProps({ testID: "endSessionDialog" });
  });

  it("exits the session when you press the confirm button", () => {
    const endSessionSpy = jest
      .spyOn(EtActions, "endEtSession")
      .mockReturnValue(jest.fn());
    const { store, press, tree } = testRender(<EndButton />);

    act(() => {
      store.dispatch(setPause(true));
      press("end");
    });

    expect(tree).toHaveComponentWithProps({ testID: "endSessionDialog" });

    act(() => {
      press("endSessionConfirm");
    });
    expect(tree).not.toHaveComponentWithProps({ testID: "endSessionDialog" });
    expect(endSessionSpy).toHaveBeenCalled();
  });
});
