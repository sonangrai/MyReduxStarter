import * as types from "../actions/types";

const initialstate = [];

export default function alert(state = initialstate, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_ALERT:
      return [...state, payload];
    case types.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
