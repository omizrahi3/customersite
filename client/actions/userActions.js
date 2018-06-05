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

  export const signupFB = data => dispatch =>
    api.user.signupFB(data).then(res => {
      const { Response } = res;
      console.log(res);
      if (Response.Error) {
        return Promise.reject({
          server: Response.Response.Error
        });
      }
      dispatch(userRegistered());
    });