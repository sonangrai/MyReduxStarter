import { createAction, createReducer } from "@reduxjs/toolkit";

export const login = createAction("LOGIN/REQUEST");
export const loginSuccess = createAction("LOGIN_SUCCESS/RESPONSE");
export const loginFailed = createAction("LOGIN_FAILED/RESPONSE");
export const logout = createAction("LOGOUT");
export const loadUser = createAction("LOAD_USER/REQUEST");
export const loadUserSuccess = createAction("LOAD_USER_SUCCESS/RESPONSE");
export const loadUserFail = createAction("LOAD_USER_FAIL/RESPONSE");

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: [],
};

const authReducers = createReducer(initialState, {
  [login]: (state) => {
    state.loading = true;
  },
  [loginSuccess]: (state, action) => {
    localStorage.setItem("token", action.payload?.data?.token);
    state.token = action.payload?.data?.token;
    state.isAuthenticated = true;
    state.loading = false;
  },
  [loginFailed]: (state) => {
    state.isAuthenticated = false;
  },
  [loadUserSuccess]: (state, action) => {
    state.token = localStorage.getItem("token");
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action?.payload?.data;
  },
  [loadUserFail]: (state) => {
    state.isAuthenticated = false;
    state.loading = true;
    state.user = [];
  },
  [logout]: (state) => {
    localStorage.removeItem("token");
    state.token = null;
    state.isAuthenticated = false;
    state.loading = true;
  },
});

export default authReducers;
