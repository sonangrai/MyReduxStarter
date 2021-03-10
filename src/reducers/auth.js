import * as types from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function authreducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case types.CLEAR_PROFILE:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null,
      };
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userid", payload.id);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false,
      };
    case types.ACCOUNT_DELETED:
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case types.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
      };
    default:
      return state;
  }
}
