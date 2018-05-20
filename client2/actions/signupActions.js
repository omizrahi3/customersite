import axios from 'axios';

export function userSignupRequest(userData) {
  return (dispatch, getState, api) => {
    const data = {
      "EmailAddress": "johncena@wwe.com",
      "Firstname":"John",
      "Lastname":"Cena",
      "Gender":"m",
      "Birthdate":"1987-10-28",
      "Password":"youcantseeme"
    };
    return api.post('/auth/CreateAppUser', data);
  }
}

// export function userSignupRequest(userData) {
//   return (dispatch, api) => {
//     const data = {
//       "EmailAddress": "johncena@wwe.com",
//       "Firstname":"John",
//       "Lastname":"Cena",
//       "Gender":"m",
//       "Birthdate":"1987-10-28",
//       "Password":"youcantseeme"
//     };
//     console.log(userData);

//     return axios.post('http://www.api.getchatwith.com/auth/CreateAppUser', data);
//   }
// }