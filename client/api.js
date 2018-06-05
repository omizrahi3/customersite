import axios from "axios";

export default {
  user: {
    login: credentials => {
      return axios.post("/api/auth/AuthenticateAppUserByEmail", credentials).then(res => res.data.Response)
    },
    loginFB: credentials => {
      return axios.post("/api/auth/AuthenticateAppUserByFacebook", credentials).then(res => res.data.Response)
    },
    signup: user => {
      return axios.post("/api/auth/CreateAppUser", user).then(res => res.data)
    },
    signupFB: user => {
      return axios.post("/api/auth/CreateAppUserFacebook", user).then(res => res.data)
    },
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email })
  }
};