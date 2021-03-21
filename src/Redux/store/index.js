import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

import appConfig from "../../appConfig";

// Saga Middlewarw Creation
const sagaMiddleware = createSagaMiddleware();

// Add new middleware here
const customMiddleWare = [sagaMiddleware];

//Store Creation
const store = configureStore({
  reducer: rootReducer,
  middleware: [...customMiddleWare],
  devTools: appConfig.devMode,
});
sagaMiddleware.run(rootSaga);

export default store;
