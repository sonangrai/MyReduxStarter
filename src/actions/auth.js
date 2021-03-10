import * as types from "./types";
import Axios from "axios";
import { setAlert } from "./alert";

//Logging in Request
export const login = (email, password) => async (dispatch) => {
  var jdata = JSON.stringify({ email, password });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await Axios.post("/api/auth/login", jdata, config);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("userid", res.data.id);
    dispatch(loadUser(res.data.id));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: types.LOGIN_FAIL,
    });
  }
};

//Loading User
// Load User
export const loadUser = (id) => async (dispatch) => {
  if (localStorage.token) {
    Axios.defaults.headers.common["x-auth-token"] = localStorage.token;
  } else {
    delete Axios.defaults.headers.common["x-auth-token"];
  }

  try {
    const res = await Axios.get(`/api/user/${id}`);

    dispatch({
      type: types.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.USER_LOADED_FAIL,
    });
  }
};

//Recover Password
export const recover = (email) => async (dispatch) => {
  var jdata = JSON.stringify({ email });
  console.log(jdata);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await Axios.post("/api/recover", jdata, config);
    dispatch({
      type: types.RECOVER_REQUEST_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: types.RECOVER_REQUEST_FAILED,
    });
    console.log(errors);
  }
};

//New Password
export const newpswd = (password, repassword, uid, tid) => async (dispatch) => {
  if (password !== repassword) {
    dispatch(setAlert("Passwords Doesnt Match", "danger"));
  }

  var jdata = JSON.stringify({ password });
  console.log(jdata);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await Axios.post(
      `/api/resetpassword/${uid}/${tid}`,
      jdata,
      config
    );
    dispatch({
      type: types.PASSWORD_CHANGED,
      payload: res.data,
    });
    dispatch(setAlert("Password Changed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: types.PASSWORD_CHANGE_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: types.CLEAR_PROFILE });
  dispatch({ type: types.LOGOUT });
};
