import api from "../api";
import { USER_REGISTERED_FORM } from "./types";

export const userRegistered = () => ({
  type: USER_REGISTERED_FORM
});

export const signup = data => dispatch =>
  api.user.signup(data).then(res => {
    const { Error, Response } = res;
    if (Error) {
      return Promise.reject({
        server: Response
      });
    }
    dispatch(userRegistered());
  });