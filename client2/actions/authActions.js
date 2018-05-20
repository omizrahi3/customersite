import axios from 'axios';

export const login = function login(data) {
  return (dispatch, getState, api) => {
    return api.post('/auth/AuthenticateAppUserByEmail', data).then(res => {
      console.log('testing');
      return res;
    })
  }
}
