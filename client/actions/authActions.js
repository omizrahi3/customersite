import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./types";
import api from "../api";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    const { ValidAppUser, Authenticated, AppUserId, Token } = user;
    console.log(user);
    if (!ValidAppUser || !Authenticated) {
      return Promise.reject({
        server: 'Invalid Credentials'
      });
    } else {
      console.log('Login Successful');
      localStorage.chatwithJWT = Token;
      dispatch(userLoggedIn(user));
    }
  });

export const logout = () => dispatch => {
  localStorage.removeItem("chatwithJWT");
  dispatch(userLoggedOut());
};