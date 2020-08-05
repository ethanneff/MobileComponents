import React, { memo } from "react";
import { Event, track } from "../../commons/Analytics";
import { strings } from "../../commons/Locales";
import { setMuteBeeps } from "../../commons/Store/Audio";
import { getMuteBeep } from "../../commons/Store/Audio/selectors";
import {
  useRootDispatch,
  useRootSelector
} from "../../commons/Store/selectors";
import EtToggle from "../../components/EtToggle";

export default memo(function BeepsToggle() {
  const beepMuted = useRootSelector(getMuteBeep);
  const dispatch = useRootDispatch();

  const handleBeepMute = () => {
    track(Event.ExerciseActivityBeepsToggled, { newState: !beepMuted });
    dispatch(setMuteBeeps(!beepMuted));
  };

  return (
    <EtToggle
      title={strings("etPause.audioFeedback")}
      topBorder={true}
      value={!beepMuted}
      onValueChange={handleBeepMute}
      testID="audioFeedbackToggle"
    />
  );
});
