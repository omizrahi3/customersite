import { CHECKOUT_SUCCESS } from "../actions/types";

export default function products(state = {}, action = {}) {
  switch (action.type) {
    case CHECKOUT_SUCCESS:
      return state;
    default:
      return state;
  }
}