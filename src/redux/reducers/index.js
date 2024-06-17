import { combineReducers } from "redux";
import auth from "./auth";
import player from "./player";
import style from "./style";


export default combineReducers({
  auth,
  player,
  style
});
