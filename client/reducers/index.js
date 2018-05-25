import { combineReducers } from 'redux';
import user from "./user";
import talent from "./talent";

export default combineReducers({
  user,
  talent
});