import React, { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "../../commons/Store";
import { loadCachedData } from "../../commons/Utils/AsyncStorage";

const { persistor, store } = configureStore();

export const Redux: React.FC = props => {
  const [lift, setLift] = useState(false);

  async function beforeLift() {
    await loadCachedData(store);
    setLift(true);
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={beforeLift}>
        {lift ? props.children : null}
      </PersistGate>
    </Provider>
  );
};
