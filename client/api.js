import axios from "axios";

export default {
  user: {
    login: credentials => {
      return axios.post("http://www.qa.getchatwith.com/auth/AuthenticateAppUserByEmail", credentials).then(res => res.data.Response)
    },
    loginFB: credentials => {
      return axios.post("http://www.qa.getchatwith.com/auth/AuthenticateAppUserByFacebook", credentials).then(res => res.data.Response)
    },
    signup: user => {
      return axios.post("http://www.qa.getchatwith.com/auth/CreateAppUser", user).then(res => res.data)
    },
    signupFB: user => {
      return axios.post("http://www.qa.getchatwith.com/auth/CreateAppUserFacebook", user).then(res => res.data)
    },
    updateProfile: data => {
      console.log('api updateProfile');
      console.log(data);
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = data.Token;
      return axios.post("http://www.qa.getchatwith.com/api/UpdateAppUserAttribute", data.profile).then(res => res.data)
    },
    resetPasswordRequest: email =>
      axios.post("http://www.qa.getchatwith.com/auth/reset_password_request", { email })
  },
  checkout: {
    existing: data => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = data.Token;
      return axios.post("http://www.qa.getchatwith.com/api/CreateWebTransactionExisting", data.checkout).then(res => res.data)
    },
    new: data => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = data.Token;
      return axios.post("http://www.qa.getchatwith.com/api/CreateWebTransactionNew", data.checkout).then(res => res.data)
    },
    update: data => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = data.Token;
      return axios.post("http://www.qa.getchatwith.com/api/CreateWebTransactionUpdate", data.checkout).then(res => res.data.Response.Response)
    }
  }
};