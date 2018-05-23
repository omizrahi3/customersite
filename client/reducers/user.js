import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_REGISTERED_FORM } from "../actions/types";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return {};
    case USER_REGISTERED_FORM:
      return {};
    default:
      return state;
  }
}