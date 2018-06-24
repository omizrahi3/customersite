import api from "../api";
import { USER_REGISTERED_FORM, PROFILE_UPDATED } from "./types";

export const userRegistered = () => ({
  type: USER_REGISTERED_FORM
});

export const profileUpdated = () => ({
  type: PROFILE_UPDATED
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

export const updatedProfile = data => dispatch =>
  api.user.updateProfile(data).then(res => {
    console.log(res);
    const { Response } = res;
    if (Response.Error) {
      return Promise.reject({
        server: Response.Response.Error
      });
    }
    dispatch(profileUpdated());
  });