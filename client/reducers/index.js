import { combineReducers } from 'redux';
import user from "./user";
import talents from "./talents";
import products from "./products";
import cart from "./cart";

export default combineReducers({
  user,
  talents,
  products,
  cart
});