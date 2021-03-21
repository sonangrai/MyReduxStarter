import { combineReducers } from "redux";
import alertReducers from "./alertReducers";
import authReducer from "./authReducers";
import movieReducers from "./movieReducers";

export default combineReducers({
  auth: authReducer,
  alert: alertReducers,
  movie: movieReducers,
});
