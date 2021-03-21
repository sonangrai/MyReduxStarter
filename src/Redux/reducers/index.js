import { combineReducers } from "redux";
import alertReducers from "./alertReducers";
import authReducer from "./authReducers";

export default combineReducers({
  auth: authReducer,
  alert: alertReducers,
});
