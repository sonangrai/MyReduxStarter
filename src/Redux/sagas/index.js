import { all, fork } from "redux-saga/effects";
import authSagas from "./authSagas";
import movieSaga from "./movieSagas";

export default function* rootSaga() {
  yield all([fork(authSagas), fork(movieSaga)]);
}
