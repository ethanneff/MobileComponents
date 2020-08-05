import React, { memo } from "react";
import { Event, track } from "../../commons/Analytics";
import { strings } from "../../commons/Locales";
import { setMuteGuidance } from "../../commons/Store/Audio";
import { getMuteGuidance } from "../../commons/Store/Audio/selectors";
import {
  useRootDispatch,
  useRootSelector
} from "../../commons/Store/selectors";
import EtToggle from "../../components/EtToggle";

export default memo(function AudioGuidanceToggle() {
  const guidanceMuted = useRootSelector(getMuteGuidance);
  const dispatch = useRootDispatch();

  const handleGuidanceMute = () => {
    track(Event.ExerciseActivityGuidanceToggled, {
      newState: !guidanceMuted
    });
    dispatch(setMuteGuidance(!guidanceMuted));
  };

  return (
    <EtToggle
      title={strings("etPause.audioGuidance")}
      topBorder={true}
      value={!guidanceMuted}
      onValueChange={handleGuidanceMute}
      testID="audioGuidanceToggle"
    />
  );
});
