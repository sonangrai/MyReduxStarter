import { createAction, createReducer } from "@reduxjs/toolkit";

export const setAlert = createAction("SET_ALERT");
export const removeAlert = createAction("REMOVE_ALERT");

const initialState = {
  errors: [],
};

const alertReducers = createReducer(initialState, {
  [setAlert]: (state, action) => {
    state.errors.push(action?.payload);
  },
  [removeAlert]: (state) => {
    state.errors.pop();
  },
});

export default alertReducers;
