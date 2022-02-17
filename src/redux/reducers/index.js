import { combineReducers } from "redux";
import auth from "./auth";
import player from "./player";

export default combineReducers({
  auth,
  player,
});
