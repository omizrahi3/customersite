import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./types";
import api from "../api";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const login2 = credentials => dispatch =>
  api.user.login(credentials)
  .then(user => {
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

  export const loginFB2 = credentials => dispatch =>
  api.user.loginFB(credentials).then(user => {
    const { ValidAppUser, Authenticated, AppUserId, Token } = user;
    console.log(user);
    if (!ValidAppUser || !Authenticated) {
      return Promise.reject({
        server: 'Something Went Wrong'
      });
    } else {
      console.log('Facebook Login Successful');
      localStorage.chatwithJWT = Token;
      dispatch(userLoggedIn(user));
    }
  });

export const logout = () => dispatch => {
  localStorage.removeItem("chatwithJWT");
  dispatch(userLoggedOut());
};

export const login = (credentials) => (dispatch) => 
  api.user.login(credentials)
    .then(user => {
      const { ValidAppUser, Authenticated } = user;
      if (!ValidAppUser) return Promise.reject({server: 'User Does Not Exist'})
      else if (!Authenticated) return Promise.reject({server: 'Password Does Not Match'})
      else return user;
    })
    .then(user => {
      const { AppUserId, Token } = user;
      const userData = {
        AppUserId,
        Token
      };
      localStorage.chatwithJWT = Token;
      dispatch(userLoggedIn(userData));
    });

export const loginFB = (credentials) => (dispatch) =>
  api.user.loginFB(credentials)
    .then(user => {
      const { Error = false } = user;
      if (Error) return Promise.reject({server: 'Facebook Login Failed'})
      else return user;
    })
    .then(user => {
      const { AppUserId, Token } = user;
      const userData = {
        AppUserId,
        Token
      };
      localStorage.chatwithJWT = Token;
      dispatch(userLoggedIn(userData));
    });