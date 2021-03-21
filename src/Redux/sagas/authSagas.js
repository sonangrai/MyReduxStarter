import { put, call, takeLatest, all, delay } from "redux-saga/effects";
import { loginUser } from "../../api/auth";
import {
  loadUser,
  loadUserFail,
  loadUserSuccess,
  login,
  loginFailed,
  loginSuccess,
} from "../reducers/authReducers";
import { setAlert, removeAlert } from "../reducers/alertReducers";
import { getUser } from "../../api/user";

function* userLogin(action) {
  try {
    let response = yield call(loginUser, action.payload);
    yield put(loginSuccess(response));
  } catch (error) {
    yield all(error.map((err) => put(setAlert(err.msg))));
    yield delay(6000);
    yield all(error.map((err) => put(removeAlert(err.msg))));
    yield put(loginFailed(error));
  }
}

function* loadUsers() {
  try {
    let udata = yield call(getUser);
    yield put(loadUserSuccess(udata));
  } catch (error) {
    yield put(loadUserFail(error));
  }
}

export default function* authSaga() {
  yield all([takeLatest(login, userLogin), takeLatest(loadUser, loadUsers)]);
}
