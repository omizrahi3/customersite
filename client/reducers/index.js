import { combineReducers } from 'redux';
import user from "./user";
import talents from "./talents";

export default combineReducers({
  user,
  talents
});