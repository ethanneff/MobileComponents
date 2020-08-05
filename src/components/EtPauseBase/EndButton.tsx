import React, { memo, useState } from "react";
import DeviceInfo from "react-native-device-info";
import { useGuidanceAudio } from "../../commons/Hooks/useGuidanceAudio";
import { strings } from "../../commons/Locales";
import { endEtSession } from "../../commons/Store/ExerciseActivityState";
import { useRootDispatch } from "../../commons/Store/selectors";
import Dialog from "../../components/Dialog";
import StickyButton from "../../components/StickyButton";

const isTablet = DeviceInfo.isTablet();

export default memo(function EndButton() {
  const dispatch = useRootDispatch();
  const [dialogVisible, setDialogVisible] = useState(false);
  const guidance = useGuidanceAudio();

  const handleEndSessionPress = () => {
    setDialogVisible(true);
  };

  const handleDialogCancel = () => {
    setDialogVisible(false);
  };

  const handleDialogConfirm = () => {
    setDialogVisible(false);
    guidance.stop();
    dispatch(endEtSession());
  };

  return (
    <>
      {dialogVisible && (
        <Dialog
          testID="endSessionDialog"
          title={strings("etSessionAlert.title")}
          message={strings("etSessionAlert.body")}
          confirmButtonTestID="endSessionConfirm"
          cancelButtonTestID="endSessionCancel"
          onBackgroundPress={handleDialogCancel}
          onCancelButtonPress={handleDialogCancel}
          onConfirmButtonPress={handleDialogConfirm}
        />
      )}
      <StickyButton
        secondary
        noTopShadow={!isTablet}
        title={strings("exerciseActivity.end")}
        onPress={handleEndSessionPress}
        testID="end"
      />
    </>
  );
});
