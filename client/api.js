import axios from "axios";

export default {
  user: {
    login: credentials => {
      return axios.post("/api/auth/AuthenticateAppUserByEmail", credentials).then(res => res.data.Response)
    }
  }
};