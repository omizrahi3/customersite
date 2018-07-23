import axios from "axios";

const qaUrl = "http://www.qa.getchatwith.com";
const prodUrl = "https://www.getchatwith.com";

export default {
  user: {
    login: credentials => {
      return axios.post(`${qaUrl}/auth/AuthenticateAppUserByEmail`, credentials).then(res => res.data.Response)
    },
    loginFB: credentials => {
      return axios.post(`${qaUrl}/auth/AuthenticateAppUserByFacebook`, credentials).then(res => res.data.Response)
    },
    signup: user => {
      return axios.post(`${qaUrl}/auth/CreateAppUser`, user).then(res => res.data)
    },
    signupFB: user => {
      return axios.post(`${qaUrl}/auth/CreateAppUserFacebook`, user).then(res => res.data)
    },
    fetchUser: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post(`${qaUrl}/api/GetAppUserById`, credentials.data).then(res => res.data.Response)
    },
    updateProfile: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post(`${qaUrl}/api/UpdateAppUserAttribute`, credentials.data).then(res => res.data)
    },
    updatePassword: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post(`${qaUrl}/api/UpdateAppUserPassword`, credentials.data).then(res => res.data)
    },
    resetPasswordRequest: email =>
      axios.post(`${qaUrl}/auth/reset_password_request`, { email })
  },
  payment: {
    fetchCards: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post("http://www.qa.getchatwith.com/api/GetAppUserCreditCards", credentials.data).then(res => res.data.Response)
    },
    update: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post("http://www.qa.getchatwith.com/api/UpdateAppUserPaymentMethod", credentials.data).then(res => res.data)
    }
  },
  orderHistory: {
    fetchOrders: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post("http://www.qa.getchatwith.com/api/GetAppUserOrderHistory", credentials.data).then(res => res.data.Response)
    },
    activeSubs: credentials => {
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post("http://www.qa.getchatwith.com/api/GetProductByUser", credentials.data).then(res => res.data.Response)
    },
    deleteSub: credentials => {
      console.log(credentials);
      const instance = axios.create({ timeout: 3000 });
      instance.defaults.headers.common['token'] = credentials.Token;
      return axios.post("http://www.qa.getchatwith.com/api/DeleteProduct", credentials.data).then(res => res.data.Response)
    }
  },
  search: {
    knownfor: data => {
      return axios.post("http://www.qa.getchatwith.com/home/GetAppTalentBySearch", data).then(res => res.data.Response)
    },
    appTalent: data => {
      return axios.post("http://www.qa.getchatwith.com/home/GetAppTalentBySearch", data).then(res => res.data.Response)
    }
  },
  checkout: {
    guest: data => {
      return axios.post("http://www.qa.getchatwith.com/home/CreateWebTransactionGuest", data).then(res => res.data)
    },
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
      return axios.post("http://www.qa.getchatwith.com/api/CreateWebTransactionUpdate", data.checkout).then(res => res.data)
    }
  }
};